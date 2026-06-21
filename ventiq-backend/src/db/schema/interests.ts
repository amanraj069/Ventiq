import {
  pgTable,
  uuid,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { ideas } from './ideas';

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export const interestStatusEnum = pgEnum('interest_status', [
  'pending',
  'approved',
  'declined',
]);

/* ------------------------------------------------------------------ */
/*  Interests Table                                                    */
/* ------------------------------------------------------------------ */

export const interests = pgTable('interests', {
  id: uuid('id').defaultRandom().primaryKey(),

  investorId: uuid('investor_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ideaId: uuid('idea_id')
    .notNull()
    .references(() => ideas.id, { onDelete: 'cascade' }),

  status: interestStatusEnum('status').notNull().default('pending'),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  respondedAt: timestamp('responded_at', { withTimezone: true }),
});

export type Interest = typeof interests.$inferSelect;
export type NewInterest = typeof interests.$inferInsert;
