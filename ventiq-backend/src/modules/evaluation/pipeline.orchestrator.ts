import { Injectable, Logger } from '@nestjs/common';
import { AgentOutput, PriorResults } from './agents/base-agent';
import { MarketResearchAgent } from './agents/market-research.agent';
import { DifferentiationAgent } from './agents/differentiation.agent';
import { FinancialModelAgent } from './agents/financial-model.agent';
import { TeamFitAgent } from './agents/team-fit.agent';
import { TractionAgent } from './agents/traction.agent';
import { ClarityAgent } from './agents/clarity.agent';
import { RegulatoryAgent } from './agents/regulatory.agent';
import { RedTeamAgent } from './agents/red-team.agent';
import { ScoringCriticAgent } from './agents/scoring-critic.agent';

/**
 * Pipeline result containing everything needed to populate an Evaluation document.
 */
export interface PipelineResult {
  overallScore: number;
  scoreBreakdown: Record<string, number>;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  agentOutputs: AgentOutput[];
  competitorLandscape: any[];
  financialProjection: any;
  redTeamCritique: any;
  rubricVersion: string;
  appliedCeilings: string[];
  tokenUsage: {
    totalInputTokens: number;
    totalOutputTokens: number;
    perAgent: { agentName: string; inputTokens: number; outputTokens: number; durationMs: number }[];
  };
  totalDurationMs: number;
}

/**
 * Orchestrates the full evaluation pipeline as a DAG:
 *
 * Wave 1 (parallel, no deps): MarketResearch, TeamFit, Traction, Clarity
 * Wave 2 (depends on Wave 1):  Differentiation (← MarketResearch)
 *                               FinancialModel (← MarketResearch, Traction)
 *                               Regulatory (← MarketResearch)
 * Wave 3 (depends on all):     RedTeam (← all agents)
 * Wave 4 (pure logic):         ScoringCritic (← all agents)
 */
@Injectable()
export class PipelineOrchestrator {
  private readonly logger = new Logger(PipelineOrchestrator.name);

  constructor(
    private readonly marketResearchAgent: MarketResearchAgent,
    private readonly differentiationAgent: DifferentiationAgent,
    private readonly financialModelAgent: FinancialModelAgent,
    private readonly teamFitAgent: TeamFitAgent,
    private readonly tractionAgent: TractionAgent,
    private readonly clarityAgent: ClarityAgent,
    private readonly regulatoryAgent: RegulatoryAgent,
    private readonly redTeamAgent: RedTeamAgent,
    private readonly scoringCriticAgent: ScoringCriticAgent,
  ) {}

  async run(idea: any): Promise<PipelineResult> {
    const pipelineStart = Date.now();
    const results: PriorResults = {};
    const allOutputs: AgentOutput[] = [];

    // ── Wave 1: Independent agents (parallel) ──
    this.logger.log('🔄 Wave 1: Running independent agents in parallel...');
    const wave1 = await Promise.all([
      this.marketResearchAgent.run(idea),
      this.teamFitAgent.run(idea),
      this.tractionAgent.run(idea),
      this.clarityAgent.run(idea),
    ]);
    for (const output of wave1) {
      results[output.agentName] = output;
      allOutputs.push(output);
      this.logger.log(`  ✅ ${output.agentName}: ${output.score}/100 (${output.durationMs}ms)`);
    }

    // ── Wave 2: Dependent agents (parallel within wave) ──
    this.logger.log('🔄 Wave 2: Running dependent agents in parallel...');
    const wave2 = await Promise.all([
      this.differentiationAgent.run(idea, results),
      this.financialModelAgent.run(idea, results),
      this.regulatoryAgent.run(idea, results),
    ]);
    for (const output of wave2) {
      results[output.agentName] = output;
      allOutputs.push(output);
      this.logger.log(`  ✅ ${output.agentName}: ${output.score}/100 (${output.durationMs}ms)`);
    }

    // ── Wave 3: Red-Team (depends on all prior agents) ──
    this.logger.log('🔄 Wave 3: Running Red-Team agent...');
    const redTeamOutput = await this.redTeamAgent.run(idea, results);
    results[redTeamOutput.agentName] = redTeamOutput;
    allOutputs.push(redTeamOutput);
    this.logger.log(`  ✅ ${redTeamOutput.agentName}: ${redTeamOutput.score}/100 (${redTeamOutput.durationMs}ms)`);

    // ── Wave 4: Scoring Critic (pure logic) ──
    this.logger.log('🔄 Wave 4: Running Scoring Critic...');
    const criticStart = Date.now();
    const criticResult = this.scoringCriticAgent.compute(idea, results);
    const criticDuration = Date.now() - criticStart;
    this.logger.log(`  ✅ ScoringCritic: overall=${criticResult.overallScore}/100 (${criticDuration}ms)`);
    if (criticResult.appliedCeilings.length > 0) {
      this.logger.log(`  ⚠️ Applied ceilings: ${criticResult.appliedCeilings.join(', ')}`);
    }

    // ── Aggregate results ──

    // Collect strengths and weaknesses from all agents (deduplicate)
    const allStrengths = [...new Set(allOutputs.flatMap((o) => o.strengths))];
    const allWeaknesses = [...new Set(allOutputs.flatMap((o) => o.weaknesses))];

    // Build summary from top agents
    const summaryParts = [
      results.MarketResearch?.reasoning,
      results.Differentiation?.reasoning,
      results.TeamFit?.reasoning,
    ].filter(Boolean);
    const summary = summaryParts.join(' ') || 'Evaluation complete.';

    // Extract extra fields
    const competitorLandscape = results.MarketResearch?.extra?.competitorLandscape || [];
    const financialProjection = results.FinancialModel?.extra?.financialProjection || {
      summary: 'No projection.',
      yearOneRevenue: 'N/A',
      yearThreeRevenue: 'N/A',
      breakEvenMonths: 0,
    };
    const redTeamCritique = results.RedTeam?.extra?.redTeamCritique || {
      summary: 'No critique.',
      criticalRisks: [],
    };

    // Token usage aggregation
    const perAgent = allOutputs.map((o) => ({
      agentName: o.agentName,
      inputTokens: o.tokenUsage?.inputTokens ?? 0,
      outputTokens: o.tokenUsage?.outputTokens ?? 0,
      durationMs: o.durationMs ?? 0,
    }));
    perAgent.push({
      agentName: 'ScoringCritic',
      inputTokens: 0,
      outputTokens: 0,
      durationMs: criticDuration,
    });

    const totalDurationMs = Date.now() - pipelineStart;
    this.logger.log(`🏁 Pipeline complete in ${totalDurationMs}ms — Overall: ${criticResult.overallScore}/100`);

    return {
      overallScore: criticResult.overallScore,
      scoreBreakdown: criticResult.scoreBreakdown,
      summary,
      strengths: allStrengths.slice(0, 8), // Cap at 8 top strengths
      weaknesses: allWeaknesses.slice(0, 8),
      agentOutputs: allOutputs,
      competitorLandscape,
      financialProjection,
      redTeamCritique,
      rubricVersion: this.scoringCriticAgent.getRubricVersion(),
      appliedCeilings: criticResult.appliedCeilings,
      tokenUsage: {
        totalInputTokens: perAgent.reduce((s, a) => s + a.inputTokens, 0),
        totalOutputTokens: perAgent.reduce((s, a) => s + a.outputTokens, 0),
        perAgent,
      },
      totalDurationMs,
    };
  }
}
