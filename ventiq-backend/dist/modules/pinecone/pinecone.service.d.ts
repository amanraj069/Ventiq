import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class PineconeService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    private pinecone;
    private indexName;
    private embeddingsModel;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    private isReady;
    embedText(text: string): Promise<number[]>;
    upsertIdea(ideaId: string, text: string, metadata?: any): Promise<void>;
    findSimilar(text: string, topK?: number): Promise<{
        ideaId: string;
        score: number | undefined;
        metadata: import("@pinecone-database/pinecone").RecordMetadata | undefined;
    }[]>;
}
