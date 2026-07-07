import { InterestService } from './interest.service';
export declare class InterestController {
    private readonly interestService;
    constructor(interestService: InterestService);
    expressInterest(investorId: string, ideaId: string, message?: string): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas/interest.schema").Interest, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas/interest.schema").Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMyInterests(investorId: string): Promise<{
        idea: {
            ideaId: string;
            title: string;
            oneLinePitch: string | undefined;
            domain: string | undefined;
            status: string;
        } | null;
        interestId: string;
        ideaId: string;
        investorId: string;
        founderId: string;
        status: string;
        message?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    getInbox(founderId: string, ideaId: string): Promise<{
        investor: {
            userId: string;
            name: string;
            email: string;
            picture: string | undefined;
            investorProfile: {
                investorType?: string;
                checkSizeMin?: number;
                checkSizeMax?: number;
                sectors?: string[];
                linkedinUrl?: string;
                accreditationDeclared?: boolean;
            } | undefined;
        } | null;
        interestId: string;
        ideaId: string;
        investorId: string;
        founderId: string;
        status: string;
        message?: string;
        createdAt?: Date;
        updatedAt?: Date;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    approve(founderId: string, interestId: string): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas/interest.schema").Interest, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas/interest.schema").Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    decline(founderId: string, interestId: string): Promise<import("mongoose").Document<unknown, {}, import("../../database/schemas/interest.schema").Interest, {}, import("mongoose").DefaultSchemaOptions> & import("../../database/schemas/interest.schema").Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
