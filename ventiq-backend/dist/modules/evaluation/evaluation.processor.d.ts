import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { Evaluation } from '../../database/schemas/evaluation.schema';
import { PipelineOrchestrator } from './pipeline.orchestrator';
export declare class EvaluationProcessor extends WorkerHost {
    private ideaModel;
    private evaluationModel;
    private pipelineOrchestrator;
    private readonly logger;
    constructor(ideaModel: Model<Idea>, evaluationModel: Model<Evaluation>, pipelineOrchestrator: PipelineOrchestrator);
    process(job: Job<any, any, string>): Promise<any>;
}
