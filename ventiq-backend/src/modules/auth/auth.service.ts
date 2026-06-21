import { Injectable, UnauthorizedException, Logger, ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';

interface GooglePayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export interface JwtPayload {
  sub: string; // user.id (UUID)
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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private googleClient: OAuth2Client;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const clientId = this.configService.get<string>('google.clientId');
    this.googleClient = new OAuth2Client(clientId);
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.userModel.findOne({ email: dto.email }).exec();

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    const newUser = await this.userModel.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
      onboardingComplete: false,
      tier: 'free',
    });

    this.logger.log(`New user registered via email: ${newUser.email}`);
    return this.generateAuthResponse(newUser);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.userModel.findOne({ email: dto.email }).exec();

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateAuthResponse(user);
  }

  private generateAuthResponse(user: any): AuthResponse {
    const jwtPayload: JwtPayload = {
      sub: user.userId,
      email: user.email,
      role: user.role,
      onboardingComplete: user.onboardingComplete,
      investorVerificationStatus: user.investorVerificationStatus,
      tier: user.tier,
    };

    const accessToken = this.jwtService.sign(jwtPayload);

    return {
      accessToken,
      user: {
        id: user.userId,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role,
        onboardingComplete: user.onboardingComplete,
        investorVerificationStatus: user.investorVerificationStatus,
        tier: user.tier,
      },
    };
  }

  /**
   * Verify a Google ID token, upsert the user, and issue a Ventiq JWT.
   */
  async verifyGoogleToken(idToken: string): Promise<AuthResponse> {
    // 1. Verify the Google ID token
    const payload = await this.verifyIdToken(idToken);

    // 2. Upsert the user
    const user = await this.upsertUser(payload);

    // 3. Issue JWT
    return this.generateAuthResponse(user);
  }

  /**
   * Verify the Google ID token signature against Google's public keys.
   */
  private async verifyIdToken(idToken: string): Promise<GooglePayload> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('google.clientId'),
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid Google token payload');
      }

      return {
        sub: payload.sub,
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        picture: payload.picture,
      };
    } catch (error) {
      this.logger.error('Google token verification failed', error);
      throw new UnauthorizedException('Invalid or expired Google token');
    }
  }

  /**
   * Upsert user by Google sub. New users get role: null, onboardingComplete: false.
   */
  private async upsertUser(payload: GooglePayload) {
    // Check if user exists
    const existing = await this.userModel.findOne({ googleSub: payload.sub }).exec();

    if (existing) {
      // Update name/picture on login (may have changed on Google's side)
      existing.name = payload.name;
      existing.picture = payload.picture;
      await existing.save();
      return existing;
    }

    // New user
    const newUser = await this.userModel.create({
      googleSub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      onboardingComplete: false,
      tier: 'free',
    });

    this.logger.log(`New user created: ${newUser.email}`);
    return newUser;
  }
}
