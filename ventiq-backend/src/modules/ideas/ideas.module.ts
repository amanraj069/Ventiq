import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { Idea, IdeaSchema } from '../../database/schemas/idea.schema';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { PineconeModule } from '../pinecone/pinecone.module';
import { InterestModule } from '../interest/interest.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
    EvaluationModule,
    PineconeModule,
    InterestModule,
  ],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports: [IdeasService],
})
export class IdeasModule {}
