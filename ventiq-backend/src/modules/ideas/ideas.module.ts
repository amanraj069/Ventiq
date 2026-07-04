import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { Idea, IdeaSchema } from '../../database/schemas/idea.schema';
import { EvaluationModule } from '../evaluation/evaluation.module';

import { PineconeModule } from '../pinecone/pinecone.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }]),
    EvaluationModule,
    PineconeModule,
  ],
  controllers: [IdeasController],
  providers: [IdeasService],
  exports: [IdeasService],
})
export class IdeasModule {}
