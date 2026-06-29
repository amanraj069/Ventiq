import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { EvaluationService } from '../evaluation/evaluation.service';

@Injectable()
export class IdeasService {
  private readonly logger = new Logger(IdeasService.name);

  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<Idea>,
    private evaluationService: EvaluationService,
  ) {}

  async create(founderId: string, createIdeaDto: CreateIdeaDto): Promise<Idea> {
    const newIdea = await this.ideaModel.create({
      founderId,
      status: 'submitted', // Setting to submitted to match step 5
      ...createIdeaDto,
    });

    this.logger.log(`New idea submitted by founder: ${founderId}, Idea ID: ${newIdea.ideaId}`);
    
    // Trigger the BullMQ job for async evaluation
    await this.evaluationService.triggerEvaluation(newIdea.ideaId);

    return newIdea;
  }

  async findAllByFounder(founderId: string): Promise<Idea[]> {
    return this.ideaModel.find({ founderId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(ideaId: string, founderId: string): Promise<any> {
    const idea = await this.ideaModel.findOne({ ideaId, founderId }).lean().exec();
    if (!idea) {
      return null;
    }

    const evaluation = await this.evaluationService.getEvaluationByIdeaId(ideaId);
    const history = await this.evaluationService.getEvaluationHistory(ideaId);

    return {
      ...idea,
      evaluation: evaluation ? evaluation.toJSON() : null,
      evaluationHistory: history.map((e) => ({
        evaluationId: e.evaluationId,
        version: e.version,
        overallScore: e.overallScore,
        createdAt: e.createdAt,
        supersededAt: e.supersededAt,
      })),
    };
  }

  async reEvaluate(ideaId: string, founderId: string): Promise<{ message: string }> {
    const idea = await this.ideaModel.findOne({ ideaId, founderId });
    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    // Supersede current evaluation(s)
    await this.evaluationService.supersedeCurrent(ideaId);

    // Reset idea status
    idea.status = 'submitted';
    await idea.save();

    // Trigger new evaluation
    await this.evaluationService.triggerEvaluation(ideaId);

    this.logger.log(`Re-evaluation triggered for idea: ${ideaId}`);
    return { message: 'Re-evaluation started' };
  }
}
