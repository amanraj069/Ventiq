import { Document } from 'mongoose';
export declare class Evaluation extends Document {
    evaluationId: string;
    ideaId: string;
    version: number;
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
    agentOutputs?: {
        agentName: string;
        score: number;
        reasoning: string;
        strengths: string[];
        weaknesses: string[];
        completedAt: Date;
    }[];
    competitorLandscape?: {
        name: string;
        description: string;
        threatLevel: 'low' | 'medium' | 'high';
    }[];
    financialProjection?: {
        summary: string;
        yearOneRevenue: string;
        yearThreeRevenue: string;
        breakEvenMonths: number;
    };
    redTeamCritique?: {
        summary: string;
        criticalRisks: string[];
    };
    rubricVersion?: string;
    appliedCeilings?: string[];
    tokenUsage?: {
        totalInputTokens: number;
        totalOutputTokens: number;
        perAgent: {
            agentName: string;
            inputTokens: number;
            outputTokens: number;
            durationMs: number;
        }[];
    };
    totalDurationMs?: number;
    supersededAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
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
    version?: import("mongoose").SchemaDefinitionProperty<number, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Evaluation, Document<unknown, {}, Evaluation, {
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
    agentOutputs?: import("mongoose").SchemaDefinitionProperty<{
        agentName: string;
        score: number;
        reasoning: string;
        strengths: string[];
        weaknesses: string[];
        completedAt: Date;
    }[] | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    competitorLandscape?: import("mongoose").SchemaDefinitionProperty<{
        name: string;
        description: string;
        threatLevel: "low" | "medium" | "high";
    }[] | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    financialProjection?: import("mongoose").SchemaDefinitionProperty<{
        summary: string;
        yearOneRevenue: string;
        yearThreeRevenue: string;
        breakEvenMonths: number;
    } | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    redTeamCritique?: import("mongoose").SchemaDefinitionProperty<{
        summary: string;
        criticalRisks: string[];
    } | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rubricVersion?: import("mongoose").SchemaDefinitionProperty<string | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    appliedCeilings?: import("mongoose").SchemaDefinitionProperty<string[] | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tokenUsage?: import("mongoose").SchemaDefinitionProperty<{
        totalInputTokens: number;
        totalOutputTokens: number;
        perAgent: {
            agentName: string;
            inputTokens: number;
            outputTokens: number;
            durationMs: number;
        }[];
    } | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalDurationMs?: import("mongoose").SchemaDefinitionProperty<number | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    supersededAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Evaluation>;
