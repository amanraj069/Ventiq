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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIdeaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateIdeaDto {
    title;
    oneLinePitch;
    description;
    domain;
    targetMarket;
    differentiation;
    deckUrl;
    coFoundersCount;
    hasTechnicalFounder;
    priorExperience;
    totalTeamSize;
    tractionStatus;
    userCount;
    mrr;
    retentionRate;
    growthTrend;
    fundingAsk;
    fundingAskCurrency;
    useOfFunds;
    fundingStage;
}
exports.CreateIdeaDto = CreateIdeaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "oneLinePitch", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "domain", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "targetMarket", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "differentiation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "deckUrl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateIdeaDto.prototype, "coFoundersCount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['yes', 'no', 'partially', null]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "hasTechnicalFounder", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "priorExperience", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateIdeaDto.prototype, "totalTeamSize", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['Idea-only', 'Building', 'Launched', 'Generating Revenue', null]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "tractionStatus", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateIdeaDto.prototype, "userCount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateIdeaDto.prototype, "mrr", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "retentionRate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "growthTrend", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateIdeaDto.prototype, "fundingAsk", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "fundingAskCurrency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "useOfFunds", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateIdeaDto.prototype, "fundingStage", void 0);
//# sourceMappingURL=create-idea.dto.js.map