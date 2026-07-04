import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Evaluation extends Document {
  @Prop({ type: String, default: uuidv4, unique: true })
  evaluationId: string;

  @Prop({ required: true })
  ideaId: string;

  @Prop({ type: Number, default: 1 })
  version: number;

  @Prop({ type: Number })
  overallScore?: number;

  @Prop({ type: Object })
  scoreBreakdown?: {
    market?: number;
    team?: number;
    traction?: number;
    differentiation?: number;
    scalability?: number;
    clarity?: number;
  };

  @Prop()
  summary?: string;

  @Prop({ type: [String] })
  strengths?: string[];

  @Prop({ type: [String] })
  weaknesses?: string[];

  @Prop({ type: [{
    agentName: String,
    score: Number,
    reasoning: String,
    strengths: [String],
    weaknesses: [String],
    completedAt: Date,
  }] })
  agentOutputs?: {
    agentName: string;
    score: number;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
    completedAt: Date;
  }[];

  @Prop({ type: [{
    name: String,
    description: String,
    threatLevel: String,
  }] })
  competitorLandscape?: {
    name: string;
    description: string;
    threatLevel: 'low' | 'medium' | 'high';
  }[];

  @Prop({ type: Object })
  financialProjection?: {
    summary: string;
    yearOneRevenue: string;
    yearThreeRevenue: string;
    breakEvenMonths: number;
  };

  @Prop({ type: Object })
  redTeamCritique?: {
    summary: string;
    criticalRisks: string[];
  };

  @Prop({ type: String })
  rubricVersion?: string;

  @Prop({ type: [String] })
  appliedCeilings?: string[];

  @Prop({ type: Object })
  tokenUsage?: {
    totalInputTokens: number;
    totalOutputTokens: number;
    perAgent: {
      agentName: string;
      inputTokens: number;
      outputTokens: number;
      durationMs: number;
    }[];
  };

  @Prop({ type: Number })
  totalDurationMs?: number;

  @Prop({ type: Date })
  supersededAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);

EvaluationSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
