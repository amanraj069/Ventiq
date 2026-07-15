import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { User } from '../../database/schemas/user.schema';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { EvaluationService } from '../evaluation/evaluation.service';
import { PineconeService } from '../pinecone/pinecone.service';

@Injectable()
export class IdeasService {
  private readonly logger = new Logger(IdeasService.name);

  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<Idea>,
    @InjectModel(User.name) private userModel: Model<User>,
    private evaluationService: EvaluationService,
    private pineconeService: PineconeService,
  ) {}

  async create(founderId: string, createIdeaDto: CreateIdeaDto): Promise<Idea> {
    const user = await this.userModel.findOne({ userId: founderId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.tier === 'free') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const ideasThisMonth = await this.ideaModel.countDocuments({
        founderId,
        createdAt: { $gte: startOfMonth },
      });

      if (ideasThisMonth >= 1) {
        throw new ForbiddenException('UPGRADE_REQUIRED'); // Specific message for frontend interception
      }
    }

    const newIdea = await this.ideaModel.create({
      founderId,
      status: 'submitted', // Setting to submitted to match step 5
      ...createIdeaDto,
    });

    this.logger.log(`New idea submitted by founder: ${founderId}, Idea ID: ${newIdea.ideaId}`);
    
    // Trigger the BullMQ job for async evaluation
    await this.evaluationService.triggerEvaluation(newIdea.ideaId);

    // Asynchronously upsert to Pinecone for similarity search
    const textForEmbedding = `Title: ${newIdea.title}. Pitch: ${newIdea.oneLinePitch}. Description: ${newIdea.description}. Domain: ${newIdea.domain}. Target Market: ${newIdea.targetMarket}`;
    this.pineconeService.upsertIdea(newIdea.ideaId, textForEmbedding, {
      founderId,
      title: newIdea.title,
    }).catch(err => {
      this.logger.error(`Failed to trigger pinecone upsert for idea ${newIdea.ideaId}`, err);
    });

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

  async findSimilar(text: string, topK: number = 3) {
    if (!text || text.trim().length === 0) {
      return [];
    }
    
    // We only need the Pinecone query
    const similarMatches = await this.pineconeService.findSimilar(text, topK);
    
    // Optionally fetch full idea details from DB, but metadata has title
    return similarMatches;
  }

  /**
   * Explore feed for investors — returns evaluated ideas with basic info.
   */
  async getExploreFeed(filters?: { domain?: string; minScore?: number; sort?: string }) {
    const query: any = { status: 'evaluated' };
    if (filters?.domain) {
      query.domain = { $regex: new RegExp(filters.domain, 'i') };
    }

    const ideas = await this.ideaModel
      .find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Get evaluation scores for all these ideas
    const ideaIds = ideas.map((i) => i.ideaId);
    const evaluations = await Promise.all(
      ideaIds.map((id) => this.evaluationService.getEvaluationByIdeaId(id)),
    );
    const evalMap = new Map(
      evaluations.filter(Boolean).map((e) => [e!.ideaId, e!]),
    );

    let results = ideas.map((idea) => {
      const evaluation = evalMap.get(idea.ideaId);
      return {
        ideaId: idea.ideaId,
        title: idea.title,
        oneLinePitch: idea.oneLinePitch,
        domain: idea.domain,
        targetMarket: idea.targetMarket,
        overallScore: evaluation?.overallScore ?? null,
        createdAt: idea.createdAt,
      };
    });

    // Filter by minScore
    if (filters?.minScore) {
      results = results.filter((r) => (r.overallScore ?? 0) >= filters.minScore!);
    }

    // Sort
    if (filters?.sort === 'score') {
      results.sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0));
    }

    return results;
  }

  /**
   * Investor-facing idea view — returns full breakdown only if approved.
   */
  async getExploreIdea(ideaId: string, investorId: string, interestStatus?: string | null) {
    const idea = await this.ideaModel.findOne({ ideaId }).lean().exec();
    if (!idea) {
      throw new NotFoundException('Idea not found');
    }

    const evaluation = await this.evaluationService.getEvaluationByIdeaId(ideaId);

    // Base response (always visible)
    const base: any = {
      ideaId: idea.ideaId,
      title: idea.title,
      oneLinePitch: idea.oneLinePitch,
      domain: idea.domain,
      targetMarket: idea.targetMarket,
      description: idea.description,
      overallScore: evaluation?.overallScore ?? null,
      createdAt: idea.createdAt,
      isBreakdownUnlocked: interestStatus === 'approved',
      interestStatus: interestStatus || null,
    };

    // If investor has approved interest, include full breakdown
    if (interestStatus === 'approved' && evaluation) {
      base.evaluation = evaluation.toJSON();
    }

    return base;
  }
}
