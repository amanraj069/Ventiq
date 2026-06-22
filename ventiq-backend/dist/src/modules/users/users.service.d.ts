import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { SetRoleDto, FounderProfileDto, InvestorVerificationDto } from './dto';
export declare class UsersService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        picture: string | undefined;
        role: string | undefined;
        onboardingComplete: boolean;
        investorVerificationStatus: string | undefined;
        investorProfile: {
            investorType?: string;
            checkSizeMin?: number;
            checkSizeMax?: number;
            sectors?: string[];
            linkedinUrl?: string;
            accreditationDeclared?: boolean;
        } | undefined;
        founderProfile: {
            isTechnical?: boolean;
            priorExperience?: string;
            linkedinUrl?: string;
        } | undefined;
        tier: string;
        createdAt: Date | undefined;
    }>;
    setRole(userId: string, dto: SetRoleDto): Promise<{
        id: string;
        role: string | undefined;
        onboardingComplete: boolean;
    }>;
    saveFounderProfile(userId: string, dto: FounderProfileDto): Promise<{
        id: string;
        role: string | undefined;
        onboardingComplete: boolean;
        founderProfile: {
            isTechnical?: boolean;
            priorExperience?: string;
            linkedinUrl?: string;
        } | undefined;
    }>;
    submitInvestorVerification(userId: string, dto: InvestorVerificationDto): Promise<{
        id: string;
        role: string | undefined;
        onboardingComplete: boolean;
        investorVerificationStatus: string | undefined;
        investorProfile: {
            investorType?: string;
            checkSizeMin?: number;
            checkSizeMax?: number;
            sectors?: string[];
            linkedinUrl?: string;
            accreditationDeclared?: boolean;
        } | undefined;
    }>;
}
