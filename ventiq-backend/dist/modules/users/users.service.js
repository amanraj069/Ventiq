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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
let UsersService = UsersService_1 = class UsersService {
    userModel;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getMe(userId) {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.userId,
            email: user.email,
            name: user.name,
            picture: user.picture,
            role: user.role,
            onboardingComplete: user.onboardingComplete,
            investorVerificationStatus: user.investorVerificationStatus,
            investorProfile: user.investorProfile,
            founderProfile: user.founderProfile,
            tier: user.tier,
            createdAt: user.createdAt,
        };
    }
    async setRole(userId, dto) {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role && user.onboardingComplete) {
            throw new common_1.BadRequestException('Role already set and onboarding completed');
        }
        const updated = await this.userModel.findOneAndUpdate({ userId }, { $set: { role: dto.role } }, { new: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException('User not found during update');
        }
        return {
            id: updated.userId,
            role: updated.role,
            onboardingComplete: updated.onboardingComplete,
        };
    }
    async saveFounderProfile(userId, dto) {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'founder') {
            throw new common_1.BadRequestException('User is not a founder');
        }
        const updated = await this.userModel.findOneAndUpdate({ userId }, {
            $set: {
                founderProfile: {
                    isTechnical: dto.isTechnical,
                    priorExperience: dto.priorExperience,
                    linkedinUrl: dto.linkedinUrl,
                },
                onboardingComplete: true,
            }
        }, { new: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException('User not found during update');
        }
        this.logger.log(`Founder onboarding completed: ${updated.email}`);
        return {
            id: updated.userId,
            role: updated.role,
            onboardingComplete: updated.onboardingComplete,
            founderProfile: updated.founderProfile,
        };
    }
    async submitInvestorVerification(userId, dto) {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'investor') {
            throw new common_1.BadRequestException('User is not an investor');
        }
        const updated = await this.userModel.findOneAndUpdate({ userId }, {
            $set: {
                investorProfile: {
                    investorType: dto.investorType,
                    checkSizeMin: dto.checkSizeMin,
                    checkSizeMax: dto.checkSizeMax,
                    sectors: dto.sectors,
                    linkedinUrl: dto.linkedinUrl,
                    accreditationDeclared: dto.accreditationDeclared,
                },
                investorVerificationStatus: 'pending',
                onboardingComplete: true,
            }
        }, { new: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException('User not found during update');
        }
        this.logger.log(`Investor verification submitted: ${updated.email}`);
        return {
            id: updated.userId,
            role: updated.role,
            onboardingComplete: updated.onboardingComplete,
            investorVerificationStatus: updated.investorVerificationStatus,
            investorProfile: updated.investorProfile,
        };
    }
    async getPendingInvestors() {
        const users = await this.userModel
            .find({ role: 'investor', investorVerificationStatus: 'pending' })
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        return users.map((u) => ({
            userId: u.userId,
            name: u.name,
            email: u.email,
            picture: u.picture,
            investorProfile: u.investorProfile,
            investorVerificationStatus: u.investorVerificationStatus,
            createdAt: u.createdAt,
        }));
    }
    async verifyInvestor(userId, approved) {
        const user = await this.userModel.findOne({ userId }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== 'investor') {
            throw new common_1.BadRequestException('User is not an investor');
        }
        user.investorVerificationStatus = approved ? 'verified' : 'rejected';
        await user.save();
        this.logger.log(`Investor ${user.email} ${approved ? 'verified' : 'rejected'}`);
        return {
            userId: user.userId,
            name: user.name,
            email: user.email,
            investorVerificationStatus: user.investorVerificationStatus,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map