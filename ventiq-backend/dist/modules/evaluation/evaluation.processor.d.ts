import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { Evaluation } from '../../database/schemas/evaluation.schema';
import { MarketResearchAgent } from './agents/market-research.agent';
export declare class EvaluationProcessor extends WorkerHost {
    private ideaModel;
    private evaluationModel;
    private marketResearchAgent;
    private readonly logger;
    constructor(ideaModel: Model<Idea>, evaluationModel: Model<Evaluation>, marketResearchAgent: MarketResearchAgent);
    process(job: Job<any, any, string>): Promise<any>;
}
