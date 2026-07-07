import { Model } from 'mongoose';
import { Interest } from '../../database/schemas/interest.schema';
import { Idea } from '../../database/schemas/idea.schema';
import { User } from '../../database/schemas/user.schema';
export declare class InterestService {
    private interestModel;
    private ideaModel;
    private userModel;
    private readonly logger;
    constructor(interestModel: Model<Interest>, ideaModel: Model<Idea>, userModel: Model<User>);
    expressInterest(investorId: string, ideaId: string, message?: string): Promise<import("mongoose").Document<unknown, {}, Interest, {}, import("mongoose").DefaultSchemaOptions> & Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getInvestorInterests(investorId: string): Promise<{
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
    getFounderInterestInbox(founderId: string, ideaId: string): Promise<{
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
    approveInterest(founderId: string, interestId: string): Promise<import("mongoose").Document<unknown, {}, Interest, {}, import("mongoose").DefaultSchemaOptions> & Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    declineInterest(founderId: string, interestId: string): Promise<import("mongoose").Document<unknown, {}, Interest, {}, import("mongoose").DefaultSchemaOptions> & Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getInterestStatus(investorId: string, ideaId: string): Promise<(Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
