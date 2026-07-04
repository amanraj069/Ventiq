import { Injectable, Logger } from '@nestjs/common';
import { AgentOutput, PriorResults } from './base-agent';
import * as fs from 'fs';
import * as path from 'path';

interface Rubric {
  version: string;
  dimensions: Record<string, { weight: number; label: string; agentName: string }>;
  ceilingRules: CeilingRule[];
}

interface CeilingRule {
  id: string;
  description: string;
  condition: {
    field: string;
    equals?: any;
    maxLength?: number;
    gte?: number;
  };
  cap?: number;
  dimensionCap?: Record<string, number>;
}

/**
 * Scoring Critic Agent — pure logic, no LLM.
 * Reads the versioned rubric, applies ceiling rules,
 * and computes the final weighted overall score.
 */
@Injectable()
export class ScoringCriticAgent {
  private readonly logger = new Logger(ScoringCriticAgent.name);
  private rubric: Rubric;

  constructor() {
    const rubricPath = path.join(process.cwd(), 'rubric', 'v1.json');
    this.rubric = JSON.parse(fs.readFileSync(rubricPath, 'utf-8'));
    this.logger.log(`Loaded rubric: ${this.rubric.version}`);
  }

  getAgentName(): string {
    return 'ScoringCritic';
  }

  getRubricVersion(): string {
    return this.rubric.version;
  }

  /**
   * Compute the final evaluation from all agent outputs.
   */
  compute(
    idea: any,
    priorResults: PriorResults,
  ): {
    overallScore: number;
    scoreBreakdown: Record<string, number>;
    appliedCeilings: string[];
  } {
    this.logger.log(`Computing final score for idea: ${idea.ideaId}`);

    // Step 1: Extract per-dimension scores from the agent that owns each dimension
    const scoreBreakdown: Record<string, number> = {};
    for (const [dimension, config] of Object.entries(this.rubric.dimensions)) {
      const agentResult = priorResults[config.agentName];
      scoreBreakdown[dimension] = agentResult?.score ?? 0;
    }

    // Step 2: Apply dimension-level ceiling rules
    const appliedCeilings: string[] = [];
    for (const rule of this.rubric.ceilingRules) {
      if (!this.evaluateCondition(rule.condition, idea, priorResults)) continue;

      if (rule.dimensionCap) {
        for (const [dim, cap] of Object.entries(rule.dimensionCap)) {
          if (scoreBreakdown[dim] !== undefined && scoreBreakdown[dim] > cap) {
            this.logger.log(`Applying ceiling "${rule.id}": capping ${dim} from ${scoreBreakdown[dim]} to ${cap}`);
            scoreBreakdown[dim] = cap;
            appliedCeilings.push(rule.id);
          }
        }
      }
    }

    // Step 3: Compute weighted average
    let weightedSum = 0;
    let totalWeight = 0;
    for (const [dimension, config] of Object.entries(this.rubric.dimensions)) {
      weightedSum += (scoreBreakdown[dimension] || 0) * config.weight;
      totalWeight += config.weight;
    }
    let overallScore = Math.round(weightedSum / totalWeight);

    // Step 4: Apply overall ceiling rules
    for (const rule of this.rubric.ceilingRules) {
      if (!rule.cap) continue;
      if (!this.evaluateCondition(rule.condition, idea, priorResults)) continue;

      if (overallScore > rule.cap) {
        this.logger.log(`Applying overall ceiling "${rule.id}": capping from ${overallScore} to ${rule.cap}`);
        overallScore = rule.cap;
        appliedCeilings.push(rule.id);
      }
    }

    return { overallScore, scoreBreakdown, appliedCeilings };
  }

  private evaluateCondition(
    condition: CeilingRule['condition'],
    idea: any,
    priorResults: PriorResults,
  ): boolean {
    const { field, equals, maxLength, gte } = condition;

    // Special synthetic fields
    if (field === '_redTeamRiskCount') {
      const redTeam = priorResults.RedTeam;
      const riskCount = redTeam?.extra?.redTeamCritique?.criticalRisks?.length ?? 0;
      if (gte !== undefined) return riskCount >= gte;
      return false;
    }

    // Normal idea fields
    const value = (idea as any)[field];

    if (equals !== undefined) {
      return value === equals || String(value) === String(equals);
    }
    if (maxLength !== undefined && typeof value === 'string') {
      return value.length <= maxLength;
    }
    if (gte !== undefined && typeof value === 'number') {
      return value >= gte;
    }

    return false;
  }
}
