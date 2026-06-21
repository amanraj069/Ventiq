import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { SetRoleDto, FounderProfileDto, InvestorVerificationDto } from './dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Get the current user's full profile.
   */
  async getMe(userId: string) {
    const user = await this.userModel.findOne({ userId }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.userId,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
      onboardingComplete: user.onboardingComplete,
      investorVerificationStatus: user.investorVerificationStatus,
      investorProfile: user.investorProfile,
      founderProfile: user.founderProfile,
      tier: user.tier,
      createdAt: user.createdAt,
    };
  }

  /**
   * Set the user's role (founder or investor) during onboarding.
   */
  async setRole(userId: string, dto: SetRoleDto) {
    const user = await this.userModel.findOne({ userId }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role && user.onboardingComplete) {
      throw new BadRequestException('Role already set and onboarding completed');
    }

    const updated = await this.userModel.findOneAndUpdate(
      { userId },
      { $set: { role: dto.role } },
      { new: true }
    ).exec();

    if (!updated) {
      throw new NotFoundException('User not found during update');
    }

    return {
      id: updated.userId,
      role: updated.role,
      onboardingComplete: updated.onboardingComplete,
    };
  }

  /**
   * Save founder profile and mark onboarding as complete.
   */
  async saveFounderProfile(userId: string, dto: FounderProfileDto) {
    const user = await this.userModel.findOne({ userId }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'founder') {
      throw new BadRequestException('User is not a founder');
    }

    const updated = await this.userModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          founderProfile: {
            isTechnical: dto.isTechnical,
            priorExperience: dto.priorExperience,
            linkedinUrl: dto.linkedinUrl,
          },
          onboardingComplete: true,
        }
      },
      { new: true }
    ).exec();

    if (!updated) {
      throw new NotFoundException('User not found during update');
    }

    this.logger.log(`Founder onboarding completed: ${updated.email}`);
    return {
      id: updated.userId,
      role: updated.role,
      onboardingComplete: updated.onboardingComplete,
      founderProfile: updated.founderProfile,
    };
  }

  /**
   * Submit investor verification — sets status to 'pending'.
   */
  async submitInvestorVerification(userId: string, dto: InvestorVerificationDto) {
    const user = await this.userModel.findOne({ userId }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 'investor') {
      throw new BadRequestException('User is not an investor');
    }

    const updated = await this.userModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          investorProfile: {
            investorType: dto.investorType,
            checkSizeMin: dto.checkSizeMin,
            checkSizeMax: dto.checkSizeMax,
            sectors: dto.sectors,
            linkedinUrl: dto.linkedinUrl,
            accreditationDeclared: dto.accreditationDeclared,
          },
          investorVerificationStatus: 'pending',
          onboardingComplete: true,
        }
      },
      { new: true }
    ).exec();

    if (!updated) {
      throw new NotFoundException('User not found during update');
    }

    this.logger.log(`Investor verification submitted: ${updated.email}`);
    return {
      id: updated.userId,
      role: updated.role,
      onboardingComplete: updated.onboardingComplete,
      investorVerificationStatus: updated.investorVerificationStatus,
      investorProfile: updated.investorProfile,
    };
  }
}
