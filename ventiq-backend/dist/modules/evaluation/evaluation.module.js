"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const mongoose_1 = require("@nestjs/mongoose");
const evaluation_service_1 = require("./evaluation.service");
const evaluation_processor_1 = require("./evaluation.processor");
const pipeline_orchestrator_1 = require("./pipeline.orchestrator");
const market_research_agent_1 = require("./agents/market-research.agent");
const differentiation_agent_1 = require("./agents/differentiation.agent");
const financial_model_agent_1 = require("./agents/financial-model.agent");
const team_fit_agent_1 = require("./agents/team-fit.agent");
const traction_agent_1 = require("./agents/traction.agent");
const clarity_agent_1 = require("./agents/clarity.agent");
const regulatory_agent_1 = require("./agents/regulatory.agent");
const red_team_agent_1 = require("./agents/red-team.agent");
const scoring_critic_agent_1 = require("./agents/scoring-critic.agent");
const idea_schema_1 = require("../../database/schemas/idea.schema");
const evaluation_schema_1 = require("../../database/schemas/evaluation.schema");
let EvaluationModule = class EvaluationModule {
};
exports.EvaluationModule = EvaluationModule;
exports.EvaluationModule = EvaluationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: idea_schema_1.Idea.name, schema: idea_schema_1.IdeaSchema },
                { name: evaluation_schema_1.Evaluation.name, schema: evaluation_schema_1.EvaluationSchema },
            ]),
            bullmq_1.BullModule.registerQueue({
                name: 'evaluation-queue',
            }),
        ],
        providers: [
            evaluation_service_1.EvaluationService,
            evaluation_processor_1.EvaluationProcessor,
            pipeline_orchestrator_1.PipelineOrchestrator,
            market_research_agent_1.MarketResearchAgent,
            differentiation_agent_1.DifferentiationAgent,
            financial_model_agent_1.FinancialModelAgent,
            team_fit_agent_1.TeamFitAgent,
            traction_agent_1.TractionAgent,
            clarity_agent_1.ClarityAgent,
            regulatory_agent_1.RegulatoryAgent,
            red_team_agent_1.RedTeamAgent,
            scoring_critic_agent_1.ScoringCriticAgent,
        ],
        exports: [evaluation_service_1.EvaluationService],
    })
], EvaluationModule);
//# sourceMappingURL=evaluation.module.js.map