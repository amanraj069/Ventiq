import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { CurrentUser } from '../../common/decorators';

@Controller('ideas')
@UseGuards(AuthGuard('jwt'))
export class IdeasController {
  constructor(private readonly ideasService: IdeasService) {}

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createIdeaDto: CreateIdeaDto) {
    return this.ideasService.create(userId, createIdeaDto);
  }

  @Post('similarity-check')
  async checkSimilarity(@Body('text') text: string) {
    return this.ideasService.findSimilar(text, 3);
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
