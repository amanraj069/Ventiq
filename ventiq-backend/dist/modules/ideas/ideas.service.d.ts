import { Model } from 'mongoose';
import { Idea } from '../../database/schemas/idea.schema';
import { User } from '../../database/schemas/user.schema';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { EvaluationService } from '../evaluation/evaluation.service';
import { PineconeService } from '../pinecone/pinecone.service';
export declare class IdeasService {
    private ideaModel;
    private userModel;
    private evaluationService;
    private pineconeService;
    private readonly logger;
    constructor(ideaModel: Model<Idea>, userModel: Model<User>, evaluationService: EvaluationService, pineconeService: PineconeService);
    create(founderId: string, createIdeaDto: CreateIdeaDto): Promise<Idea>;
    findAllByFounder(founderId: string): Promise<Idea[]>;
    findOne(ideaId: string, founderId: string): Promise<any>;
    reEvaluate(ideaId: string, founderId: string): Promise<{
        message: string;
    }>;
    findSimilar(text: string, topK?: number): Promise<{
        ideaId: string;
        score: number | undefined;
        metadata: import("@pinecone-database/pinecone").RecordMetadata | undefined;
    }[]>;
    getExploreFeed(filters?: {
        domain?: string;
        minScore?: number;
        sort?: string;
    }): Promise<{
        ideaId: string;
        title: string;
        oneLinePitch: string | undefined;
        domain: string | undefined;
        targetMarket: string | undefined;
        overallScore: number | null;
        createdAt: Date | undefined;
    }[]>;
    getExploreIdea(ideaId: string, investorId: string, interestStatus?: string | null): Promise<any>;
}
