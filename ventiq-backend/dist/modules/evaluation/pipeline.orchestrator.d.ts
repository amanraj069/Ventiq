import { AgentOutput } from './agents/base-agent';
import { MarketResearchAgent } from './agents/market-research.agent';
import { DifferentiationAgent } from './agents/differentiation.agent';
import { FinancialModelAgent } from './agents/financial-model.agent';
import { TeamFitAgent } from './agents/team-fit.agent';
import { TractionAgent } from './agents/traction.agent';
import { ClarityAgent } from './agents/clarity.agent';
import { RegulatoryAgent } from './agents/regulatory.agent';
import { RedTeamAgent } from './agents/red-team.agent';
import { ScoringCriticAgent } from './agents/scoring-critic.agent';
export interface PipelineResult {
    overallScore: number;
    scoreBreakdown: Record<string, number>;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    agentOutputs: AgentOutput[];
    competitorLandscape: any[];
    financialProjection: any;
    redTeamCritique: any;
    rubricVersion: string;
    appliedCeilings: string[];
    tokenUsage: {
        totalInputTokens: number;
        totalOutputTokens: number;
        perAgent: {
            agentName: string;
            inputTokens: number;
            outputTokens: number;
            durationMs: number;
        }[];
    };
    totalDurationMs: number;
}
export declare class PipelineOrchestrator {
    private readonly marketResearchAgent;
    private readonly differentiationAgent;
    private readonly financialModelAgent;
    private readonly teamFitAgent;
    private readonly tractionAgent;
    private readonly clarityAgent;
    private readonly regulatoryAgent;
    private readonly redTeamAgent;
    private readonly scoringCriticAgent;
    private readonly logger;
    constructor(marketResearchAgent: MarketResearchAgent, differentiationAgent: DifferentiationAgent, financialModelAgent: FinancialModelAgent, teamFitAgent: TeamFitAgent, tractionAgent: TractionAgent, clarityAgent: ClarityAgent, regulatoryAgent: RegulatoryAgent, redTeamAgent: RedTeamAgent, scoringCriticAgent: ScoringCriticAgent);
    run(idea: any): Promise<PipelineResult>;
}
