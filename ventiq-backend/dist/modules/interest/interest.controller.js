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
exports.InterestController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const interest_service_1 = require("./interest.service");
const decorators_1 = require("../../common/decorators");
const guards_1 = require("../../common/guards");
const decorators_2 = require("../../common/decorators");
let InterestController = class InterestController {
    interestService;
    constructor(interestService) {
        this.interestService = interestService;
    }
    async expressInterest(investorId, ideaId, message) {
        return this.interestService.expressInterest(investorId, ideaId, message);
    }
    async getMyInterests(investorId) {
        return this.interestService.getInvestorInterests(investorId);
    }
    async getInbox(founderId, ideaId) {
        return this.interestService.getFounderInterestInbox(founderId, ideaId);
    }
    async approve(founderId, interestId) {
        return this.interestService.approveInterest(founderId, interestId);
    }
    async decline(founderId, interestId) {
        return this.interestService.declineInterest(founderId, interestId);
    }
};
exports.InterestController = InterestController;
__decorate([
    (0, common_1.Post)(':ideaId'),
    (0, common_1.UseGuards)(guards_1.VerifiedInvestorGuard),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('ideaId')),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "expressInterest", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, decorators_2.Roles)('investor'),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "getMyInterests", null);
__decorate([
    (0, common_1.Get)('inbox/:ideaId'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, decorators_2.Roles)('founder'),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('ideaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "getInbox", null);
__decorate([
    (0, common_1.Patch)(':interestId/approve'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, decorators_2.Roles)('founder'),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('interestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':interestId/decline'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, decorators_2.Roles)('founder'),
    __param(0, (0, decorators_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('interestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "decline", null);
exports.InterestController = InterestController = __decorate([
    (0, common_1.Controller)('interests'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [interest_service_1.InterestService])
], InterestController);
//# sourceMappingURL=interest.controller.js.map