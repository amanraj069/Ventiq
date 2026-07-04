import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';

@Injectable()
export class FinancialModelAgent extends BaseEvaluationAgent {
  constructor(configService: ConfigService) {
    super(configService, FinancialModelAgent.name);
  }

  getAgentName(): string {
    return 'FinancialModel';
  }

  protected async evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput> {
    this.logger.log(`Evaluating financial model for: ${idea.ideaId}`);

    const marketContext = priorResults?.MarketResearch
      ? `\nMarket research score: ${priorResults.MarketResearch.score}/100\nMarket assessment: ${priorResults.MarketResearch.reasoning}`
      : '';
    const tractionContext = priorResults?.Traction
      ? `\nTraction score: ${priorResults.Traction.score}/100\nTraction assessment: ${priorResults.Traction.reasoning}`
      : '';

    const prompt = `You are a financial analyst specializing in early-stage startup valuation. Evaluate the business model and scalability.

=== STARTUP ===
${this.formatIdeaContext(idea)}
${marketContext}
${tractionContext}

=== YOUR FOCUS ===
Evaluate: Business model viability, unit economics potential, revenue model clarity, scalability of operations, and path to profitability.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, scalability and financial viability score>,
  "reasoning": "<2-3 sentences on financial viability>",
  "strengths": ["<financial strength 1>", "<strength 2>"],
  "weaknesses": ["<financial weakness 1>", "<weakness 2>"],
  "financialProjection": {
    "summary": "<1-2 sentence financial outlook>",
    "yearOneRevenue": "<estimated Y1 revenue, e.g. '$50K-$100K'>",
    "yearThreeRevenue": "<estimated Y3 revenue, e.g. '$1M-$3M'>",
    "breakEvenMonths": <estimated months to break even>
  }
}

Base projections on the business model, market size, traction data, and funding ask. Be conservative.`;

    const response = await this.model.invoke(prompt);
    const parsed = this.parseJson(response.content.toString());

    return {
      agentName: this.getAgentName(),
      score: parsed.score ?? 0,
      reasoning: parsed.reasoning || 'No reasoning provided.',
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      extra: {
        financialProjection: {
          summary: parsed.financialProjection?.summary || 'No projection available.',
          yearOneRevenue: parsed.financialProjection?.yearOneRevenue || 'N/A',
          yearThreeRevenue: parsed.financialProjection?.yearThreeRevenue || 'N/A',
          breakEvenMonths: parsed.financialProjection?.breakEvenMonths ?? 0,
        },
      },
    };
  }
}
