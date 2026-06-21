import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Interest extends Document {
  @Prop({ type: String, default: uuidv4, unique: true })
  interestId: string;

  @Prop({ required: true })
  ideaId: string;

  @Prop({ required: true })
  investorId: string; // references userId

  @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;

  @Prop()
  message?: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);

InterestSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
