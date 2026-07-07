import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { InterestService } from '../interest/interest.service';
export declare class IdeasController {
    private readonly ideasService;
    private readonly interestService;
    constructor(ideasService: IdeasService, interestService: InterestService);
    create(userId: string, createIdeaDto: CreateIdeaDto): Promise<import("../../database/schemas/idea.schema").Idea>;
    checkSimilarity(text: string): Promise<{
        ideaId: string;
        score: number | undefined;
        metadata: import("@pinecone-database/pinecone").RecordMetadata | undefined;
    }[]>;
    exploreFeed(domain?: string, minScore?: string, sort?: string): Promise<{
        ideaId: string;
        title: string;
        oneLinePitch: string | undefined;
        domain: string | undefined;
        targetMarket: string | undefined;
        overallScore: number | null;
        createdAt: Date | undefined;
    }[]>;
    exploreIdea(investorId: string, ideaId: string): Promise<any>;
    findAll(userId: string): Promise<import("../../database/schemas/idea.schema").Idea[]>;
    findOne(userId: string, ideaId: string): Promise<any>;
    reEvaluate(userId: string, ideaId: string): Promise<{
        message: string;
    }>;
}
