import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class RedTeamAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, RedTeamAgent.name);
  }

  getAgentName(): string {
    return 'RedTeam';
  }

  protected async evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Red-team critique for: ${idea.ideaId}`);

    // Summarize all prior agent results for context
    const priorSummary = priorResults
      ? Object.values(priorResults)
          .map((r) => `${r.agentName} (${r.score}/100): ${r.reasoning}`)
          .join('\n')
      : 'No prior agent results available.';

    const allWeaknesses = priorResults
      ? Object.values(priorResults)
          .flatMap((r) => r.weaknesses)
          .join('; ')
      : '';

    const prompt = `You are a ruthless devil's advocate investor known for killing bad deals. Your job is to find every reason this startup will FAIL.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== PRIOR AGENT ASSESSMENTS ===
${priorSummary}

Known weaknesses identified so far: ${allWeaknesses || 'None identified.'}

=== YOUR MISSION ===
Assume the worst case. Identify fatal flaws, hidden risks, and reasons this startup will fail. Consider:
- Market timing risks
- Execution risks given the team
- Financial unsustainability
- Competitive threats that could crush them
- Regulatory landmines
- Technology risks
- Customer acquisition challenges

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, survivability score — how likely this startup will NOT fail>,
  "reasoning": "<2-3 sentences summarizing the adversarial assessment>",
  "strengths": ["<reason it might survive 1>", "<reason 2>"],
  "weaknesses": ["<fatal flaw 1>", "<fatal flaw 2>"],
  "redTeamCritique": {
    "summary": "<1-2 sentences of the harshest honest assessment>",
    "criticalRisks": ["<critical risk 1>", "<critical risk 2>", "<critical risk 3>"]
  }
}

Be brutal but fair. Every startup has risks — find them.`;

    const response = await this.model.invoke(prompt);
    const parsed = this.parseJson(response.content.toString());

    return {
      agentName: this.getAgentName(),
      score: parsed.score ?? 0,
      reasoning: parsed.reasoning || 'No reasoning provided.',
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      extra: {
        redTeamCritique: {
          summary: parsed.redTeamCritique?.summary || 'No critique available.',
          criticalRisks: parsed.redTeamCritique?.criticalRisks || [],
        },
      },
    };
  }
}
