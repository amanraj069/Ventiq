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
const base_agent_1 = require("./base-agent");
let MarketResearchAgent = MarketResearchAgent_1 = class MarketResearchAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, MarketResearchAgent_1.name);
    }
    getAgentName() {
        return 'MarketResearch';
    }
    async evaluate(idea, _priorResults) {
        this.logger.log(`Evaluating market potential for: ${idea.ideaId}`);
        const prompt = `You are an expert market analyst at a top-tier VC firm. Evaluate ONLY the market potential of this startup.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Market size (TAM/SAM/SOM), market timing, growth trajectory, target audience clarity, and competitive landscape.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, market potential score>,
  "reasoning": "<2-3 sentences explaining your market assessment>",
  "strengths": ["<market strength 1>", "<market strength 2>"],
  "weaknesses": ["<market weakness 1>", "<market weakness 2>"],
  "competitorLandscape": [
    { "name": "<competitor>", "description": "<what they do>", "threatLevel": "low|medium|high" }
  ]
}

Be realistic. Score based on addressable market size, timing, and clarity of target audience.`;
        const response = await this.model.invoke(prompt);
        const parsed = this.parseJson(response.content.toString());
        return {
            agentName: this.getAgentName(),
            score: parsed.score ?? 0,
            reasoning: parsed.reasoning || 'No reasoning provided.',
            strengths: parsed.strengths || [],
            weaknesses: parsed.weaknesses || [],
            extra: {
                competitorLandscape: (parsed.competitorLandscape || []).map((c) => ({
                    name: c.name || 'Unknown',
                    description: c.description || '',
                    threatLevel: ['low', 'medium', 'high'].includes(c.threatLevel) ? c.threatLevel : 'medium',
                })),
            },
        };
    }
};
exports.MarketResearchAgent = MarketResearchAgent;
exports.MarketResearchAgent = MarketResearchAgent = MarketResearchAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MarketResearchAgent);
//# sourceMappingURL=market-research.agent.js.map