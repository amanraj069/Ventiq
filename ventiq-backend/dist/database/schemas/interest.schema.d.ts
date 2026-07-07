import { Document } from 'mongoose';
export declare class Interest extends Document {
    interestId: string;
    ideaId: string;
    investorId: string;
    founderId: string;
    status: string;
    message?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const InterestSchema: import("mongoose").Schema<Interest, import("mongoose").Model<Interest, any, any, any, any, any, Interest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Interest, Document<unknown, {}, Interest, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string | undefined, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ideaId?: import("mongoose").SchemaDefinitionProperty<string, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    founderId?: import("mongoose").SchemaDefinitionProperty<string, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    interestId?: import("mongoose").SchemaDefinitionProperty<string, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    investorId?: import("mongoose").SchemaDefinitionProperty<string, Interest, Document<unknown, {}, Interest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Interest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Interest>;
