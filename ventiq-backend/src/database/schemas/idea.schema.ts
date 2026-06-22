import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Idea extends Document {
  @Prop({ type: String, default: uuidv4, unique: true })
  ideaId: string;

  @Prop({ required: true })
  founderId: string; // references User.userId

  @Prop({ enum: ['draft', 'submitted', 'evaluated'], default: 'draft' })
  status: string;

  // Step 1: Idea
  @Prop({ required: true })
  title: string;

  @Prop()
  oneLinePitch?: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  domain?: string; // sector

  @Prop()
  targetMarket?: string;

  @Prop()
  differentiation?: string;

  @Prop()
  deckUrl?: string;

  @Prop()
  websiteUrl?: string;

  @Prop()
  businessModel?: string;

  @Prop()
  competitors?: string;

  // Step 2: Team
  @Prop({ type: Number })
  coFoundersCount?: number;

  @Prop({ enum: ['yes', 'no', 'partially', null], default: null })
  hasTechnicalFounder?: string;

  @Prop()
  priorExperience?: string;

  @Prop({ type: Number })
  totalTeamSize?: number;

  // Step 3: Traction
  @Prop({ enum: ['Idea-only', 'Building', 'Launched', 'Generating Revenue', null], default: null })
  tractionStatus?: string;

  @Prop({ type: Number })
  userCount?: number;

  @Prop({ type: Number })
  mrr?: number;

  @Prop()
  retentionRate?: string;

  @Prop()
  growthTrend?: string;

  // Step 4: Funding Ask
  @Prop({ type: Number })
  fundingAsk?: number;

  @Prop({ default: 'USD' })
  fundingAskCurrency?: string;

  @Prop()
  useOfFunds?: string;

  @Prop()
  fundingStage?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);

IdeaSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
