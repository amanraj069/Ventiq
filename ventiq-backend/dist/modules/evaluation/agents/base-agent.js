"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvaluationAgent = void 0;
const google_genai_1 = require("@langchain/google-genai");
const common_1 = require("@nestjs/common");
class BaseEvaluationAgent {
    configService;
    logger;
    model;
    constructor(configService, agentName) {
        this.configService = configService;
        this.logger = new common_1.Logger(agentName);
        const apiKey = this.configService.get('gemini.apiKey');
        this.model = new google_genai_1.ChatGoogleGenerativeAI({
            apiKey,
            model: 'gemini-1.5-flash',
            maxOutputTokens: 2048,
        });
    }
    async run(idea, priorResults) {
        const start = Date.now();
        try {
            const result = await this.evaluate(idea, priorResults);
            result.durationMs = Date.now() - start;
            return result;
        }
        catch (error) {
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
    parseJson(text) {
        let jsonStr = text.trim();
        const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) {
            jsonStr = match[1].trim();
        }
        return JSON.parse(jsonStr);
    }
    formatIdeaContext(idea) {
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
exports.BaseEvaluationAgent = BaseEvaluationAgent;
//# sourceMappingURL=base-agent.js.map