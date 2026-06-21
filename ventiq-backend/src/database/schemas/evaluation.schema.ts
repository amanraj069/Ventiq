import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Evaluation extends Document {
  @Prop({ type: String, default: uuidv4, unique: true })
  evaluationId: string;

  @Prop({ required: true })
  ideaId: string;

  @Prop({ type: Number })
  overallScore?: number;

  @Prop({ type: Object })
  scoreBreakdown?: {
    market?: number;
    product?: number;
    team?: number;
    traction?: number;
  };

  @Prop()
  summary?: string;

  @Prop({ type: [String] })
  strengths?: string[];

  @Prop({ type: [String] })
  weaknesses?: string[];
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);

EvaluationSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
