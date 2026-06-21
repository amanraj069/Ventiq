import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Idea extends Document {
  @Prop({ type: String, default: uuidv4, unique: true })
  ideaId: string;

  @Prop({ required: true })
  founderId: string; // references userId

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  deckUrl?: string;

  @Prop({ enum: ['draft', 'submitted', 'evaluated'], default: 'draft' })
  status: string;

  // Additional fields from original schema
  @Prop()
  websiteUrl?: string;

  @Prop()
  targetMarket?: string;

  @Prop()
  businessModel?: string;

  @Prop()
  competitors?: string;

  @Prop()
  traction?: string;

  @Prop()
  team?: string;

  @Prop({ type: Number })
  fundingAsk?: number;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);

IdeaSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
