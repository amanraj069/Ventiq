import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class RegulatoryAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, RegulatoryAgent.name);
  }

  getAgentName(): string {
    return 'Regulatory';
  }

  protected async evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating regulatory risks for: ${idea.ideaId}`);

    const marketContext = priorResults?.MarketResearch
      ? `\nMarket assessment: ${priorResults.MarketResearch.reasoning}`
      : '';

    const prompt = `You are a regulatory compliance and legal risk expert. Evaluate the regulatory landscape and legal barriers for this startup.

=== STARTUP ===
${this.formatIdeaContext(idea)}
${marketContext}

=== YOUR FOCUS ===
Evaluate: Regulatory requirements in the domain, compliance burden, data privacy concerns (GDPR/CCPA), licensing requirements, industry-specific regulations, and potential legal barriers to entry.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, regulatory readiness score — higher means fewer regulatory risks>,
  "reasoning": "<2-3 sentences on regulatory landscape>",
  "strengths": ["<regulatory advantage 1>", "<advantage 2>"],
  "weaknesses": ["<regulatory risk 1>", "<risk 2>"]
}

Score high (80-100) for industries with minimal regulation. Score low (20-40) for highly regulated industries (healthcare, fintech, crypto) where the startup shows no regulatory awareness.`;

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
