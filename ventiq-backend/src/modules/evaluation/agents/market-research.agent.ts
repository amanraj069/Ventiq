import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';

export interface MarketResearchOutput {
  overallScore: number;
  scoreBreakdown: {
    market: number;
    team: number;
    traction: number;
    differentiation: number;
    scalability: number;
    clarity: number;
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
  competitorLandscape: {
    name: string;
    description: string;
    threatLevel: 'low' | 'medium' | 'high';
  }[];
  financialProjection: {
    summary: string;
    yearOneRevenue: string;
    yearThreeRevenue: string;
    breakEvenMonths: number;
  };
  redTeamCritique: {
    summary: string;
    criticalRisks: string[];
  };
}

@Injectable()
export class MarketResearchAgent {
  private readonly logger = new Logger(MarketResearchAgent.name);
  private model: ChatGoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('gemini.apiKey');
    this.model = new ChatGoogleGenerativeAI({
      apiKey,
      model: 'gemini-1.5-flash',
      maxOutputTokens: 4096,
    });
  }

  async evaluate(idea: any): Promise<MarketResearchOutput> {
    this.logger.log(`Evaluating idea: ${idea.ideaId}`);

    const promptTemplate = PromptTemplate.fromTemplate(`
      You are an expert venture capitalist and startup evaluator. Conduct a thorough analysis of the following startup idea.

      === STARTUP DETAILS ===
      Name: {title}
      One-Line Pitch: {oneLinePitch}
      Description: {description}
      Domain/Sector: {domain}
      Target Market: {targetMarket}
      Differentiation: {differentiation}
      Business Model: {businessModel}
      Competitors: {competitors}
      Website: {websiteUrl}

      Team Info:
      - Co-founders: {coFoundersCount}
      - Technical Founder: {hasTechnicalFounder}
      - Prior Experience: {priorExperience}
      - Team Size: {totalTeamSize}

      Traction:
      - Status: {tractionStatus}
      - Users: {userCount}
      - MRR: {mrr}
      - Retention: {retentionRate}
      - Growth Trend: {growthTrend}

      Funding:
      - Stage: {fundingStage}
      - Ask: {fundingAsk} {fundingAskCurrency}
      - Use of Funds: {useOfFunds}

      === INSTRUCTIONS ===
      Provide a comprehensive evaluation as a single JSON object. Do NOT wrap in markdown code blocks.

      The JSON must have this exact structure:
      {{
        "overallScore": <number 0-100>,
        "scoreBreakdown": {{
          "market": <number 0-100, market size and opportunity>,
          "team": <number 0-100, team strength and composition>,
          "traction": <number 0-100, current traction and growth>,
          "differentiation": <number 0-100, uniqueness vs competitors>,
          "scalability": <number 0-100, ability to scale>,
          "clarity": <number 0-100, pitch clarity and coherence>
        }},
        "summary": "<2-3 sentence overall assessment>",
        "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
        "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
        "competitorLandscape": [
          {{ "name": "<competitor name>", "description": "<what they do and how they compare>", "threatLevel": "low|medium|high" }},
          {{ "name": "<competitor 2>", "description": "<description>", "threatLevel": "low|medium|high" }},
          {{ "name": "<competitor 3>", "description": "<description>", "threatLevel": "low|medium|high" }}
        ],
        "financialProjection": {{
          "summary": "<1-2 sentence financial outlook>",
          "yearOneRevenue": "<estimated year 1 revenue as string, e.g. '$50K-$100K'>",
          "yearThreeRevenue": "<estimated year 3 revenue as string, e.g. '$1M-$3M'>",
          "breakEvenMonths": <estimated months to break even, number>
        }},
        "redTeamCritique": {{
          "summary": "<1-2 sentence adversarial assessment of why this might fail>",
          "criticalRisks": ["<risk 1>", "<risk 2>", "<risk 3>"]
        }}
      }}

      Be realistic and data-driven. If information is missing (marked N/A), make reasonable assumptions based on the domain but penalize the score slightly for lack of detail.
      The overallScore should be a weighted average: market 25%, differentiation 20%, team 15%, traction 15%, scalability 15%, clarity 10%.
      Return ONLY the JSON object, no other text.
    `);

    try {
      const formattedPrompt = await promptTemplate.format({
        title: idea.title || 'N/A',
        oneLinePitch: idea.oneLinePitch || 'N/A',
        description: idea.description || 'N/A',
        domain: idea.domain || 'N/A',
        targetMarket: idea.targetMarket || 'N/A',
        differentiation: idea.differentiation || 'N/A',
        businessModel: idea.businessModel || 'N/A',
        competitors: idea.competitors || 'N/A',
        websiteUrl: idea.websiteUrl || 'N/A',
        coFoundersCount: idea.coFoundersCount ?? 'N/A',
        hasTechnicalFounder: idea.hasTechnicalFounder || 'N/A',
        priorExperience: idea.priorExperience || 'N/A',
        totalTeamSize: idea.totalTeamSize ?? 'N/A',
        tractionStatus: idea.tractionStatus || 'N/A',
        userCount: idea.userCount ?? 'N/A',
        mrr: idea.mrr ?? 'N/A',
        retentionRate: idea.retentionRate || 'N/A',
        growthTrend: idea.growthTrend || 'N/A',
        fundingStage: idea.fundingStage || 'N/A',
        fundingAsk: idea.fundingAsk ?? 'N/A',
        fundingAskCurrency: idea.fundingAskCurrency || 'USD',
        useOfFunds: idea.useOfFunds || 'N/A',
      });

      const response = await this.model.invoke(formattedPrompt);
      const outputText = response.content.toString();

      // Extract JSON — handle markdown wrapping if present
      let jsonStr = outputText;
      const jsonMatch = outputText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }

      const parsed = JSON.parse(jsonStr);

      return {
        overallScore: parsed.overallScore ?? 0,
        scoreBreakdown: {
          market: parsed.scoreBreakdown?.market ?? 0,
          team: parsed.scoreBreakdown?.team ?? 0,
          traction: parsed.scoreBreakdown?.traction ?? 0,
          differentiation: parsed.scoreBreakdown?.differentiation ?? 0,
          scalability: parsed.scoreBreakdown?.scalability ?? 0,
          clarity: parsed.scoreBreakdown?.clarity ?? 0,
        },
        summary: parsed.summary || 'No summary provided.',
        strengths: parsed.strengths || [],
        weaknesses: parsed.weaknesses || [],
        competitorLandscape: (parsed.competitorLandscape || []).map((c: any) => ({
          name: c.name || 'Unknown',
          description: c.description || '',
          threatLevel: ['low', 'medium', 'high'].includes(c.threatLevel) ? c.threatLevel : 'medium',
        })),
        financialProjection: {
          summary: parsed.financialProjection?.summary || 'No projection available.',
          yearOneRevenue: parsed.financialProjection?.yearOneRevenue || 'N/A',
          yearThreeRevenue: parsed.financialProjection?.yearThreeRevenue || 'N/A',
          breakEvenMonths: parsed.financialProjection?.breakEvenMonths ?? 0,
        },
        redTeamCritique: {
          summary: parsed.redTeamCritique?.summary || 'No critique available.',
          criticalRisks: parsed.redTeamCritique?.criticalRisks || [],
        },
      };
    } catch (error) {
      this.logger.error('Failed to evaluate idea', error);
      return {
        overallScore: 0,
        scoreBreakdown: { market: 0, team: 0, traction: 0, differentiation: 0, scalability: 0, clarity: 0 },
        summary: 'Evaluation failed due to an error.',
        strengths: [],
        weaknesses: [],
        competitorLandscape: [],
        financialProjection: {
          summary: 'Evaluation failed.',
          yearOneRevenue: 'N/A',
          yearThreeRevenue: 'N/A',
          breakEvenMonths: 0,
        },
        redTeamCritique: {
          summary: 'Evaluation failed.',
          criticalRisks: [],
        },
      };
    }
  }
}
