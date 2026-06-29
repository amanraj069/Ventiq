import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class VerifiedInvestorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
