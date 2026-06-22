import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationService } from './evaluation.service';
import { EvaluationProcessor } from './evaluation.processor';
import { MarketResearchAgent } from './agents/market-research.agent';
import { Idea, IdeaSchema } from '../../database/schemas/idea.schema';
import { Evaluation, EvaluationSchema } from '../../database/schemas/evaluation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Idea.name, schema: IdeaSchema },
      { name: Evaluation.name, schema: EvaluationSchema },
    ]),
    BullModule.registerQueue({
      name: 'evaluation-queue',
    }),
  ],
  providers: [EvaluationService, EvaluationProcessor, MarketResearchAgent],
  exports: [EvaluationService],
})
export class EvaluationModule {}
