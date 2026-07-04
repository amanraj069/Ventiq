import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class DifferentiationAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, DifferentiationAgent.name);
  }

  getAgentName(): string {
    return 'Differentiation';
  }

  protected async evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating differentiation for: ${idea.ideaId}`);

    const competitorContext = priorResults?.MarketResearch?.extra?.competitorLandscape
      ? `\nKnown competitors from market research:\n${JSON.stringify(priorResults.MarketResearch.extra.competitorLandscape, null, 2)}`
      : '';

    const prompt = `You are a competitive strategy expert. Evaluate the startup's differentiation and defensibility.

=== STARTUP ===
${this.formatIdeaContext(idea)}
${competitorContext}

=== YOUR FOCUS ===
Evaluate: Uniqueness of approach, competitive moat, defensibility (IP, network effects, switching costs), and sustainable advantage.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, differentiation score>,
  "reasoning": "<2-3 sentences on differentiation quality>",
  "strengths": ["<differentiation strength 1>", "<strength 2>"],
  "weaknesses": ["<differentiation weakness 1>", "<weakness 2>"]
}

Score high for clear moats and unique approaches. Score low for "me-too" ideas with no defensibility.`;

    const response = await this.model.invoke(prompt);
    const parsed = this.parseJson(response.content.toString());

    return {
      agentName: this.getAgentName(),
      score: parsed.score ?? 0,
      reasoning: parsed.reasoning || 'No reasoning provided.',
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
    };
  }
}
