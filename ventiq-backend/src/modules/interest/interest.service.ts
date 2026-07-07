import { Injectable, Logger, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interest } from '../../database/schemas/interest.schema';
import { Idea } from '../../database/schemas/idea.schema';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class InterestService {
  private readonly logger = new Logger(InterestService.name);

  constructor(
    @InjectModel(Interest.name) private interestModel: Model<Interest>,
    @InjectModel(Idea.name) private ideaModel: Model<Idea>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /**
   * Express interest in an idea (investor action).
   */
  async expressInterest(investorId: string, ideaId: string, message?: string) {
    // Check idea exists and is evaluated
    const idea = await this.ideaModel.findOne({ ideaId }).exec();
    if (!idea) {
      throw new NotFoundException('Idea not found');
    }
    if (idea.status !== 'evaluated') {
      throw new BadRequestException('Cannot express interest in an idea that has not been evaluated yet.');
    }

    // Check for duplicate interest
    const existing = await this.interestModel.findOne({ ideaId, investorId }).exec();
    if (existing) {
      throw new BadRequestException('You have already expressed interest in this idea.');
    }

    const interest = await this.interestModel.create({
      ideaId,
      investorId,
      founderId: idea.founderId,
      status: 'pending',
      message,
    });

    this.logger.log(`Investor ${investorId} expressed interest in idea ${ideaId}`);
    return interest;
  }

  /**
   * Get all interests for an investor (investor's tracker).
   */
  async getInvestorInterests(investorId: string) {
    const interests = await this.interestModel.find({ investorId }).sort({ createdAt: -1 }).lean().exec();

    // Enrich with idea details
    const ideaIds = interests.map((i) => i.ideaId);
    const ideas = await this.ideaModel.find({ ideaId: { $in: ideaIds } }).lean().exec();
    const ideaMap = new Map(ideas.map((i) => [i.ideaId, i]));

    return interests.map((interest) => {
      const idea = ideaMap.get(interest.ideaId);
      return {
        ...interest,
        idea: idea
          ? {
              ideaId: idea.ideaId,
              title: idea.title,
              oneLinePitch: idea.oneLinePitch,
              domain: idea.domain,
              status: idea.status,
            }
          : null,
      };
    });
  }

  /**
   * Get founder's interest inbox for a specific idea.
   */
  async getFounderInterestInbox(founderId: string, ideaId: string) {
    // Verify founder owns this idea
    const idea = await this.ideaModel.findOne({ ideaId, founderId }).exec();
    if (!idea) {
      throw new NotFoundException('Idea not found or you are not the owner.');
    }

    const interests = await this.interestModel.find({ ideaId, founderId }).sort({ createdAt: -1 }).lean().exec();

    // Enrich with investor details
    const investorIds = interests.map((i) => i.investorId);
    const investors = await this.userModel.find({ userId: { $in: investorIds } }).lean().exec();
    const investorMap = new Map(investors.map((u) => [u.userId, u]));

    return interests.map((interest) => {
      const investor = investorMap.get(interest.investorId);
      return {
        ...interest,
        investor: investor
          ? {
              userId: investor.userId,
              name: investor.name,
              email: investor.email,
              picture: investor.picture,
              investorProfile: investor.investorProfile,
            }
          : null,
      };
    });
  }

  /**
   * Approve an interest (founder action).
   */
  async approveInterest(founderId: string, interestId: string) {
    const interest = await this.interestModel.findOne({ interestId }).exec();
    if (!interest) {
      throw new NotFoundException('Interest not found');
    }
    if (interest.founderId !== founderId) {
      throw new ForbiddenException('You are not the owner of this idea.');
    }
    if (interest.status !== 'pending') {
      throw new BadRequestException(`Interest is already ${interest.status}.`);
    }

    interest.status = 'approved';
    await interest.save();

    this.logger.log(`Founder ${founderId} approved interest ${interestId}`);
    return interest;
  }

  /**
   * Decline an interest (founder action).
   */
  async declineInterest(founderId: string, interestId: string) {
    const interest = await this.interestModel.findOne({ interestId }).exec();
    if (!interest) {
      throw new NotFoundException('Interest not found');
    }
    if (interest.founderId !== founderId) {
      throw new ForbiddenException('You are not the owner of this idea.');
    }
    if (interest.status !== 'pending') {
      throw new BadRequestException(`Interest is already ${interest.status}.`);
    }

    interest.status = 'declined';
    await interest.save();

    this.logger.log(`Founder ${founderId} declined interest ${interestId}`);
    return interest;
  }

  /**
   * Get interest status for an investor on a specific idea.
   */
  async getInterestStatus(investorId: string, ideaId: string) {
    const interest = await this.interestModel.findOne({ investorId, ideaId }).lean().exec();
    return interest || null;
  }
}
