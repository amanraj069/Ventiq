import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, default: uuidv4, unique: true })
  userId: string;

  @Prop({ unique: true, sparse: true })
  googleSub?: string;

  @Prop()
  passwordHash?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  picture?: string;

  @Prop({ enum: ['founder', 'investor', 'admin', null], default: null })
  role?: string;

  @Prop({ default: false })
  onboardingComplete: boolean;

  @Prop({ enum: ['pending', 'verified', 'rejected', null], default: null })
  investorVerificationStatus?: string;

  @Prop({ type: Object })
  investorProfile?: {
    investorType?: string;
    checkSizeMin?: number;
    checkSizeMax?: number;
    sectors?: string[];
    linkedinUrl?: string;
    accreditationDeclared?: boolean;
  };

  @Prop({ type: Object })
  founderProfile?: {
    isTechnical?: boolean;
    priorExperience?: string;
    linkedinUrl?: string;
  };

  @Prop({ enum: ['free', 'pro'], default: 'free' })
  tier: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  },
});
