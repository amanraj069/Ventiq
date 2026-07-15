"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BillingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../database/schemas/user.schema");
const Razorpay = __importStar(require("razorpay"));
const crypto = __importStar(require("crypto"));
let BillingService = BillingService_1 = class BillingService {
    userModel;
    configService;
    logger = new common_1.Logger(BillingService_1.name);
    razorpay;
    webhookSecret;
    proPlanId;
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
        const keyId = this.configService.get('RAZORPAY_KEY_ID') || 'dummy_key_id';
        const keySecret = this.configService.get('RAZORPAY_KEY_SECRET') || 'dummy_key_secret';
        this.razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
        this.webhookSecret = this.configService.get('RAZORPAY_WEBHOOK_SECRET') || 'dummy_whsec';
        this.proPlanId = this.configService.get('RAZORPAY_PRO_PLAN_ID') || 'dummy_plan_id';
    }
    async createSubscription(userId) {
        const user = await this.userModel.findOne({ userId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            const subscription = await this.razorpay.subscriptions.create({
                plan_id: this.proPlanId,
                customer_notify: 1,
                total_count: 120,
                notes: {
                    userId: user.userId,
                }
            });
            return { subscriptionId: subscription.id };
        }
        catch (err) {
            this.logger.error(`Failed to create Razorpay subscription: ${err.message}`);
            throw new common_1.BadRequestException('Failed to initialize subscription');
        }
    }
    async cancelSubscription(userId) {
        const user = await this.userModel.findOne({ userId });
        if (!user || !user.razorpaySubscriptionId) {
            throw new common_1.BadRequestException('No active subscription found');
        }
        try {
            await this.razorpay.subscriptions.cancel(user.razorpaySubscriptionId, false);
            await this.updateUserTierByUserId(userId, 'free');
            return { status: 'cancelled' };
        }
        catch (err) {
            this.logger.error(`Failed to cancel subscription: ${err.message}`);
            throw new common_1.BadRequestException('Failed to cancel subscription');
        }
    }
    async handleWebhook(signature, payload) {
        const payloadString = payload.toString();
        if (this.webhookSecret !== 'dummy_whsec') {
            const expectedSignature = crypto
                .createHmac('sha256', this.webhookSecret)
                .update(payloadString)
                .digest('hex');
            if (expectedSignature !== signature) {
                this.logger.error('Invalid Razorpay signature');
                throw new common_1.BadRequestException('Invalid signature');
            }
        }
        let event;
        try {
            event = JSON.parse(payloadString);
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid payload');
        }
        switch (event.event) {
            case 'subscription.authenticated':
            case 'subscription.activated': {
                const subscription = event.payload.subscription.entity;
                const userId = subscription.notes?.userId;
                if (userId) {
                    const currentPeriodEnd = new Date(subscription.current_end * 1000);
                    await this.updateUserTierByUserId(userId, 'pro', subscription.id, currentPeriodEnd);
                }
                break;
            }
            case 'subscription.halted':
            case 'subscription.cancelled': {
                const subscription = event.payload.subscription.entity;
                const userId = subscription.notes?.userId;
                if (userId) {
                    await this.updateUserTierByUserId(userId, 'free');
                }
                break;
            }
            default:
                this.logger.log(`Unhandled Razorpay event: ${event.event}`);
        }
    }
    async updateUserTierByUserId(userId, tier, subscriptionId, currentPeriodEnd) {
        const user = await this.userModel.findOne({ userId });
        if (!user) {
            this.logger.warn(`User ${userId} not found when updating tier`);
            return;
        }
        user.tier = tier;
        if (subscriptionId) {
            user.razorpaySubscriptionId = subscriptionId;
        }
        if (currentPeriodEnd) {
            user.razorpayCurrentPeriodEnd = currentPeriodEnd;
        }
        if (tier === 'free') {
            user.razorpaySubscriptionId = undefined;
            user.razorpayCurrentPeriodEnd = undefined;
        }
        await user.save();
        this.logger.log(`User ${user.userId} tier updated to ${tier} via Razorpay`);
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = BillingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], BillingService);
//# sourceMappingURL=billing.service.js.map