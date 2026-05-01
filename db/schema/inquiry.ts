import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, index, int, longtext, mysqlTable, tinyint, varchar } from "drizzle-orm/mysql-core";
import { Groups } from "./user-group";

function createInquiryTable(name: `T_USER_INQUIRY_${Groups}`) {
  return mysqlTable(name.toUpperCase(), {
    id: int("id", { unsigned: true }).autoincrement().primaryKey(),
    userId: int("tu_id").notNull(),
    partnerId: int("tp_partnerid").notNull().default(0),
    content: longtext("tui_content"),
    attachment: longtext("tui_attachment"),
    regDatetime: datetime("tui_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
    userLastReadDatetime: datetime("tui_user_last_read_datetime"),
    partnerLastReadDatetime: datetime("tui_partner_last_read_datetime"),
    userIsRead: tinyint("tui_user_is_read").notNull().default(0),
    partnerIsRead: tinyint("tui_partner_is_read").notNull().default(0),
    sender: varchar("tui_sender", { length: 100 }), // user || admin
  })
}

export const inquiryTables = {
  A: createInquiryTable("T_USER_INQUIRY_A"),
  B: createInquiryTable("T_USER_INQUIRY_B"),
  C: createInquiryTable("T_USER_INQUIRY_C"),
  D: createInquiryTable("T_USER_INQUIRY_D"),
  E: createInquiryTable("T_USER_INQUIRY_E"),
} as const;

export type InquiryGroup = keyof typeof inquiryTables;

export type UserInquiry<C extends InquiryGroup> = InferSelectModel<typeof inquiryTables[C]>;
export type NewUserInquiry<C extends InquiryGroup> = InferSelectModel<typeof inquiryTables[C]>;