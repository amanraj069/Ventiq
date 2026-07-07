import { Controller, Post, Body, UseGuards, Get, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { CurrentUser } from '../../common/decorators';
import { VerifiedInvestorGuard } from '../../common/guards';
import { InterestService } from '../interest/interest.service';

@Controller('ideas')
@UseGuards(AuthGuard('jwt'))
export class IdeasController {
  constructor(
    private readonly ideasService: IdeasService,
    private readonly interestService: InterestService,
  ) {}

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(userId, createIdeaDto);
  }

  @Post('similarity-check')
  async checkSimilarity(@Body('text') text: string) {
    return this.ideasService.findSimilar(text, 3);
  }

  /**
   * GET /api/ideas/explore — Investor explore feed
   */
  @Get('explore')
  @UseGuards(VerifiedInvestorGuard)
  async exploreFeed(
    @Query('domain') domain?: string,
    @Query('minScore') minScore?: string,
    @Query('sort') sort?: string,
  ) {
    return this.ideasService.getExploreFeed({
      domain,
      minScore: minScore ? parseInt(minScore, 10) : undefined,
      sort,
    });
  }

  /**
   * GET /api/ideas/explore/:ideaId — Investor-facing idea view
   */
  @Get('explore/:ideaId')
  @UseGuards(VerifiedInvestorGuard)
  async exploreIdea(
    @CurrentUser('id') investorId: string,
    @Param('ideaId') ideaId: string,
  ) {
    const interest = await this.interestService.getInterestStatus(investorId, ideaId);
    return this.ideasService.getExploreIdea(ideaId, investorId, interest?.status);
  }

  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    return this.ideasService.findAllByFounder(userId);
  }

  @Get(':id')
  async findOne(@CurrentUser('id') userId: string, @Param('id') ideaId: string) {
    return this.ideasService.findOne(ideaId, userId);
  }

  @Post(':id/re-evaluate')
  async reEvaluate(@CurrentUser('id') userId: string, @Param('id') ideaId: string) {
    return this.ideasService.reEvaluate(ideaId, userId);
  }
}
