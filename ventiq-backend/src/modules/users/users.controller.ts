import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { SetRoleDto, FounderProfileDto, InvestorVerificationDto } from './dto';
import { CurrentUser } from '../../common/decorators';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /api/users/me — Get current user profile.
   */
  @Get('me')
  async getMe(@CurrentUser('id') userId: string) {
    return this.usersService.getMe(userId);
  }

  /**
   * PATCH /api/users/role — Set role during onboarding.
   */
  @Patch('role')
  async setRole(
    @CurrentUser('id') userId: string,
    @Body() dto: SetRoleDto,
  ) {
    return this.usersService.setRole(userId, dto);
  }

  /**
   * PATCH /api/users/founder-profile — Save founder profile (completes onboarding).
   */
  @Patch('founder-profile')
  async saveFounderProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: FounderProfileDto,
  ) {
    return this.usersService.saveFounderProfile(userId, dto);
  }

  /**
   * POST /api/users/investor-verification — Submit investor verification.
   */
  @Post('investor-verification')
  async submitInvestorVerification(
    @CurrentUser('id') userId: string,
    @Body() dto: InvestorVerificationDto,
  ) {
    return this.usersService.submitInvestorVerification(userId, dto);
  }
}
