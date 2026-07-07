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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeasController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const ideas_service_1 = require("./ideas.service");
const create_idea_dto_1 = require("./dto/create-idea.dto");
const decorators_1 = require("../../common/decorators");
const guards_1 = require("../../common/guards");
const interest_service_1 = require("../interest/interest.service");
let IdeasController = class IdeasController {
    ideasService;
    interestService;
    constructor(ideasService, interestService) {
        this.ideasService = ideasService;
        this.interestService = interestService;
    }
    async create(userId, createIdeaDto) {
        return this.ideasService.create(userId, createIdeaDto);
    }
    async checkSimilarity(text) {
        return this.ideasService.findSimilar(text, 3);
    }
    async exploreFeed(domain, minScore, sort) {
        return this.ideasService.getExploreFeed({
            domain,
            minScore: minScore ? parseInt(minScore, 10) : undefined,
            sort,
        });
    }
    async exploreIdea(investorId, ideaId) {
        const interest = await this.interestService.getInterestStatus(investorId, ideaId);
        return this.ideasService.getExploreIdea(ideaId, investorId, interest?.status);
    }
    async findAll(userId) {
        return this.ideasService.findAllByFounder(userId);
    }
    async findOne(userId, ideaId) {
        return this.ideasService.findOne(ideaId, userId);
    }
    async reEvaluate(userId, ideaId) {
        return this.ideasService.reEvaluate(ideaId, userId);
    }
};
exports.IdeasController = IdeasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_idea_dto_1.CreateIdeaDto]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('similarity-check'),
    __param(0, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "checkSimilarity", null);
__decorate([
    (0, common_1.Get)('explore'),
    (0, common_1.UseGuards)(guards_1.VerifiedInvestorGuard),
    __param(0, (0, common_1.Query)('domain')),
    __param(1, (0, common_1.Query)('minScore')),
    __param(2, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "exploreFeed", null);
__decorate([
    (0, common_1.Get)('explore/:ideaId'),
    (0, common_1.UseGuards)(guards_1.VerifiedInvestorGuard),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('ideaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "exploreIdea", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/re-evaluate'),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IdeasController.prototype, "reEvaluate", null);
exports.IdeasController = IdeasController = __decorate([
    (0, common_1.Controller)('ideas'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [ideas_service_1.IdeasService,
        interest_service_1.InterestService])
], IdeasController);
//# sourceMappingURL=ideas.controller.js.map