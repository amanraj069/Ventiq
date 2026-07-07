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
var PipelineOrchestrator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const market_research_agent_1 = require("./agents/market-research.agent");
const differentiation_agent_1 = require("./agents/differentiation.agent");
const financial_model_agent_1 = require("./agents/financial-model.agent");
const team_fit_agent_1 = require("./agents/team-fit.agent");
const traction_agent_1 = require("./agents/traction.agent");
const clarity_agent_1 = require("./agents/clarity.agent");
const regulatory_agent_1 = require("./agents/regulatory.agent");
const red_team_agent_1 = require("./agents/red-team.agent");
const scoring_critic_agent_1 = require("./agents/scoring-critic.agent");
let PipelineOrchestrator = PipelineOrchestrator_1 = class PipelineOrchestrator {
    marketResearchAgent;
    differentiationAgent;
    financialModelAgent;
    teamFitAgent;
    tractionAgent;
    clarityAgent;
    regulatoryAgent;
    redTeamAgent;
    scoringCriticAgent;
    logger = new common_1.Logger(PipelineOrchestrator_1.name);
    constructor(marketResearchAgent, differentiationAgent, financialModelAgent, teamFitAgent, tractionAgent, clarityAgent, regulatoryAgent, redTeamAgent, scoringCriticAgent) {
        this.marketResearchAgent = marketResearchAgent;
        this.differentiationAgent = differentiationAgent;
        this.financialModelAgent = financialModelAgent;
        this.teamFitAgent = teamFitAgent;
        this.tractionAgent = tractionAgent;
        this.clarityAgent = clarityAgent;
        this.regulatoryAgent = regulatoryAgent;
        this.redTeamAgent = redTeamAgent;
        this.scoringCriticAgent = scoringCriticAgent;
    }
    async run(idea) {
        const pipelineStart = Date.now();
        const results = {};
        const allOutputs = [];
        this.logger.log('🔄 Wave 1: Running independent agents in parallel...');
        const wave1 = await Promise.all([
            this.marketResearchAgent.run(idea),
            this.teamFitAgent.run(idea),
            this.tractionAgent.run(idea),
            this.clarityAgent.run(idea),
        ]);
        for (const output of wave1) {
            results[output.agentName] = output;
            allOutputs.push(output);
            this.logger.log(`  ✅ ${output.agentName}: ${output.score}/100 (${output.durationMs}ms)`);
        }
        this.logger.log('🔄 Wave 2: Running dependent agents in parallel...');
        const wave2 = await Promise.all([
            this.differentiationAgent.run(idea, results),
            this.financialModelAgent.run(idea, results),
            this.regulatoryAgent.run(idea, results),
        ]);
        for (const output of wave2) {
            results[output.agentName] = output;
            allOutputs.push(output);
            this.logger.log(`  ✅ ${output.agentName}: ${output.score}/100 (${output.durationMs}ms)`);
        }
        this.logger.log('🔄 Wave 3: Running Red-Team agent...');
        const redTeamOutput = await this.redTeamAgent.run(idea, results);
        results[redTeamOutput.agentName] = redTeamOutput;
        allOutputs.push(redTeamOutput);
        this.logger.log(`  ✅ ${redTeamOutput.agentName}: ${redTeamOutput.score}/100 (${redTeamOutput.durationMs}ms)`);
        this.logger.log('🔄 Wave 4: Running Scoring Critic...');
        const criticStart = Date.now();
        const criticResult = this.scoringCriticAgent.compute(idea, results);
        const criticDuration = Date.now() - criticStart;
        this.logger.log(`  ✅ ScoringCritic: overall=${criticResult.overallScore}/100 (${criticDuration}ms)`);
        if (criticResult.appliedCeilings.length > 0) {
            this.logger.log(`  ⚠️ Applied ceilings: ${criticResult.appliedCeilings.join(', ')}`);
        }
        const allStrengths = [...new Set(allOutputs.flatMap((o) => o.strengths))];
        const allWeaknesses = [...new Set(allOutputs.flatMap((o) => o.weaknesses))];
        const summaryParts = [
            results.MarketResearch?.reasoning,
            results.Differentiation?.reasoning,
            results.TeamFit?.reasoning,
        ].filter(Boolean);
        const summary = summaryParts.join(' ') || 'Evaluation complete.';
        const competitorLandscape = results.MarketResearch?.extra?.competitorLandscape || [];
        const financialProjection = results.FinancialModel?.extra?.financialProjection || {
            summary: 'No projection.',
            yearOneRevenue: 'N/A',
            yearThreeRevenue: 'N/A',
            breakEvenMonths: 0,
        };
        const redTeamCritique = results.RedTeam?.extra?.redTeamCritique || {
            summary: 'No critique.',
            criticalRisks: [],
        };
        const perAgent = allOutputs.map((o) => ({
            agentName: o.agentName,
            inputTokens: o.tokenUsage?.inputTokens ?? 0,
            outputTokens: o.tokenUsage?.outputTokens ?? 0,
            durationMs: o.durationMs ?? 0,
        }));
        perAgent.push({
            agentName: 'ScoringCritic',
            inputTokens: 0,
            outputTokens: 0,
            durationMs: criticDuration,
        });
        const totalDurationMs = Date.now() - pipelineStart;
        this.logger.log(`🏁 Pipeline complete in ${totalDurationMs}ms — Overall: ${criticResult.overallScore}/100`);
        return {
            overallScore: criticResult.overallScore,
            scoreBreakdown: criticResult.scoreBreakdown,
            summary,
            strengths: allStrengths.slice(0, 8),
            weaknesses: allWeaknesses.slice(0, 8),
            agentOutputs: allOutputs,
            competitorLandscape,
            financialProjection,
            redTeamCritique,
            rubricVersion: this.scoringCriticAgent.getRubricVersion(),
            appliedCeilings: criticResult.appliedCeilings,
            tokenUsage: {
                totalInputTokens: perAgent.reduce((s, a) => s + a.inputTokens, 0),
                totalOutputTokens: perAgent.reduce((s, a) => s + a.outputTokens, 0),
                perAgent,
            },
            totalDurationMs,
        };
    }
};
exports.PipelineOrchestrator = PipelineOrchestrator;
exports.PipelineOrchestrator = PipelineOrchestrator = PipelineOrchestrator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [market_research_agent_1.MarketResearchAgent,
        differentiation_agent_1.DifferentiationAgent,
        financial_model_agent_1.FinancialModelAgent,
        team_fit_agent_1.TeamFitAgent,
        traction_agent_1.TractionAgent,
        clarity_agent_1.ClarityAgent,
        regulatory_agent_1.RegulatoryAgent,
        red_team_agent_1.RedTeamAgent,
        scoring_critic_agent_1.ScoringCriticAgent])
], PipelineOrchestrator);
//# sourceMappingURL=pipeline.orchestrator.js.map