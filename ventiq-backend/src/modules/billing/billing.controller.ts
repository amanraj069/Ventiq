import { Controller, Post, UseGuards, Req, Res, Headers, RawBodyRequest, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { BillingService } from './billing.service';
import { CurrentUser } from '../../common/decorators';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('subscription')
  @UseGuards(AuthGuard('jwt'))
  async createSubscription(@CurrentUser('id') userId: string) {
    return this.billingService.createSubscription(userId);
  }

  @Post('cancel')
  @UseGuards(AuthGuard('jwt'))
  async cancelSubscription(@CurrentUser('id') userId: string) {
    return this.billingService.cancelSubscription(userId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    if (!signature) {
      return res.status(HttpStatus.BAD_REQUEST).send('Missing signature');
    }

    const payload = req.rawBody;
    if (!payload) {
      return res.status(HttpStatus.BAD_REQUEST).send('Missing payload');
    }

    try {
      await this.billingService.handleWebhook(signature, payload);
      return res.status(HttpStatus.OK).send();
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).send(err.message);
    }
  }
}
