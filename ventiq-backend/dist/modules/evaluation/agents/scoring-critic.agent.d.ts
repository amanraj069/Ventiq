import { PriorResults } from './base-agent';
export declare class ScoringCriticAgent {
    private readonly logger;
    private rubric;
    constructor();
    getAgentName(): string;
    getRubricVersion(): string;
    compute(idea: any, priorResults: PriorResults): {
        overallScore: number;
        scoreBreakdown: Record<string, number>;
        appliedCeilings: string[];
    };
    private evaluateCondition;
}
