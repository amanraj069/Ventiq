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
var TeamFitAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamFitAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let TeamFitAgent = TeamFitAgent_1 = class TeamFitAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, TeamFitAgent_1.name);
    }
    getAgentName() {
        return 'TeamFit';
    }
    async evaluate(idea, _priorResults) {
        this.logger.log(`Evaluating team fit for: ${idea.ideaId}`);
        const prompt = `You are a talent and leadership expert who evaluates founding teams for VCs. Evaluate this startup's team.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== YOUR FOCUS ===
Evaluate: Team composition, co-founder dynamics, technical capability, domain expertise, prior startup/industry experience, and team completeness for the stage.

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, team fitness score>,
  "reasoning": "<2-3 sentences on team assessment>",
  "strengths": ["<team strength 1>", "<strength 2>"],
  "weaknesses": ["<team weakness 1>", "<weakness 2>"]
}

Score higher for diverse, experienced teams with technical capability. Score lower for solo founders with no relevant experience. Consider if the team has the right skills for the domain.`;
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
exports.TeamFitAgent = TeamFitAgent;
exports.TeamFitAgent = TeamFitAgent = TeamFitAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TeamFitAgent);
//# sourceMappingURL=team-fit.agent.js.map