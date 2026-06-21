import { Document } from 'mongoose';
export declare class Idea extends Document {
    ideaId: string;
    founderId: string;
    title: string;
    description: string;
    deckUrl?: string;
    status: string;
    websiteUrl?: string;
    targetMarket?: string;
    businessModel?: string;
    competitors?: string;
    traction?: string;
    team?: string;
    fundingAsk?: number;
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
    description?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
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
    team?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    traction?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
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
    title?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
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
    status?: import("mongoose").SchemaDefinitionProperty<string, Idea, Document<unknown, {}, Idea, {
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
    targetMarket?: import("mongoose").SchemaDefinitionProperty<string | undefined, Idea, Document<unknown, {}, Idea, {
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
    fundingAsk?: import("mongoose").SchemaDefinitionProperty<number | undefined, Idea, Document<unknown, {}, Idea, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Idea & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Idea>;
