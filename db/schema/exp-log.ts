import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, index, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Groups } from "./user-group";

function createExpLogTable(name: `T_USER_EXP_LOG_${Groups}`) {
  return mysqlTable(name.toUpperCase(), {
    id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),
    userId: int("tu_id").notNull(),
    type: varchar("tue_type", { length: 100 }).notNull(),
    exp: int("tue_exp").default(0),
    prevExp: int("tue_prev_exp").default(0),
    afterExp: int("tue_after_exp").default(0),
    prevLevel: int("tue_prev_level").default(0),
    afterLevel: int("tue_after_level").default(0),
    note: varchar("tue_note", { length: 100 }).notNull(),
    note2: varchar("tue_note2", { length: 100 }).notNull(),
    note3: varchar("tue_note3", { length: 100 }).notNull(),
    regDatetime: datetime("tue_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
    referenceTable: varchar("tue_reference_table", { length: 100 }).notNull().default(""),
    referenceId: int("tue_reference_id").notNull().default(0),
  },
  (t) => ([
    index(`${name}_IdxId`).on(t.id),
    index(`${name}_IdxTuId`).on(t.userId),
    index(`${name}_IdxType`).on(t.type),
    index(`${name}_IdxNote`).on(t.note),
    index(`${name}_IdxNote2`).on(t.note2),
    index(`${name}_IdxNote3`).on(t.note3),
    index(`${name}_IdxRegDatetime`).on(t.regDatetime),
    index(`${name}_IdxReferenceTable`).on(t.referenceTable),
    index(`${name}_IdxReferenceId`).on(t.referenceId),
  ]))
}

export const expLogTables = {
  A: createExpLogTable("T_USER_EXP_LOG_A"),
  B: createExpLogTable("T_USER_EXP_LOG_B"),
  C: createExpLogTable("T_USER_EXP_LOG_C"),
  D: createExpLogTable("T_USER_EXP_LOG_D"),
  E: createExpLogTable("T_USER_EXP_LOG_E"),
} as const;

export type ExpLogGroup = keyof typeof expLogTables;

export type UserExpLog<C extends ExpLogGroup> = InferSelectModel<typeof expLogTables[C]>;
export type NewUserExpLog<C extends ExpLogGroup> = InferSelectModel<typeof expLogTables[C]>;