import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateIdeaDto {
  // Step 1: Idea
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  oneLinePitch?: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsString()
  @IsOptional()
  targetMarket?: string;

  @IsString()
  @IsOptional()
  differentiation?: string;

  @IsString()
  @IsOptional()
  deckUrl?: string;

  // Step 2: Team
  @IsNumber()
  @IsOptional()
  coFoundersCount?: number;

  @IsEnum(['yes', 'no', 'partially', null])
  @IsOptional()
  hasTechnicalFounder?: string;

  @IsString()
  @IsOptional()
  priorExperience?: string;

  @IsNumber()
  @IsOptional()
  totalTeamSize?: number;

  // Step 3: Traction
  @IsEnum(['Idea-only', 'Building', 'Launched', 'Generating Revenue', null])
  @IsOptional()
  tractionStatus?: string;

  @IsNumber()
  @IsOptional()
  userCount?: number;

  @IsNumber()
  @IsOptional()
  mrr?: number;

  @IsString()
  @IsOptional()
  retentionRate?: string;

  @IsString()
  @IsOptional()
  growthTrend?: string;

  // Step 4: Funding Ask
  @IsNumber()
  @IsOptional()
  fundingAsk?: number;

  @IsString()
  @IsOptional()
  fundingAskCurrency?: string;

  @IsString()
  @IsOptional()
  useOfFunds?: string;

  @IsString()
  @IsOptional()
  fundingStage?: string;
}
