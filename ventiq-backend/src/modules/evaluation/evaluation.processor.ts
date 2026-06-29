import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { Evaluation } from '../../database/schemas/evaluation.schema';
import { MarketResearchAgent } from './agents/market-research.agent';

@Processor('evaluation-queue')
export class EvaluationProcessor extends WorkerHost {
  private readonly logger = new Logger(EvaluationProcessor.name);

  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<Idea>,
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
    private marketResearchAgent: MarketResearchAgent,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    if (job.name === 'evaluate-idea') {
      const { ideaId } = job.data;

      const idea = await this.ideaModel.findOne({ ideaId });
      if (!idea) {
        this.logger.error(`Idea not found: ${ideaId}`);
        throw new Error('Idea not found');
      }

      // Determine version — count existing evaluations for this idea
      const existingCount = await this.evaluationModel.countDocuments({ ideaId });
      const newVersion = existingCount + 1;

      // Create new Evaluation document
      const evaluation = new this.evaluationModel({
        ideaId,
        version: newVersion,
        overallScore: 0,
        scoreBreakdown: {},
        agentOutputs: [],
      });
      await evaluation.save();

      // Update idea status
      idea.status = 'submitted';
      await idea.save();

      // Run the comprehensive MarketResearch agent
      const output = await this.marketResearchAgent.evaluate(idea);

      // Populate all fields from agent output
      evaluation.overallScore = output.overallScore;
      evaluation.scoreBreakdown = output.scoreBreakdown;
      evaluation.summary = output.summary;
      evaluation.strengths = output.strengths;
      evaluation.weaknesses = output.weaknesses;
      evaluation.competitorLandscape = output.competitorLandscape;
      evaluation.financialProjection = output.financialProjection;
      evaluation.redTeamCritique = output.redTeamCritique;

      evaluation.agentOutputs = [{
        agentName: 'MarketResearch',
        score: output.overallScore,
        reasoning: output.summary,
        strengths: output.strengths,
        weaknesses: output.weaknesses,
        completedAt: new Date(),
      }];

      await evaluation.save();

      // Mark idea as evaluated
      idea.status = 'evaluated';
      await idea.save();

      this.logger.log(`Completed evaluation v${newVersion} for idea: ${ideaId} — score: ${output.overallScore}`);
      return evaluation;
    }
  }
}
