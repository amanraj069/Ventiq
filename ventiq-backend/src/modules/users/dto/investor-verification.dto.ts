import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class InvestorVerificationDto {
  @IsEnum(['angel', 'vc_fund', 'family_office', 'syndicate'])
  investorType: 'angel' | 'vc_fund' | 'family_office' | 'syndicate';

  @IsNumber()
  @Min(0)
  @IsOptional()
  checkSizeMin?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  checkSizeMax?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sectors?: string[];

  @IsString()
  @IsUrl({}, { message: 'Please provide a valid LinkedIn URL' })
  linkedinUrl: string;

  @IsBoolean()
  accreditationDeclared: boolean;
}
