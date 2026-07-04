import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class MarketResearchAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, MarketResearchAgent.name);
  }

  getAgentName(): string {
    return 'MarketResearch';
  }

  protected async evaluate(idea: any, _priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating market potential for: ${idea.ideaId}`);

    const prompt = `You are an expert market analyst at a top-tier VC firm. Evaluate ONLY the market potential of this startup.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Market size (TAM/SAM/SOM), market timing, growth trajectory, target audience clarity, and competitive landscape.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, market potential score>,
  "reasoning": "<2-3 sentences explaining your market assessment>",
  "strengths": ["<market strength 1>", "<market strength 2>"],
  "weaknesses": ["<market weakness 1>", "<market weakness 2>"],
  "competitorLandscape": [
    { "name": "<competitor>", "description": "<what they do>", "threatLevel": "low|medium|high" }
  ]
}

Be realistic. Score based on addressable market size, timing, and clarity of target audience.`;

    const response = await this.model.invoke(prompt);
    const parsed = this.parseJson(response.content.toString());

    return {
      agentName: this.getAgentName(),
      score: parsed.score ?? 0,
      reasoning: parsed.reasoning || 'No reasoning provided.',
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      extra: {
        competitorLandscape: (parsed.competitorLandscape || []).map((c: any) => ({
          name: c.name || 'Unknown',
          description: c.description || '',
          threatLevel: ['low', 'medium', 'high'].includes(c.threatLevel) ? c.threatLevel : 'medium',
        })),
      },
    };
  }
}
