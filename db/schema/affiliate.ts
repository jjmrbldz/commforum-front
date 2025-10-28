import { sql } from "drizzle-orm";
import { mysqlTable, bigint, varchar, tinyint, datetime, int } from "drizzle-orm/mysql-core";

export const affiliateSettings = mysqlTable("T_AFFILIATE_SETTINGS", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement().notNull(),
  nameEn: varchar("tas_name_en", { length: 100 }),
  nameKor: varchar("tas_name_kor", { length: 100 }),
  type: varchar("tas_type", { length: 100 }),
  status: tinyint("tas_status"),
  regDatetime: datetime("tas_regdatetime").default(sql`CURRENT_TIMESTAMP`),
  updateDatetime: datetime("tas_update_datetime"),
  allowedLevel: int("tas_allowed_level").notNull().default(0),
  minimumAmount: bigint("tas_minimum_amount", { mode: "number" }).notNull().default(0),
  maximumAmount: bigint("tas_maximum_amount", { mode: "number" }).notNull().default(0),
});
