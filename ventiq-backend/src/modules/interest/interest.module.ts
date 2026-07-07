import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { Interest, InterestSchema } from '../../database/schemas/interest.schema';
import { Idea, IdeaSchema } from '../../database/schemas/idea.schema';
import { User, UserSchema } from '../../database/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interest.name, schema: InterestSchema },
      { name: Idea.name, schema: IdeaSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [InterestController],
  providers: [InterestService],
  exports: [InterestService],
})
export class InterestModule {}
