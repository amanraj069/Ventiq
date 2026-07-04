import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class TractionAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, TractionAgent.name);
  }

  getAgentName(): string {
    return 'Traction';
  }

  protected async evaluate(idea: any, _priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating traction for: ${idea.ideaId}`);

    const prompt = `You are a growth metrics expert who evaluates startups' traction and product-market fit signals. Evaluate this startup's traction.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Current traction stage, user growth, revenue metrics, retention rates, growth trends, and product-market fit signals. Consider the stage of the company.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, traction score>,
  "reasoning": "<2-3 sentences on traction quality>",
  "strengths": ["<traction strength 1>", "<strength 2>"],
  "weaknesses": ["<traction weakness 1>", "<weakness 2>"]
}

Score relative to the stated stage. An idea-only startup with a strong thesis can score 20-40. Generating revenue with good retention can score 60-90. Penalize if traction data is missing or weak for the stated stage.`;

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
