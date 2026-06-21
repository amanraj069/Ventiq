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
exports.InvestorVerificationDto = void 0;
const class_validator_1 = require("class-validator");
class InvestorVerificationDto {
    investorType;
    checkSizeMin;
    checkSizeMax;
    sectors;
    linkedinUrl;
    accreditationDeclared;
}
exports.InvestorVerificationDto = InvestorVerificationDto;
__decorate([
    (0, class_validator_1.IsEnum)(['angel', 'vc_fund', 'family_office', 'syndicate']),
    __metadata("design:type", String)
], InvestorVerificationDto.prototype, "investorType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], InvestorVerificationDto.prototype, "checkSizeMin", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], InvestorVerificationDto.prototype, "checkSizeMax", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], InvestorVerificationDto.prototype, "sectors", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)({}, { message: 'Please provide a valid LinkedIn URL' }),
    __metadata("design:type", String)
], InvestorVerificationDto.prototype, "linkedinUrl", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InvestorVerificationDto.prototype, "accreditationDeclared", void 0);
//# sourceMappingURL=investor-verification.dto.js.map