import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class ClarityAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, ClarityAgent.name);
  }

  getAgentName(): string {
    return 'Clarity';
  }

  protected async evaluate(idea: any, _priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating clarity for: ${idea.ideaId}`);

    const prompt = `You are a pitch consultant who has coached hundreds of Y Combinator applicants. Evaluate the clarity and coherence of this startup pitch.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Problem-solution fit articulation, one-line pitch effectiveness, description quality, completeness of submission, logical flow, and overall persuasiveness.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, clarity score>,
  "reasoning": "<2-3 sentences on pitch clarity>",
  "strengths": ["<clarity strength 1>", "<strength 2>"],
  "weaknesses": ["<clarity weakness 1>", "<weakness 2>"]
}

Score higher for concise, compelling pitches that clearly articulate the problem, solution, and why now. Score lower for vague, buzzword-heavy, or incomplete submissions.`;

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
