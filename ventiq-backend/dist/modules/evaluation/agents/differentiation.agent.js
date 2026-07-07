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
var DifferentiationAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentiationAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let DifferentiationAgent = DifferentiationAgent_1 = class DifferentiationAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, DifferentiationAgent_1.name);
    }
    getAgentName() {
        return 'Differentiation';
    }
    async evaluate(idea, priorResults) {
        this.logger.log(`Evaluating differentiation for: ${idea.ideaId}`);
        const competitorContext = priorResults?.MarketResearch?.extra?.competitorLandscape
            ? `\nKnown competitors from market research:\n${JSON.stringify(priorResults.MarketResearch.extra.competitorLandscape, null, 2)}`
            : '';
        const prompt = `You are a competitive strategy expert. Evaluate the startup's differentiation and defensibility.

=== STARTUP ===
${this.formatIdeaContext(idea)}
${competitorContext}

=== YOUR FOCUS ===
Evaluate: Uniqueness of approach, competitive moat, defensibility (IP, network effects, switching costs), and sustainable advantage.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, differentiation score>,
  "reasoning": "<2-3 sentences on differentiation quality>",
  "strengths": ["<differentiation strength 1>", "<strength 2>"],
  "weaknesses": ["<differentiation weakness 1>", "<weakness 2>"]
}

Score high for clear moats and unique approaches. Score low for "me-too" ideas with no defensibility.`;
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
exports.DifferentiationAgent = DifferentiationAgent;
exports.DifferentiationAgent = DifferentiationAgent = DifferentiationAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DifferentiationAgent);
//# sourceMappingURL=differentiation.agent.js.map