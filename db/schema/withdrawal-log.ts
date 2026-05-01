import { mysqlTable, bigint, varchar, datetime, longtext, tinyint, index } from "drizzle-orm/mysql-core";

export const withdrawalLogs = mysqlTable(
  "T_WITHDRAWAL_LOGS",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
    userId: bigint("tu_id", { mode: "number" }),
    amount: bigint("tw_amount", { mode: "number" }),
    type: varchar("tw_type", { length: 100 }),
    status: tinyint("tw_status").notNull().default(0),
    regDatetime: datetime("tw_reg_datetime"),
    updateDatetime: datetime("tw_update_datetime"),
    partnerId: bigint("tp_partnerid", { mode: "number" }),
    note: longtext("tw_note"),
    note1: longtext("tw_note_1"),
    note2: longtext("tw_note_2"),
  },
  (table) => ([
    index("idx_tu_id").on(table.userId),
    index("idx_tw_type").on(table.type),
    index("idx_tw_status").on(table.status),
    index("idx_tw_reg_datetime").on(table.regDatetime),
    index("idx_tw_update_datetime").on(table.updateDatetime),
    index("idx_tp_partnerid").on(table.partnerId),
  ])
);