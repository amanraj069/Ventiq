import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class VerifiedInvestorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    if (user?.role !== 'investor') {
      throw new ForbiddenException('This route is restricted to investors.');
    }

    if (user?.investorVerificationStatus !== 'verified') {
      throw new ForbiddenException(
        'Investor verification required. Your verification is currently: ' +
          (user?.investorVerificationStatus || 'not submitted'),
      );
    }

    return true;
  }
}
