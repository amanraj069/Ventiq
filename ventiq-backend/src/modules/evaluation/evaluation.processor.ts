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
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data: ${JSON.stringify(job.data)}`);

    if (job.name === 'evaluate-idea') {
      const { ideaId } = job.data;
      
      const idea = await this.ideaModel.findOne({ ideaId });
      if (!idea) {
        this.logger.error(`Idea not found: ${ideaId}`);
        throw new Error('Idea not found');
      }

      // Step 1: Create Evaluation document if it doesn't exist
      let evaluation = await this.evaluationModel.findOne({ ideaId });
      if (!evaluation) {
        evaluation = new this.evaluationModel({
          ideaId,
          status: 'evaluating',
          overallScore: 0,
          scoreBreakdown: {},
          agentOutputs: [],
        });
        await evaluation.save();
      }

      // Step 2: Run Market Research Agent
      const marketOutput = await this.marketResearchAgent.evaluate(idea);
      
      // Step 3: Update Evaluation
      if (!evaluation.agentOutputs) {
        evaluation.agentOutputs = [];
      }
      evaluation.agentOutputs.push({
        agentName: 'MarketResearch',
        score: marketOutput.score,
        reasoning: marketOutput.reasoning,
        completedAt: new Date(),
      });
      
      evaluation.scoreBreakdown = {
        ...evaluation.scoreBreakdown,
        market: marketOutput.score,
      };
      
      // Simple aggregation for now (just one agent)
      evaluation.overallScore = marketOutput.score;
      evaluation.summary = marketOutput.reasoning;
      evaluation.strengths = marketOutput.strengths;
      evaluation.weaknesses = marketOutput.weaknesses;

      await evaluation.save();

      // Step 4: Update Idea status
      idea.status = 'evaluated';
      await idea.save();

      this.logger.log(`Completed evaluation for idea: ${ideaId}`);
      return evaluation;
    }
  }
}
