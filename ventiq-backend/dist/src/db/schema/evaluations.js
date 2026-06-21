"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluations = exports.evaluationStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const ideas_1 = require("./ideas");
exports.evaluationStatusEnum = (0, pg_core_1.pgEnum)('evaluation_status', [
    'queued',
    'processing',
    'completed',
    'failed',
]);
exports.evaluations = (0, pg_core_1.pgTable)('evaluations', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    ideaId: (0, pg_core_1.uuid)('idea_id')
        .notNull()
        .references(() => ideas_1.ideas.id, { onDelete: 'cascade' }),
    ideaVersion: (0, pg_core_1.integer)('idea_version').notNull(),
    status: (0, exports.evaluationStatusEnum)('status').notNull().default('queued'),
    overallScore: (0, pg_core_1.numeric)('overall_score', { precision: 5, scale: 2 }),
    agentResults: (0, pg_core_1.jsonb)('agent_results').$type().default([]),
    rubricVersion: (0, pg_core_1.integer)('rubric_version').notNull().default(1),
    tokenUsage: (0, pg_core_1.jsonb)('token_usage').$type(),
    processingDurationMs: (0, pg_core_1.integer)('processing_duration_ms'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    completedAt: (0, pg_core_1.timestamp)('completed_at', { withTimezone: true }),
});
//# sourceMappingURL=evaluations.js.map