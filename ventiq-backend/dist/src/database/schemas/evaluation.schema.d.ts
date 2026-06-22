import { Document } from 'mongoose';
export declare class Evaluation extends Document {
    evaluationId: string;
    ideaId: string;
    overallScore?: number;
    scoreBreakdown?: {
        market?: number;
        team?: number;
        traction?: number;
        differentiation?: number;
        scalability?: number;
        clarity?: number;
    };
    summary?: string;
    strengths?: string[];
    weaknesses?: string[];
    agentOutputs?: any[];
}
export declare const EvaluationSchema: import("mongoose").Schema<Evaluation, import("mongoose").Model<Evaluation, any, any, any, any, any, Evaluation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Evaluation, Document<unknown, {}, Evaluation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ideaId?: import("mongoose").SchemaDefinitionProperty<string, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    evaluationId?: import("mongoose").SchemaDefinitionProperty<string, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    overallScore?: import("mongoose").SchemaDefinitionProperty<number | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    scoreBreakdown?: import("mongoose").SchemaDefinitionProperty<{
        market?: number;
        team?: number;
        traction?: number;
        differentiation?: number;
        scalability?: number;
        clarity?: number;
    } | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    summary?: import("mongoose").SchemaDefinitionProperty<string | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    strengths?: import("mongoose").SchemaDefinitionProperty<string[] | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    weaknesses?: import("mongoose").SchemaDefinitionProperty<string[] | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    agentOutputs?: import("mongoose").SchemaDefinitionProperty<any[] | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Evaluation>;
