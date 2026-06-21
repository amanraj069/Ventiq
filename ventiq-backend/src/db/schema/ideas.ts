import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { users } from './users';

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export const ideaStatusEnum = pgEnum('idea_status', [
  'draft',
  'submitted',
  'evaluating',
  'scored',
  'failed',
]);

export const tractionStatusEnum = pgEnum('traction_status', [
  'idea_only',
  'building',
  'launched',
  'generating_revenue',
]);

export const fundingStageEnum = pgEnum('funding_stage', [
  'pre_seed',
  'seed',
  'series_a',
  'series_b',
  'series_c_plus',
]);

/* ------------------------------------------------------------------ */
/*  Ideas Table                                                        */
/* ------------------------------------------------------------------ */

export const ideas = pgTable('ideas', {
  id: uuid('id').defaultRandom().primaryKey(),
  founderId: uuid('founder_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  status: ideaStatusEnum('status').notNull().default('draft'),
  version: integer('version').notNull().default(1),

  // Step 1 — The Idea
  name: varchar('name', { length: 255 }),
  oneLinePitch: varchar('one_line_pitch', { length: 500 }),
  description: text('description'),
  domain: varchar('domain', { length: 100 }),
  targetCountry: varchar('target_country', { length: 100 }),
  differentiation: text('differentiation'),

  // Step 2 — Team
  cofoundersCount: integer('cofounders_count'),
  technicalFounders: boolean('technical_founders'),
  priorExperience: text('prior_experience'),
  teamSize: integer('team_size'),

  // Step 3 — Traction
  tractionStatus: tractionStatusEnum('traction_status'),
  userCount: integer('user_count'),
  mrr: numeric('mrr', { precision: 12, scale: 2 }),
  retentionRate: numeric('retention_rate', { precision: 5, scale: 2 }),
  growthTrend: text('growth_trend'),

  // Step 4 — Funding Ask
  fundingAmount: numeric('funding_amount', { precision: 15, scale: 2 }),
  fundingCurrency: varchar('funding_currency', { length: 10 }).default('USD'),
  useOfFunds: text('use_of_funds'),
  fundingStage: fundingStageEnum('funding_stage'),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Idea = typeof ideas.$inferSelect;
export type NewIdea = typeof ideas.$inferInsert;
