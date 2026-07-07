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
var TractionAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TractionAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let TractionAgent = TractionAgent_1 = class TractionAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, TractionAgent_1.name);
    }
    getAgentName() {
        return 'Traction';
    }
    async evaluate(idea, _priorResults) {
        this.logger.log(`Evaluating traction for: ${idea.ideaId}`);
        const prompt = `You are a growth metrics expert who evaluates startups' traction and product-market fit signals. Evaluate this startup's traction.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Current traction stage, user growth, revenue metrics, retention rates, growth trends, and product-market fit signals. Consider the stage of the company.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, traction score>,
  "reasoning": "<2-3 sentences on traction quality>",
  "strengths": ["<traction strength 1>", "<strength 2>"],
  "weaknesses": ["<traction weakness 1>", "<weakness 2>"]
}

Score relative to the stated stage. An idea-only startup with a strong thesis can score 20-40. Generating revenue with good retention can score 60-90. Penalize if traction data is missing or weak for the stated stage.`;
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
exports.TractionAgent = TractionAgent;
exports.TractionAgent = TractionAgent = TractionAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TractionAgent);
//# sourceMappingURL=traction.agent.js.map