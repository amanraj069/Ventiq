import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
export interface AgentOutput {
    agentName: string;
    score: number;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
    extra?: Record<string, any>;
    tokenUsage?: {
        inputTokens: number;
        outputTokens: number;
    };
    durationMs?: number;
}
export type PriorResults = Record<string, AgentOutput>;
export declare abstract class BaseEvaluationAgent {
    protected readonly configService: ConfigService;
    protected readonly logger: Logger;
    protected model: ChatGoogleGenerativeAI;
    constructor(configService: ConfigService, agentName: string);
    run(idea: any, priorResults?: PriorResults): Promise<AgentOutput>;
    protected abstract evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput>;
    abstract getAgentName(): string;
    protected parseJson(text: string): any;
    protected formatIdeaContext(idea: any): string;
}
