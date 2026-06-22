import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { EvaluationService } from '../evaluation/evaluation.service';
export declare class IdeasService {
    private ideaModel;
    private evaluationService;
    private readonly logger;
    constructor(ideaModel: Model<Idea>, evaluationService: EvaluationService);
    create(founderId: string, createIdeaDto: CreateIdeaDto): Promise<Idea>;
    findAllByFounder(founderId: string): Promise<Idea[]>;
    findOne(ideaId: string, founderId: string): Promise<any>;
}
