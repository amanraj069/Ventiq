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
var InterestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const interest_schema_1 = require("../../database/schemas/interest.schema");
const idea_schema_1 = require("../../database/schemas/idea.schema");
const user_schema_1 = require("../../database/schemas/user.schema");
let InterestService = InterestService_1 = class InterestService {
    interestModel;
    ideaModel;
    userModel;
    logger = new common_1.Logger(InterestService_1.name);
    constructor(interestModel, ideaModel, userModel) {
        this.interestModel = interestModel;
        this.ideaModel = ideaModel;
        this.userModel = userModel;
    }
    async expressInterest(investorId, ideaId, message) {
        const idea = await this.ideaModel.findOne({ ideaId }).exec();
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found');
        }
        if (idea.status !== 'evaluated') {
            throw new common_1.BadRequestException('Cannot express interest in an idea that has not been evaluated yet.');
        }
        const existing = await this.interestModel.findOne({ ideaId, investorId }).exec();
        if (existing) {
            throw new common_1.BadRequestException('You have already expressed interest in this idea.');
        }
        const interest = await this.interestModel.create({
            ideaId,
            investorId,
            founderId: idea.founderId,
            status: 'pending',
            message,
        });
        this.logger.log(`Investor ${investorId} expressed interest in idea ${ideaId}`);
        return interest;
    }
    async getInvestorInterests(investorId) {
        const interests = await this.interestModel.find({ investorId }).sort({ createdAt: -1 }).lean().exec();
        const ideaIds = interests.map((i) => i.ideaId);
        const ideas = await this.ideaModel.find({ ideaId: { $in: ideaIds } }).lean().exec();
        const ideaMap = new Map(ideas.map((i) => [i.ideaId, i]));
        return interests.map((interest) => {
            const idea = ideaMap.get(interest.ideaId);
            return {
                ...interest,
                idea: idea
                    ? {
                        ideaId: idea.ideaId,
                        title: idea.title,
                        oneLinePitch: idea.oneLinePitch,
                        domain: idea.domain,
                        status: idea.status,
                    }
                    : null,
            };
        });
    }
    async getFounderInterestInbox(founderId, ideaId) {
        const idea = await this.ideaModel.findOne({ ideaId, founderId }).exec();
        if (!idea) {
            throw new common_1.NotFoundException('Idea not found or you are not the owner.');
        }
        const interests = await this.interestModel.find({ ideaId, founderId }).sort({ createdAt: -1 }).lean().exec();
        const investorIds = interests.map((i) => i.investorId);
        const investors = await this.userModel.find({ userId: { $in: investorIds } }).lean().exec();
        const investorMap = new Map(investors.map((u) => [u.userId, u]));
        return interests.map((interest) => {
            const investor = investorMap.get(interest.investorId);
            return {
                ...interest,
                investor: investor
                    ? {
                        userId: investor.userId,
                        name: investor.name,
                        email: investor.email,
                        picture: investor.picture,
                        investorProfile: investor.investorProfile,
                    }
                    : null,
            };
        });
    }
    async approveInterest(founderId, interestId) {
        const interest = await this.interestModel.findOne({ interestId }).exec();
        if (!interest) {
            throw new common_1.NotFoundException('Interest not found');
        }
        if (interest.founderId !== founderId) {
            throw new common_1.ForbiddenException('You are not the owner of this idea.');
        }
        if (interest.status !== 'pending') {
            throw new common_1.BadRequestException(`Interest is already ${interest.status}.`);
        }
        interest.status = 'approved';
        await interest.save();
        this.logger.log(`Founder ${founderId} approved interest ${interestId}`);
        return interest;
    }
    async declineInterest(founderId, interestId) {
        const interest = await this.interestModel.findOne({ interestId }).exec();
        if (!interest) {
            throw new common_1.NotFoundException('Interest not found');
        }
        if (interest.founderId !== founderId) {
            throw new common_1.ForbiddenException('You are not the owner of this idea.');
        }
        if (interest.status !== 'pending') {
            throw new common_1.BadRequestException(`Interest is already ${interest.status}.`);
        }
        interest.status = 'declined';
        await interest.save();
        this.logger.log(`Founder ${founderId} declined interest ${interestId}`);
        return interest;
    }
    async getInterestStatus(investorId, ideaId) {
        const interest = await this.interestModel.findOne({ investorId, ideaId }).lean().exec();
        return interest || null;
    }
};
exports.InterestService = InterestService;
exports.InterestService = InterestService = InterestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(interest_schema_1.Interest.name)),
    __param(1, (0, mongoose_1.InjectModel)(idea_schema_1.Idea.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], InterestService);
//# sourceMappingURL=interest.service.js.map