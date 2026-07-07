"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ScoringCriticAgent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringCriticAgent = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ScoringCriticAgent = ScoringCriticAgent_1 = class ScoringCriticAgent {
    logger = new common_1.Logger(ScoringCriticAgent_1.name);
    rubric;
    constructor() {
        const rubricPath = path.join(process.cwd(), 'rubric', 'v1.json');
        this.rubric = JSON.parse(fs.readFileSync(rubricPath, 'utf-8'));
        this.logger.log(`Loaded rubric: ${this.rubric.version}`);
    }
    getAgentName() {
        return 'ScoringCritic';
    }
    getRubricVersion() {
        return this.rubric.version;
    }
    compute(idea, priorResults) {
        this.logger.log(`Computing final score for idea: ${idea.ideaId}`);
        const scoreBreakdown = {};
        for (const [dimension, config] of Object.entries(this.rubric.dimensions)) {
            const agentResult = priorResults[config.agentName];
            scoreBreakdown[dimension] = agentResult?.score ?? 0;
        }
        const appliedCeilings = [];
        for (const rule of this.rubric.ceilingRules) {
            if (!this.evaluateCondition(rule.condition, idea, priorResults))
                continue;
            if (rule.dimensionCap) {
                for (const [dim, cap] of Object.entries(rule.dimensionCap)) {
                    if (scoreBreakdown[dim] !== undefined && scoreBreakdown[dim] > cap) {
                        this.logger.log(`Applying ceiling "${rule.id}": capping ${dim} from ${scoreBreakdown[dim]} to ${cap}`);
                        scoreBreakdown[dim] = cap;
                        appliedCeilings.push(rule.id);
                    }
                }
            }
        }
        let weightedSum = 0;
        let totalWeight = 0;
        for (const [dimension, config] of Object.entries(this.rubric.dimensions)) {
            weightedSum += (scoreBreakdown[dimension] || 0) * config.weight;
            totalWeight += config.weight;
        }
        let overallScore = Math.round(weightedSum / totalWeight);
        for (const rule of this.rubric.ceilingRules) {
            if (!rule.cap)
                continue;
            if (!this.evaluateCondition(rule.condition, idea, priorResults))
                continue;
            if (overallScore > rule.cap) {
                this.logger.log(`Applying overall ceiling "${rule.id}": capping from ${overallScore} to ${rule.cap}`);
                overallScore = rule.cap;
                appliedCeilings.push(rule.id);
            }
        }
        return { overallScore, scoreBreakdown, appliedCeilings };
    }
    evaluateCondition(condition, idea, priorResults) {
        const { field, equals, maxLength, gte } = condition;
        if (field === '_redTeamRiskCount') {
            const redTeam = priorResults.RedTeam;
            const riskCount = redTeam?.extra?.redTeamCritique?.criticalRisks?.length ?? 0;
            if (gte !== undefined)
                return riskCount >= gte;
            return false;
        }
        const value = idea[field];
        if (equals !== undefined) {
            return value === equals || String(value) === String(equals);
        }
        if (maxLength !== undefined && typeof value === 'string') {
            return value.length <= maxLength;
        }
        if (gte !== undefined && typeof value === 'number') {
            return value >= gte;
        }
        return false;
    }
};
exports.ScoringCriticAgent = ScoringCriticAgent;
exports.ScoringCriticAgent = ScoringCriticAgent = ScoringCriticAgent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ScoringCriticAgent);
//# sourceMappingURL=scoring-critic.agent.js.map