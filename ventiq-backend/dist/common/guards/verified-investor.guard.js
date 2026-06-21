"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedInvestorGuard = void 0;
const common_1 = require("@nestjs/common");
let VerifiedInvestorGuard = class VerifiedInvestorGuard {
    canActivate(context) {
        const { user } = context.switchToHttp().getRequest();
        if (user?.role !== 'investor') {
            throw new common_1.ForbiddenException('This route is restricted to investors.');
        }
        if (user?.investorVerificationStatus !== 'verified') {
            throw new common_1.ForbiddenException('Investor verification required. Your verification is currently: ' +
                (user?.investorVerificationStatus || 'not submitted'));
        }
        return true;
    }
};
exports.VerifiedInvestorGuard = VerifiedInvestorGuard;
exports.VerifiedInvestorGuard = VerifiedInvestorGuard = __decorate([
    (0, common_1.Injectable)()
], VerifiedInvestorGuard);
//# sourceMappingURL=verified-investor.guard.js.map