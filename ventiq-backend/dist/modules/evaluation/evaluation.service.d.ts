import { Queue } from 'bullmq';
import { Model } from 'mongoose';
import { Evaluation } from '../../database/schemas/evaluation.schema';
export declare class EvaluationService {
    private evaluationQueue;
    private evaluationModel;
    private readonly logger;
    constructor(evaluationQueue: Queue, evaluationModel: Model<Evaluation>);
    triggerEvaluation(ideaId: string): Promise<void>;
    getEvaluationByIdeaId(ideaId: string): Promise<Evaluation | null>;
    getEvaluationHistory(ideaId: string): Promise<Evaluation[]>;
    supersedeCurrent(ideaId: string): Promise<void>;
}
