"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MarketResearchAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketResearchAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const google_genai_1 = require("@langchain/google-genai");
const prompts_1 = require("@langchain/core/prompts");
let MarketResearchAgent = MarketResearchAgent_1 = class MarketResearchAgent {
    configService;
    logger = new common_1.Logger(MarketResearchAgent_1.name);
    model;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('gemini.apiKey');
        this.model = new google_genai_1.ChatGoogleGenerativeAI({
            apiKey,
            model: 'gemini-1.5-flash',
            maxOutputTokens: 2048,
        });
    }
    async evaluate(idea) {
        this.logger.log(`Evaluating market potential for idea: ${idea.ideaId}`);
        const promptTemplate = prompts_1.PromptTemplate.fromTemplate(`
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
            const jsonMatch = outputText.match(/```json\\n([\\s\\S]*?)\\n```/);
            let parsedOutput;
            if (jsonMatch) {
                parsedOutput = JSON.parse(jsonMatch[1]);
            }
            else {
                parsedOutput = JSON.parse(outputText);
            }
            return {
                score: parsedOutput.score || 0,
                reasoning: parsedOutput.reasoning || 'No reasoning provided.',
                strengths: parsedOutput.strengths || [],
                weaknesses: parsedOutput.weaknesses || [],
            };
        }
        catch (error) {
            this.logger.error('Failed to evaluate market potential', error);
            return {
                score: 0,
                reasoning: 'Evaluation failed due to an error.',
                strengths: [],
                weaknesses: [],
            };
        }
    }
};
exports.MarketResearchAgent = MarketResearchAgent;
exports.MarketResearchAgent = MarketResearchAgent = MarketResearchAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MarketResearchAgent);
//# sourceMappingURL=market-research.agent.js.map