import {
  pgTable,
  uuid,
  integer,
  numeric,
  jsonb,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { ideas } from './ideas';

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export const evaluationStatusEnum = pgEnum('evaluation_status', [
  'queued',
  'processing',
  'completed',
  'failed',
]);

/* ------------------------------------------------------------------ */
/*  Agent Result Type (stored in JSONB array)                          */
/* ------------------------------------------------------------------ */

export interface AgentResult {
  agentName: string;
  score: number;
  weight: number;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  metadata?: Record<string, unknown>;
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  durationMs: number;
  completedAt: string;
}

/* ------------------------------------------------------------------ */
/*  Evaluations Table                                                  */
/* ------------------------------------------------------------------ */

export const evaluations = pgTable('evaluations', {
  id: uuid('id').defaultRandom().primaryKey(),
  ideaId: uuid('idea_id')
    .notNull()
    .references(() => ideas.id, { onDelete: 'cascade' }),
  ideaVersion: integer('idea_version').notNull(),

  status: evaluationStatusEnum('status').notNull().default('queued'),

  // Overall computed score (0-100)
  overallScore: numeric('overall_score', { precision: 5, scale: 2 }),

  // Per-agent results
  agentResults: jsonb('agent_results').$type<AgentResult[]>().default([]),

  // Rubric version used for this evaluation
  rubricVersion: integer('rubric_version').notNull().default(1),

  // Aggregate token usage & processing metrics
  tokenUsage: jsonb('token_usage').$type<{
    totalPromptTokens: number;
    totalCompletionTokens: number;
    totalTokens: number;
    estimatedCost: number;
  }>(),

  processingDurationMs: integer('processing_duration_ms'),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
});

export type Evaluation = typeof evaluations.$inferSelect;
export type NewEvaluation = typeof evaluations.$inferInsert;
