import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

/**
 * Standard output shape for every evaluation agent.
 */
export interface AgentOutput {
  agentName: string;
  score: number;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
  /** Optional extra structured data the agent can attach */
  extra?: Record<string, any>;
  /** Token usage tracking */
  tokenUsage?: { inputTokens: number; outputTokens: number };
  durationMs?: number;
}

/**
 * Map of agentName → AgentOutput, passed to dependent agents.
 */
export type PriorResults = Record<string, AgentOutput>;

/**
 * Base class for all evaluation agents.
 * Provides shared LLM setup, JSON parsing, and duration tracking.
 */
export abstract class BaseEvaluationAgent {
  protected readonly logger: Logger;
  protected model: ChatGoogleGenerativeAI;

  constructor(
    protected readonly configService: ConfigService,
    agentName: string,
  ) {
    this.logger = new Logger(agentName);
    const apiKey = this.configService.get<string>('gemini.apiKey');
    this.model = new ChatGoogleGenerativeAI({
      apiKey,
      model: 'gemini-1.5-flash',
      maxOutputTokens: 2048,
    });
  }

  /**
   * Run the agent and track duration.
   */
  async run(idea: any, priorResults?: PriorResults): Promise<AgentOutput> {
    const start = Date.now();
    try {
      const result = await this.evaluate(idea, priorResults);
      result.durationMs = Date.now() - start;
      return result;
    } catch (error) {
      this.logger.error(`Agent failed`, error);
      return {
        agentName: this.getAgentName(),
        score: 0,
        reasoning: 'Agent evaluation failed due to an error.',
        strengths: [],
        weaknesses: [],
        durationMs: Date.now() - start,
      };
    }
  }

  /** Subclasses implement this */
  protected abstract evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput>;

  /** Return the agent's name identifier */
  abstract getAgentName(): string;

  /**
   * Extract JSON from LLM response, handling markdown code blocks.
   */
  protected parseJson(text: string): any {
    let jsonStr = text.trim();
    const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      jsonStr = match[1].trim();
    }
    return JSON.parse(jsonStr);
  }

  /**
   * Format idea data into a standard context block for prompts.
   */
  protected formatIdeaContext(idea: any): string {
    return `
Name: ${idea.title || 'N/A'}
One-Line Pitch: ${idea.oneLinePitch || 'N/A'}
Description: ${idea.description || 'N/A'}
Domain/Sector: ${idea.domain || 'N/A'}
Target Market: ${idea.targetMarket || 'N/A'}
Differentiation: ${idea.differentiation || 'N/A'}
Business Model: ${idea.businessModel || 'N/A'}
Competitors: ${idea.competitors || 'N/A'}
Website: ${idea.websiteUrl || 'N/A'}
Co-founders: ${idea.coFoundersCount ?? 'N/A'}
Technical Founder: ${idea.hasTechnicalFounder || 'N/A'}
Prior Experience: ${idea.priorExperience || 'N/A'}
Team Size: ${idea.totalTeamSize ?? 'N/A'}
Traction Status: ${idea.tractionStatus || 'N/A'}
Users: ${idea.userCount ?? 'N/A'}
MRR: ${idea.mrr ?? 'N/A'}
Retention: ${idea.retentionRate || 'N/A'}
Growth Trend: ${idea.growthTrend || 'N/A'}
Funding Stage: ${idea.fundingStage || 'N/A'}
Funding Ask: ${idea.fundingAsk ?? 'N/A'} ${idea.fundingAskCurrency || 'USD'}
Use of Funds: ${idea.useOfFunds || 'N/A'}`.trim();
  }
}
