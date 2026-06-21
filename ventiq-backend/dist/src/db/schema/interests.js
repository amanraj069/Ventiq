"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interests = exports.interestStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
const ideas_1 = require("./ideas");
exports.interestStatusEnum = (0, pg_core_1.pgEnum)('interest_status', [
    'pending',
    'approved',
    'declined',
]);
exports.interests = (0, pg_core_1.pgTable)('interests', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    investorId: (0, pg_core_1.uuid)('investor_id')
        .notNull()
        .references(() => users_1.users.id, { onDelete: 'cascade' }),
    ideaId: (0, pg_core_1.uuid)('idea_id')
        .notNull()
        .references(() => ideas_1.ideas.id, { onDelete: 'cascade' }),
    status: (0, exports.interestStatusEnum)('status').notNull().default('pending'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    respondedAt: (0, pg_core_1.timestamp)('responded_at', { withTimezone: true }),
});
//# sourceMappingURL=interests.js.map