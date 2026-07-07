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
var RedTeamAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedTeamAgent = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const base_agent_1 = require("./base-agent");
let RedTeamAgent = RedTeamAgent_1 = class RedTeamAgent extends base_agent_1.BaseEvaluationAgent {
    constructor(configService) {
        super(configService, RedTeamAgent_1.name);
    }
    getAgentName() {
        return 'RedTeam';
    }
    async evaluate(idea, priorResults) {
        this.logger.log(`Red-team critique for: ${idea.ideaId}`);
        const priorSummary = priorResults
            ? Object.values(priorResults)
                .map((r) => `${r.agentName} (${r.score}/100): ${r.reasoning}`)
                .join('\n')
            : 'No prior agent results available.';
        const allWeaknesses = priorResults
            ? Object.values(priorResults)
                .flatMap((r) => r.weaknesses)
                .join('; ')
            : '';
        const prompt = `You are a ruthless devil's advocate investor known for killing bad deals. Your job is to find every reason this startup will FAIL.

=== STARTUP ===
${this.formatIdeaContext(idea)}

=== PRIOR AGENT ASSESSMENTS ===
${priorSummary}

Known weaknesses identified so far: ${allWeaknesses || 'None identified.'}

=== YOUR MISSION ===
Assume the worst case. Identify fatal flaws, hidden risks, and reasons this startup will fail. Consider:
- Market timing risks
- Execution risks given the team
- Financial unsustainability
- Competitive threats that could crush them
- Regulatory landmines
- Technology risks
- Customer acquisition challenges

Return a JSON object (no markdown wrapping):
{
  "score": <0-100, survivability score — how likely this startup will NOT fail>,
  "reasoning": "<2-3 sentences summarizing the adversarial assessment>",
  "strengths": ["<reason it might survive 1>", "<reason 2>"],
  "weaknesses": ["<fatal flaw 1>", "<fatal flaw 2>"],
  "redTeamCritique": {
    "summary": "<1-2 sentences of the harshest honest assessment>",
    "criticalRisks": ["<critical risk 1>", "<critical risk 2>", "<critical risk 3>"]
  }
}

Be brutal but fair. Every startup has risks — find them.`;
        const response = await this.model.invoke(prompt);
        const parsed = this.parseJson(response.content.toString());
        return {
            agentName: this.getAgentName(),
            score: parsed.score ?? 0,
            reasoning: parsed.reasoning || 'No reasoning provided.',
            strengths: parsed.strengths || [],
            weaknesses: parsed.weaknesses || [],
            extra: {
                redTeamCritique: {
                    summary: parsed.redTeamCritique?.summary || 'No critique available.',
                    criticalRisks: parsed.redTeamCritique?.criticalRisks || [],
                },
            },
        };
    }
};
exports.RedTeamAgent = RedTeamAgent;
exports.RedTeamAgent = RedTeamAgent = RedTeamAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedTeamAgent);
//# sourceMappingURL=red-team.agent.js.map