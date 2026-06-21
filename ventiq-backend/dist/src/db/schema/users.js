"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.userTierEnum = exports.investorVerificationStatusEnum = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userRoleEnum = (0, pg_core_1.pgEnum)('user_role', ['founder', 'investor']);
exports.investorVerificationStatusEnum = (0, pg_core_1.pgEnum)('investor_verification_status', ['pending', 'verified', 'rejected']);
exports.userTierEnum = (0, pg_core_1.pgEnum)('user_tier', ['free', 'pro']);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    googleSub: (0, pg_core_1.varchar)('google_sub', { length: 255 }).notNull().unique(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    picture: (0, pg_core_1.text)('picture'),
    role: (0, exports.userRoleEnum)('role'),
    onboardingComplete: (0, pg_core_1.boolean)('onboarding_complete').notNull().default(false),
    investorVerificationStatus: (0, exports.investorVerificationStatusEnum)('investor_verification_status'),
    investorProfile: (0, pg_core_1.jsonb)('investor_profile').$type(),
    founderProfile: (0, pg_core_1.jsonb)('founder_profile').$type(),
    tier: (0, exports.userTierEnum)('tier').notNull().default('free'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
//# sourceMappingURL=users.js.map