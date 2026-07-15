import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import * as Razorpay from 'razorpay';
import * as crypto from 'crypto';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  private razorpay: any;
  private webhookSecret: string;
  private proPlanId: string;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID') || 'dummy_key_id';
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET') || 'dummy_key_secret';
    
    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    this.webhookSecret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET') || 'dummy_whsec';
    this.proPlanId = this.configService.get<string>('RAZORPAY_PRO_PLAN_ID') || 'dummy_plan_id';
  }

  async createSubscription(userId: string): Promise<{ subscriptionId: string }> {
    const user = await this.userModel.findOne({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      // Create a subscription on Razorpay
      const subscription = await this.razorpay.subscriptions.create({
        plan_id: this.proPlanId,
        customer_notify: 1,
        total_count: 120, // Example: 10 years
        notes: {
          userId: user.userId,
        }
      });

      return { subscriptionId: subscription.id };
    } catch (err: any) {
      this.logger.error(`Failed to create Razorpay subscription: ${err.message}`);
      throw new BadRequestException('Failed to initialize subscription');
    }
  }

  async cancelSubscription(userId: string): Promise<{ status: string }> {
    const user = await this.userModel.findOne({ userId });
    if (!user || !user.razorpaySubscriptionId) {
      throw new BadRequestException('No active subscription found');
    }

    try {
      await this.razorpay.subscriptions.cancel(user.razorpaySubscriptionId, false); // false = cancel immediately
      
      // Update local immediately or wait for webhook
      await this.updateUserTierByUserId(userId, 'free');
      
      return { status: 'cancelled' };
    } catch (err: any) {
      this.logger.error(`Failed to cancel subscription: ${err.message}`);
      throw new BadRequestException('Failed to cancel subscription');
    }
  }

  async handleWebhook(signature: string, payload: Buffer): Promise<void> {
    const payloadString = payload.toString();
    
    if (this.webhookSecret !== 'dummy_whsec') {
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(payloadString)
        .digest('hex');

      if (expectedSignature !== signature) {
        this.logger.error('Invalid Razorpay signature');
        throw new BadRequestException('Invalid signature');
      }
    }

    let event: any;
    try {
      event = JSON.parse(payloadString);
    } catch (e) {
      throw new BadRequestException('Invalid payload');
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

  private async updateUserTierByUserId(userId: string, tier: 'free' | 'pro', subscriptionId?: string, currentPeriodEnd?: Date) {
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
}
