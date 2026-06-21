"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideas = exports.fundingStageEnum = exports.tractionStatusEnum = exports.ideaStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
exports.ideaStatusEnum = (0, pg_core_1.pgEnum)('idea_status', [
    'draft',
    'submitted',
    'evaluating',
    'scored',
    'failed',
]);
exports.tractionStatusEnum = (0, pg_core_1.pgEnum)('traction_status', [
    'idea_only',
    'building',
    'launched',
    'generating_revenue',
]);
exports.fundingStageEnum = (0, pg_core_1.pgEnum)('funding_stage', [
    'pre_seed',
    'seed',
    'series_a',
    'series_b',
    'series_c_plus',
]);
exports.ideas = (0, pg_core_1.pgTable)('ideas', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    founderId: (0, pg_core_1.uuid)('founder_id')
        .notNull()
        .references(() => users_1.users.id, { onDelete: 'cascade' }),
    status: (0, exports.ideaStatusEnum)('status').notNull().default('draft'),
    version: (0, pg_core_1.integer)('version').notNull().default(1),
    name: (0, pg_core_1.varchar)('name', { length: 255 }),
    oneLinePitch: (0, pg_core_1.varchar)('one_line_pitch', { length: 500 }),
    description: (0, pg_core_1.text)('description'),
    domain: (0, pg_core_1.varchar)('domain', { length: 100 }),
    targetCountry: (0, pg_core_1.varchar)('target_country', { length: 100 }),
    differentiation: (0, pg_core_1.text)('differentiation'),
    cofoundersCount: (0, pg_core_1.integer)('cofounders_count'),
    technicalFounders: (0, pg_core_1.boolean)('technical_founders'),
    priorExperience: (0, pg_core_1.text)('prior_experience'),
    teamSize: (0, pg_core_1.integer)('team_size'),
    tractionStatus: (0, exports.tractionStatusEnum)('traction_status'),
    userCount: (0, pg_core_1.integer)('user_count'),
    mrr: (0, pg_core_1.numeric)('mrr', { precision: 12, scale: 2 }),
    retentionRate: (0, pg_core_1.numeric)('retention_rate', { precision: 5, scale: 2 }),
    growthTrend: (0, pg_core_1.text)('growth_trend'),
    fundingAmount: (0, pg_core_1.numeric)('funding_amount', { precision: 15, scale: 2 }),
    fundingCurrency: (0, pg_core_1.varchar)('funding_currency', { length: 10 }).default('USD'),
    useOfFunds: (0, pg_core_1.text)('use_of_funds'),
    fundingStage: (0, exports.fundingStageEnum)('funding_stage'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
//# sourceMappingURL=ideas.js.map