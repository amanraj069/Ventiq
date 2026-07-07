import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';
export declare class ClarityAgent extends BaseEvaluationAgent {
    constructor(configService: ConfigService);
    getAgentName(): string;
    protected evaluate(idea: any, _priorResults?: PriorResults): Promise<AgentOutput>;
}
