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
var IdeasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const idea_schema_1 = require("../../database/schemas/idea.schema");
const evaluation_service_1 = require("../evaluation/evaluation.service");
let IdeasService = IdeasService_1 = class IdeasService {
    ideaModel;
    evaluationService;
    logger = new common_1.Logger(IdeasService_1.name);
    constructor(ideaModel, evaluationService) {
        this.ideaModel = ideaModel;
        this.evaluationService = evaluationService;
    }
    async create(founderId, createIdeaDto) {
        const newIdea = await this.ideaModel.create({
            founderId,
            status: 'submitted',
            ...createIdeaDto,
        });
        this.logger.log(`New idea submitted by founder: ${founderId}, Idea ID: ${newIdea.ideaId}`);
        await this.evaluationService.triggerEvaluation(newIdea.ideaId);
        return newIdea;
    }
    async findAllByFounder(founderId) {
        return this.ideaModel.find({ founderId }).sort({ createdAt: -1 }).exec();
    }
    async findOne(ideaId, founderId) {
        const idea = await this.ideaModel.findOne({ ideaId, founderId }).lean().exec();
        if (!idea) {
            return null;
        }
        const evaluation = await this.evaluationService.getEvaluationByIdeaId(ideaId);
        return {
            ...idea,
            evaluation: evaluation ? evaluation.toJSON() : null,
        };
    }
};
exports.IdeasService = IdeasService;
exports.IdeasService = IdeasService = IdeasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(idea_schema_1.Idea.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        evaluation_service_1.EvaluationService])
], IdeasService);
//# sourceMappingURL=ideas.service.js.map