import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationService } from './evaluation.service';
import { EvaluationProcessor } from './evaluation.processor';
import { PipelineOrchestrator } from './pipeline.orchestrator';
import { MarketResearchAgent } from './agents/market-research.agent';
import { DifferentiationAgent } from './agents/differentiation.agent';
import { FinancialModelAgent } from './agents/financial-model.agent';
import { TeamFitAgent } from './agents/team-fit.agent';
import { TractionAgent } from './agents/traction.agent';
import { ClarityAgent } from './agents/clarity.agent';
import { RegulatoryAgent } from './agents/regulatory.agent';
import { RedTeamAgent } from './agents/red-team.agent';
import { ScoringCriticAgent } from './agents/scoring-critic.agent';
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
  providers: [
    EvaluationService,
    EvaluationProcessor,
    PipelineOrchestrator,
    // Agents
    MarketResearchAgent,
    DifferentiationAgent,
    FinancialModelAgent,
    TeamFitAgent,
    TractionAgent,
    ClarityAgent,
    RegulatoryAgent,
    RedTeamAgent,
    ScoringCriticAgent,
  ],
  exports: [EvaluationService],
})
export class EvaluationModule {}
