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
var RegulatoryAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegulatoryAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let RegulatoryAgent = RegulatoryAgent_1 = class RegulatoryAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, RegulatoryAgent_1.name);
    }
    getAgentName() {
        return 'Regulatory';
    }
    async evaluate(idea, priorResults) {
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
};
exports.RegulatoryAgent = RegulatoryAgent;
exports.RegulatoryAgent = RegulatoryAgent = RegulatoryAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RegulatoryAgent);
//# sourceMappingURL=regulatory.agent.js.map