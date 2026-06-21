import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';

/* ------------------------------------------------------------------ */
/*  Enums                                                              */
/* ------------------------------------------------------------------ */

export const userRoleEnum = pgEnum('user_role', ['founder', 'investor']);

export const investorVerificationStatusEnum = pgEnum(
  'investor_verification_status',
  ['pending', 'verified', 'rejected'],
);

export const userTierEnum = pgEnum('user_tier', ['free', 'pro']);

/* ------------------------------------------------------------------ */
/*  Users Table                                                        */
/* ------------------------------------------------------------------ */

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Google OAuth
  googleSub: varchar('google_sub', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  picture: text('picture'),

  // Onboarding
  role: userRoleEnum('role'),
  onboardingComplete: boolean('onboarding_complete').notNull().default(false),

  // Investor-specific
  investorVerificationStatus: investorVerificationStatusEnum(
    'investor_verification_status',
  ),
  investorProfile: jsonb('investor_profile').$type<{
    investorType?: 'angel' | 'vc_fund' | 'family_office' | 'syndicate';
    checkSizeMin?: number;
    checkSizeMax?: number;
    sectors?: string[];
    linkedinUrl?: string;
    accreditationDeclared?: boolean;
  }>(),

  // Founder-specific
  founderProfile: jsonb('founder_profile').$type<{
    isTechnical?: boolean;
    priorExperience?: string;
    linkedinUrl?: string;
  }>(),

  // Billing
  tier: userTierEnum('tier').notNull().default('free'),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
