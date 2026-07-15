import { RawBodyRequest } from '@nestjs/common';
import { Request, Response } from 'express';
import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    createSubscription(userId: string): Promise<{
        subscriptionId: string;
    }>;
    cancelSubscription(userId: string): Promise<{
        status: string;
    }>;
    handleWebhook(signature: string, req: RawBodyRequest<Request>, res: Response): Promise<Response<any, Record<string, any>>>;
}
