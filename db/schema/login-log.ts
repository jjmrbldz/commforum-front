import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, index, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Groups } from "./user-group";

function createLoginLogTable(name: `T_USER_LOGIN_LOGS_${Groups}`) {
  return mysqlTable(name.toUpperCase(), {
    id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),
    userId: int("tu_id").notNull(),
    ip: varchar("tull_ip", { length: 100 }),
    browser: varchar("tull_browser", { length: 100 }).notNull(),
    os: varchar("tull_os", { length: 100 }),
    device: varchar("tull_device", { length: 100 }),
    time: varchar("tull_time", { length: 100 }),
    dayOfWeek: varchar("tull_day_of_week", { length: 100 }),
    day: varchar("tull_day", { length: 100 }),
    month: varchar("tull_month", { length: 100 }),
    year: varchar("tull_year", { length: 100 }),
    dateTime: datetime("tull_datetime").default(sql`CURRENT_TIMESTAMP`),
  })
}

export const loginLogTables = {
  A: createLoginLogTable("T_USER_LOGIN_LOGS_A"),
  B: createLoginLogTable("T_USER_LOGIN_LOGS_B"),
  C: createLoginLogTable("T_USER_LOGIN_LOGS_C"),
  D: createLoginLogTable("T_USER_LOGIN_LOGS_D"),
  E: createLoginLogTable("T_USER_LOGIN_LOGS_E"),
} as const;

export type LoginLogGroup = keyof typeof loginLogTables;

export type UserBalanceLog<C extends LoginLogGroup> = InferSelectModel<typeof loginLogTables[C]>;
export type NewUserLoginLog<C extends LoginLogGroup> = InferSelectModel<typeof loginLogTables[C]>;