import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InterestService } from './interest.service';
import { CurrentUser } from '../../common/decorators';
import { RolesGuard, VerifiedInvestorGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';

@Controller('interests')
@UseGuards(AuthGuard('jwt'))
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  /**
   * POST /api/interests/:ideaId — Express interest (investor)
   */
  @Post(':ideaId')
  @UseGuards(VerifiedInvestorGuard)
  async expressInterest(
    @CurrentUser('id') investorId: string,
    @Param('ideaId') ideaId: string,
    @Body('message') message?: string,
  ) {
    return this.interestService.expressInterest(investorId, ideaId, message);
  }

  /**
   * GET /api/interests/mine — Investor's interest tracker
   */
  @Get('mine')
  @UseGuards(RolesGuard)
  @Roles('investor')
  async getMyInterests(@CurrentUser('id') investorId: string) {
    return this.interestService.getInvestorInterests(investorId);
  }

  /**
   * GET /api/interests/inbox/:ideaId — Founder's inbox for a specific idea
   */
  @Get('inbox/:ideaId')
  @UseGuards(RolesGuard)
  @Roles('founder')
  async getInbox(
    @CurrentUser('id') founderId: string,
    @Param('ideaId') ideaId: string,
  ) {
    return this.interestService.getFounderInterestInbox(founderId, ideaId);
  }

  /**
   * PATCH /api/interests/:interestId/approve — Approve interest (founder)
   */
  @Patch(':interestId/approve')
  @UseGuards(RolesGuard)
  @Roles('founder')
  async approve(
    @CurrentUser('id') founderId: string,
    @Param('interestId') interestId: string,
  ) {
    return this.interestService.approveInterest(founderId, interestId);
  }

  /**
   * PATCH /api/interests/:interestId/decline — Decline interest (founder)
   */
  @Patch(':interestId/decline')
  @UseGuards(RolesGuard)
  @Roles('founder')
  async decline(
    @CurrentUser('id') founderId: string,
    @Param('interestId') interestId: string,
  ) {
    return this.interestService.declineInterest(founderId, interestId);
  }
}
