import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { Evaluation } from '../../database/schemas/evaluation.schema';
import { PipelineOrchestrator } from './pipeline.orchestrator';

@Processor('evaluation-queue')
export class EvaluationProcessor extends WorkerHost {
  private readonly logger = new Logger(EvaluationProcessor.name);

  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<Idea>,
    @InjectModel(Evaluation.name) private evaluationModel: Model<Evaluation>,
    private pipelineOrchestrator: PipelineOrchestrator,
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

      // Determine version
      const existingCount = await this.evaluationModel.countDocuments({ ideaId });
      const newVersion = existingCount + 1;

      // Create placeholder evaluation document
      const evaluation = new this.evaluationModel({
        ideaId,
        version: newVersion,
        overallScore: 0,
        scoreBreakdown: {},
        agentOutputs: [],
      });
      await evaluation.save();

      // Update idea status to evaluating
      idea.status = 'submitted';
      await idea.save();

      // ── Run the full agent pipeline ──
      this.logger.log(`🚀 Starting evaluation pipeline v${newVersion} for idea: ${ideaId}`);
      const pipelineResult = await this.pipelineOrchestrator.run(idea);

      // Populate all fields from the pipeline result
      evaluation.overallScore = pipelineResult.overallScore;
      evaluation.scoreBreakdown = pipelineResult.scoreBreakdown;
      evaluation.summary = pipelineResult.summary;
      evaluation.strengths = pipelineResult.strengths;
      evaluation.weaknesses = pipelineResult.weaknesses;
      evaluation.competitorLandscape = pipelineResult.competitorLandscape;
      evaluation.financialProjection = pipelineResult.financialProjection;
      evaluation.redTeamCritique = pipelineResult.redTeamCritique;
      evaluation.rubricVersion = pipelineResult.rubricVersion;
      evaluation.appliedCeilings = pipelineResult.appliedCeilings;
      evaluation.tokenUsage = pipelineResult.tokenUsage;
      evaluation.totalDurationMs = pipelineResult.totalDurationMs;

      // Map agent outputs to schema format
      evaluation.agentOutputs = pipelineResult.agentOutputs.map((o) => ({
        agentName: o.agentName,
        score: o.score,
        reasoning: o.reasoning,
        strengths: o.strengths,
        weaknesses: o.weaknesses,
        completedAt: new Date(),
      }));

      await evaluation.save();

      // Mark idea as evaluated
      idea.status = 'evaluated';
      await idea.save();

      this.logger.log(
        `✅ Evaluation v${newVersion} complete for ${ideaId} — Score: ${pipelineResult.overallScore}/100 in ${pipelineResult.totalDurationMs}ms`,
      );
      return evaluation;
    }
  }
}
