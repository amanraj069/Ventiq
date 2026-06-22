import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evaluation } from '../../database/schemas/evaluation.schema';

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);

  constructor(
    @InjectQueue('evaluation-queue') private evaluationQueue: Queue,
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
  ) {}

  async triggerEvaluation(ideaId: string) {
    this.logger.log(`Triggering evaluation for idea: ${ideaId}`);
    await this.evaluationQueue.add('evaluate-idea', { ideaId });
  }

  async getEvaluationByIdeaId(ideaId: string): Promise<Evaluation | null> {
    return this.evaluationModel.findOne({ ideaId }).exec();
  }
}
