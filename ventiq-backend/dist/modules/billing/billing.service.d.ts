import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
export declare class BillingService {
    private userModel;
    private configService;
    private readonly logger;
    private razorpay;
    private webhookSecret;
    private proPlanId;
    constructor(userModel: Model<User>, configService: ConfigService);
    createSubscription(userId: string): Promise<{
        subscriptionId: string;
    }>;
    cancelSubscription(userId: string): Promise<{
        status: string;
    }>;
    handleWebhook(signature: string, payload: Buffer): Promise<void>;
    private updateUserTierByUserId;
}
