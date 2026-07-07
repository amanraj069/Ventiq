"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationSchema = exports.Evaluation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let Evaluation = class Evaluation extends mongoose_2.Document {
    evaluationId;
    ideaId;
    version;
    overallScore;
    scoreBreakdown;
    summary;
    strengths;
    weaknesses;
    agentOutputs;
    competitorLandscape;
    financialProjection;
    redTeamCritique;
    rubricVersion;
    appliedCeilings;
    tokenUsage;
    totalDurationMs;
    supersededAt;
    createdAt;
    updatedAt;
};
exports.Evaluation = Evaluation;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: uuid_1.v4, unique: true }),
    __metadata("design:type", String)
], Evaluation.prototype, "evaluationId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Evaluation.prototype, "ideaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], Evaluation.prototype, "version", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Evaluation.prototype, "overallScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Evaluation.prototype, "scoreBreakdown", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Evaluation.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "strengths", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "weaknesses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                agentName: String,
                score: Number,
                reasoning: String,
                strengths: [String],
                weaknesses: [String],
                completedAt: Date,
            }] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "agentOutputs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{
                name: String,
                description: String,
                threatLevel: String,
            }] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "competitorLandscape", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Evaluation.prototype, "financialProjection", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Evaluation.prototype, "redTeamCritique", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Evaluation.prototype, "rubricVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "appliedCeilings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Evaluation.prototype, "tokenUsage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Evaluation.prototype, "totalDurationMs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Evaluation.prototype, "supersededAt", void 0);
exports.Evaluation = Evaluation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Evaluation);
exports.EvaluationSchema = mongoose_1.SchemaFactory.createForClass(Evaluation);
exports.EvaluationSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
//# sourceMappingURL=evaluation.schema.js.map