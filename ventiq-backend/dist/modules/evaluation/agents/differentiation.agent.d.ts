import { ConfigService } from '@nestjs/config';
import { BaseEvaluationAgent, AgentOutput, PriorResults } from './base-agent';
export declare class DifferentiationAgent extends BaseEvaluationAgent {
    constructor(configService: ConfigService);
    getAgentName(): string;
    protected evaluate(idea: any, priorResults?: PriorResults): Promise<AgentOutput>;
}
