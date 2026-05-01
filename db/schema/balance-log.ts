import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, index, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Groups } from "./user-group";

function createBalanceLogTable(name: `T_USER_BALANCE_LOG_${Groups}`) {
  return mysqlTable(name.toUpperCase(), {
    id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),
    userId: int("tu_id").notNull(),
    type: varchar("tub_type", { length: 100 }).notNull(),
    amount: int("tub_amount").default(0),
    prevBalance: int("tub_prev_balance").default(0),
    afterBalance: int("tub_after_balance").default(0),
    note: varchar("tub_note", { length: 100 }).notNull(),
    note2: varchar("tub_note2", { length: 100 }).notNull(),
    note3: varchar("tub_note3", { length: 100 }).notNull(),
    regDatetime: datetime("tub_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
    referenceTable: varchar("tub_reference_table", { length: 100 }).notNull().default(""),
    referenceId: int("tub_reference_id").notNull().default(0),
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

export const balanceLogTables = {
  A: createBalanceLogTable("T_USER_BALANCE_LOG_A"),
  B: createBalanceLogTable("T_USER_BALANCE_LOG_B"),
  C: createBalanceLogTable("T_USER_BALANCE_LOG_C"),
  D: createBalanceLogTable("T_USER_BALANCE_LOG_D"),
  E: createBalanceLogTable("T_USER_BALANCE_LOG_E"),
} as const;

export type BalanceLogGroup = keyof typeof balanceLogTables;

export type UserBalanceLog<C extends BalanceLogGroup> = InferSelectModel<typeof balanceLogTables[C]>;
export type NewUserBalanceLog<C extends BalanceLogGroup> = InferSelectModel<typeof balanceLogTables[C]>;