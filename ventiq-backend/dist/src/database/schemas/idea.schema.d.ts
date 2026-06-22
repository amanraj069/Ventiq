import { Document } from 'mongoose';
export declare class Idea extends Document {
    ideaId: string;
    founderId: string;
    status: string;
    title: string;
    oneLinePitch?: string;
    description: string;
    domain?: string;
    targetMarket?: string;
    differentiation?: string;
    deckUrl?: string;
    websiteUrl?: string;
    businessModel?: string;
    competitors?: string;
    coFoundersCount?: number;
    hasTechnicalFounder?: string;
    priorExperience?: string;
    totalTeamSize?: number;
    tractionStatus?: string;
    userCount?: number;
    mrr?: number;
    retentionRate?: string;
    growthTrend?: string;
    fundingAsk?: number;
    fundingAskCurrency?: string;
    useOfFunds?: string;
    fundingStage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const IdeaSchema: import("mongoose").Schema<Idea, import("mongoose").Model<Idea, any, any, any, any, any, Idea>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Idea, Document<unknown, {}, Idea, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    priorExperience?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    domain?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ideaId?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    founderId?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    oneLinePitch?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    targetMarket?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    differentiation?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deckUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    websiteUrl?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    businessModel?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    competitors?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    coFoundersCount?: import("mongoose").SchemaDefinitionProperty<number | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    hasTechnicalFounder?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalTeamSize?: import("mongoose").SchemaDefinitionProperty<number | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tractionStatus?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userCount?: import("mongoose").SchemaDefinitionProperty<number | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mrr?: import("mongoose").SchemaDefinitionProperty<number | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    retentionRate?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    growthTrend?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fundingAsk?: import("mongoose").SchemaDefinitionProperty<number | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fundingAskCurrency?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    useOfFunds?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fundingStage?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Idea>;
