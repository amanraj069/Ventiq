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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EvaluationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const idea_schema_1 = require("../../database/schemas/idea.schema");
const evaluation_schema_1 = require("../../database/schemas/evaluation.schema");
const market_research_agent_1 = require("./agents/market-research.agent");
let EvaluationProcessor = EvaluationProcessor_1 = class EvaluationProcessor extends bullmq_1.WorkerHost {
    ideaModel;
    evaluationModel;
    marketResearchAgent;
    logger = new common_1.Logger(EvaluationProcessor_1.name);
    constructor(ideaModel, evaluationModel, marketResearchAgent) {
        super();
        this.ideaModel = ideaModel;
        this.evaluationModel = evaluationModel;
        this.marketResearchAgent = marketResearchAgent;
    }
    async process(job) {
        this.logger.log(`Processing job ${job.id} of type ${job.name} with data: ${JSON.stringify(job.data)}`);
        if (job.name === 'evaluate-idea') {
            const { ideaId } = job.data;
            const idea = await this.ideaModel.findOne({ ideaId });
            if (!idea) {
                this.logger.error(`Idea not found: ${ideaId}`);
                throw new Error('Idea not found');
            }
            let evaluation = await this.evaluationModel.findOne({ ideaId });
            if (!evaluation) {
                evaluation = new this.evaluationModel({
                    ideaId,
                    status: 'evaluating',
                    overallScore: 0,
                    scoreBreakdown: {},
                    agentOutputs: [],
                });
                await evaluation.save();
            }
            const marketOutput = await this.marketResearchAgent.evaluate(idea);
            if (!evaluation.agentOutputs) {
                evaluation.agentOutputs = [];
            }
            evaluation.agentOutputs.push({
                agentName: 'MarketResearch',
                score: marketOutput.score,
                reasoning: marketOutput.reasoning,
                completedAt: new Date(),
            });
            evaluation.scoreBreakdown = {
                ...evaluation.scoreBreakdown,
                market: marketOutput.score,
            };
            evaluation.overallScore = marketOutput.score;
            evaluation.summary = marketOutput.reasoning;
            evaluation.strengths = marketOutput.strengths;
            evaluation.weaknesses = marketOutput.weaknesses;
            await evaluation.save();
            idea.status = 'evaluated';
            await idea.save();
            this.logger.log(`Completed evaluation for idea: ${ideaId}`);
            return evaluation;
        }
    }
};
exports.EvaluationProcessor = EvaluationProcessor;
exports.EvaluationProcessor = EvaluationProcessor = EvaluationProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('evaluation-queue'),
    __param(0, (0, mongoose_1.InjectModel)(idea_schema_1.Idea.name)),
    __param(1, (0, mongoose_1.InjectModel)(evaluation_schema_1.Evaluation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        market_research_agent_1.MarketResearchAgent])
], EvaluationProcessor);
//# sourceMappingURL=evaluation.processor.js.map