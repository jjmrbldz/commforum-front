import { mysqlTable, int, tinyint, varchar } from "drizzle-orm/mysql-core";
import { InferSelectModel } from "drizzle-orm";

export const config = mysqlTable("T_CONFIG", {
  id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),
  postDelay: int("tc_post_delay").notNull().default(60),
  commentDelay: int("tc_comment_delay").notNull().default(60),
  attendanceRewardDaily: int("tc_attendance_reward_daily").notNull().default(100),
  attendanceRewardMonthly: int("tc_attendance_reward_monthly").notNull().default(10000),
  attendanceOnOff: tinyint("tc_attendance_on_off").notNull().default(0),
  attendanceRewardWeekly: int("tc_attendance_reward_weekly").notNull().default(100),
  defaultSignupLevel: int("tc_default_signup_level"),
  userGroup: varchar("tc_user_group", { length: 100 }),
});

export type Config = InferSelectModel<typeof config>;
// export type NewConfig = InferInsertModel<typeof config>;
