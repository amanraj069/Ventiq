export declare class InvestorVerificationDto {
    investorType: 'angel' | 'vc_fund' | 'family_office' | 'syndicate';
    checkSizeMin?: number;
    checkSizeMax?: number;
    sectors?: string[];
    linkedinUrl: string;
    accreditationDeclared: boolean;
}
