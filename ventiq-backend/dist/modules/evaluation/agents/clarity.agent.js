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
var ClarityAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClarityAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let ClarityAgent = ClarityAgent_1 = class ClarityAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, ClarityAgent_1.name);
    }
    getAgentName() {
        return 'Clarity';
    }
    async evaluate(idea, _priorResults) {
        this.logger.log(`Evaluating clarity for: ${idea.ideaId}`);
        const prompt = `You are a pitch consultant who has coached hundreds of Y Combinator applicants. Evaluate the clarity and coherence of this startup pitch.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Problem-solution fit articulation, one-line pitch effectiveness, description quality, completeness of submission, logical flow, and overall persuasiveness.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, clarity score>,
  "reasoning": "<2-3 sentences on pitch clarity>",
  "strengths": ["<clarity strength 1>", "<strength 2>"],
  "weaknesses": ["<clarity weakness 1>", "<weakness 2>"]
}

Score higher for concise, compelling pitches that clearly articulate the problem, solution, and why now. Score lower for vague, buzzword-heavy, or incomplete submissions.`;
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
exports.ClarityAgent = ClarityAgent;
exports.ClarityAgent = ClarityAgent = ClarityAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ClarityAgent);
//# sourceMappingURL=clarity.agent.js.map