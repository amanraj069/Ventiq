import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class TeamFitAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, TeamFitAgent.name);
  }

  getAgentName(): string {
    return 'TeamFit';
  }

  protected async evaluate(idea: any, _priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating team fit for: ${idea.ideaId}`);

    const prompt = `You are a talent and leadership expert who evaluates founding teams for VCs. Evaluate this startup's team.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Team composition, co-founder dynamics, technical capability, domain expertise, prior startup/industry experience, and team completeness for the stage.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, team fitness score>,
  "reasoning": "<2-3 sentences on team assessment>",
  "strengths": ["<team strength 1>", "<strength 2>"],
  "weaknesses": ["<team weakness 1>", "<weakness 2>"]
}

Score higher for diverse, experienced teams with technical capability. Score lower for solo founders with no relevant experience. Consider if the team has the right skills for the domain.`;

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
