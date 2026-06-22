import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

@Injectable()
export class MarketResearchAgent {
  private readonly logger = new Logger(MarketResearchAgent.name);
  private model: ChatGoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('gemini.apiKey');
    this.model = new ChatGoogleGenerativeAI({
      apiKey,
      model: 'gemini-1.5-flash',
      maxOutputTokens: 2048,
    });
  }

  async evaluate(idea: any): Promise<{
    score: number;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
  }> {
    this.logger.log(`Evaluating market potential for idea: ${idea.ideaId}`);

    const promptTemplate = PromptTemplate.fromTemplate(`
      You are an expert venture capitalist and startup evaluator specializing in Market Research.
      Evaluate the following startup idea's market potential, target audience, and differentiation.
      
      Idea Title: {title}
      One Line Pitch: {oneLinePitch}
      Description: {description}
      Target Market: {targetMarket}
      Competitors: {competitors}
      Differentiation: {differentiation}
      Business Model: {businessModel}

      Provide your evaluation as a JSON object with the following structure exactly (no markdown formatting outside of the JSON block):
      {{
        "score": (a number between 0 and 100 representing market potential),
        "reasoning": "A short paragraph explaining the score",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"]
      }}
    `);

    try {
      const formattedPrompt = await promptTemplate.format({
        title: idea.title || 'N/A',
        oneLinePitch: idea.oneLinePitch || 'N/A',
        description: idea.description || 'N/A',
        targetMarket: idea.targetMarket || 'N/A',
        competitors: idea.competitors || 'N/A',
        differentiation: idea.differentiation || 'N/A',
        businessModel: idea.businessModel || 'N/A',
      });

      const response = await this.model.invoke(formattedPrompt);
      const outputText = response.content.toString();
      
      // Basic JSON extraction in case the model wraps it in markdown blocks
      const jsonMatch = outputText.match(/```json\\n([\\s\\S]*?)\\n```/);
      let parsedOutput;
      if (jsonMatch) {
        parsedOutput = JSON.parse(jsonMatch[1]);
      } else {
        // Try parsing directly
        parsedOutput = JSON.parse(outputText);
      }

      return {
        score: parsedOutput.score || 0,
        reasoning: parsedOutput.reasoning || 'No reasoning provided.',
        strengths: parsedOutput.strengths || [],
        weaknesses: parsedOutput.weaknesses || [],
      };
    } catch (error) {
      this.logger.error('Failed to evaluate market potential', error);
      return {
        score: 0,
        reasoning: 'Evaluation failed due to an error.',
        strengths: [],
        weaknesses: [],
      };
    }
  }
}
