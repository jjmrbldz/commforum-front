// db/schema/level-settings.ts
import { mysqlTable, int, varchar, index } from "drizzle-orm/mysql-core";

export const levelSettings = mysqlTable(
  "T_LEVEL_SETTINGS",
  {
    id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),
    level: varchar("tl_level", { length: 255 }).default(""),
    totalExp: int("tl_total_exp").default(1),
  },
  (t) => ([
    index("tl_level_idx").on(t.level),
    index("tl_id_idx").on(t.id),
  ])
);

export type LevelSetting = typeof levelSettings.$inferSelect;
export type NewLevelSetting = typeof levelSettings.$inferInsert;
