import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { RegisterDto, LoginDto } from './dto';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string | null;
    onboardingComplete: boolean;
    investorVerificationStatus: string | null;
    tier: string;
}
export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        picture: string | null;
        role: string | null;
        onboardingComplete: boolean;
        investorVerificationStatus: string | null;
        tier: string;
    };
}
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    private googleClient;
    constructor(userModel: Model<User>, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    private generateAuthResponse;
    verifyGoogleToken(idToken: string): Promise<AuthResponse>;
    private verifyIdToken;
    private upsertUser;
}
