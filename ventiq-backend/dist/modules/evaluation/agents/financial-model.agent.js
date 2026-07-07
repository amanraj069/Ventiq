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
var FinancialModelAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialModelAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let FinancialModelAgent = FinancialModelAgent_1 = class FinancialModelAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, FinancialModelAgent_1.name);
    }
    getAgentName() {
        return 'FinancialModel';
    }
    async evaluate(idea, priorResults) {
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
};
exports.FinancialModelAgent = FinancialModelAgent;
exports.FinancialModelAgent = FinancialModelAgent = FinancialModelAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FinancialModelAgent);
//# sourceMappingURL=financial-model.agent.js.map