import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class FounderProfileDto {
  @IsBoolean()
  @IsOptional()
  isTechnical?: boolean;

  @IsString()
  @IsOptional()
  priorExperience?: string;

  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'Please provide a valid LinkedIn URL' })
  linkedinUrl?: string;
}
