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
const user_schema_1 = require("../../database/schemas/user.schema");
const evaluation_service_1 = require("../evaluation/evaluation.service");
const pinecone_service_1 = require("../pinecone/pinecone.service");
let IdeasService = IdeasService_1 = class IdeasService {
    ideaModel;
    userModel;
    evaluationService;
    pineconeService;
    logger = new common_1.Logger(IdeasService_1.name);
    constructor(ideaModel, userModel, evaluationService, pineconeService) {
        this.ideaModel = ideaModel;
        this.userModel = userModel;
        this.evaluationService = evaluationService;
        this.pineconeService = pineconeService;
    }
    async create(founderId, createIdeaDto) {
        const user = await this.userModel.findOne({ userId: founderId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.tier === 'free') {
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            const ideasThisMonth = await this.ideaModel.countDocuments({
                founderId,
                createdAt: { $gte: startOfMonth },
            });
            if (ideasThisMonth >= 1) {
                throw new common_1.ForbiddenException('UPGRADE_REQUIRED');
            }
        }
        const newIdea = await this.ideaModel.create({
            founderId,
            status: 'submitted',
            ...createIdeaDto,
        });
        this.logger.log(`New idea submitted by founder: ${founderId}, Idea ID: ${newIdea.ideaId}`);
        await this.evaluationService.triggerEvaluation(newIdea.ideaId);
        const textForEmbedding = `Title: ${newIdea.title}. Pitch: ${newIdea.oneLinePitch}. Description: ${newIdea.description}. Domain: ${newIdea.domain}. Target Market: ${newIdea.targetMarket}`;
        this.pineconeService.upsertIdea(newIdea.ideaId, textForEmbedding, {
            founderId,
            title: newIdea.title,
        }).catch(err => {
            this.logger.error(`Failed to trigger pinecone upsert for idea ${newIdea.ideaId}`, err);
        });
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
        const history = await this.evaluationService.getEvaluationHistory(ideaId);
        return {
            ...idea,
            evaluation: evaluation ? evaluation.toJSON() : null,
            evaluationHistory: history.map((e) => ({
                evaluationId: e.evaluationId,
                version: e.version,
                overallScore: e.overallScore,
                createdAt: e.createdAt,
                supersededAt: e.supersededAt,
            })),
        };
    }
    async reEvaluate(ideaId, founderId) {
        const idea = await this.ideaModel.findOne({ ideaId, founderId });
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        await this.evaluationService.supersedeCurrent(ideaId);
        idea.status = 'submitted';
        await idea.save();
        await this.evaluationService.triggerEvaluation(ideaId);
        this.logger.log(`Re-evaluation triggered for idea: ${ideaId}`);
        return { message: 'Re-evaluation started' };
    }
    async findSimilar(text, topK = 3) {
        if (!text || text.trim().length === 0) {
            return [];
        }
        const similarMatches = await this.pineconeService.findSimilar(text, topK);
        return similarMatches;
    }
    async getExploreFeed(filters) {
        const query = { status: 'evaluated' };
        if (filters?.domain) {
            query.domain = { $regex: new RegExp(filters.domain, 'i') };
        }
        const ideas = await this.ideaModel
            .find(query)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        const ideaIds = ideas.map((i) => i.ideaId);
        const evaluations = await Promise.all(ideaIds.map((id) => this.evaluationService.getEvaluationByIdeaId(id)));
        const evalMap = new Map(evaluations.filter(Boolean).map((e) => [e.ideaId, e]));
        let results = ideas.map((idea) => {
            const evaluation = evalMap.get(idea.ideaId);
            return {
                ideaId: idea.ideaId,
                title: idea.title,
                oneLinePitch: idea.oneLinePitch,
                domain: idea.domain,
                targetMarket: idea.targetMarket,
                overallScore: evaluation?.overallScore ?? null,
                createdAt: idea.createdAt,
            };
        });
        if (filters?.minScore) {
            results = results.filter((r) => (r.overallScore ?? 0) >= filters.minScore);
        }
        if (filters?.sort === 'score') {
            results.sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0));
        }
        return results;
    }
    async getExploreIdea(ideaId, investorId, interestStatus) {
        const idea = await this.ideaModel.findOne({ ideaId }).lean().exec();
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        const evaluation = await this.evaluationService.getEvaluationByIdeaId(ideaId);
        const base = {
            ideaId: idea.ideaId,
            title: idea.title,
            oneLinePitch: idea.oneLinePitch,
            domain: idea.domain,
            targetMarket: idea.targetMarket,
            description: idea.description,
            overallScore: evaluation?.overallScore ?? null,
            createdAt: idea.createdAt,
            isBreakdownUnlocked: interestStatus === 'approved',
            interestStatus: interestStatus || null,
        };
        if (interestStatus === 'approved' && evaluation) {
            base.evaluation = evaluation.toJSON();
        }
        return base;
    }
};
exports.IdeasService = IdeasService;
exports.IdeasService = IdeasService = IdeasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(idea_schema_1.Idea.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        evaluation_service_1.EvaluationService,
        pinecone_service_1.PineconeService])
], IdeasService);
//# sourceMappingURL=ideas.service.js.map