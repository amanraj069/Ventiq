import { ConfigService } from '@nestjs/config';
export declare class MarketResearchAgent {
    private configService;
    private readonly logger;
    private model;
    constructor(configService: ConfigService);
    evaluate(idea: any): Promise<{
        score: number;
        reasoning: string;
        strengths: string[];
        weaknesses: string[];
    }>;
}
