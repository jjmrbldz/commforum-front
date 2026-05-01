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

  postDateRange: int("tc_post_daterange").notNull().default(30),
  commentDateRange: int("tc_comment_daterange").default(30),
  logsDateRange: int("tc_logs_daterange"),
  homepageTitle: varchar("tc_homepage_title", { length: 100 }),
  displayNickname: int("tc_display_nickname"),
  editNickname: int("tc_edit_nickname"),
  blockedIp: varchar("tc_blocked_ip", { length: 255 }),
  imageUploadExtension: varchar("tc_image_upload_extension", { length: 255 }),
  videoUploadExtension: varchar("tc_video_upload_extension", { length: 255 }),
  recentPostSize: int("tc_recent_post_size"),
  mobileRecentPostSize: int("tc_mobile_recent_post_size"),
  recentCommentSize: int("tc_recent_comment_size"),
  mobileRecentCommentSize: int("tc_mobile_recent_comment_size"),
  inquiryOnOff: tinyint("tc_inquiry_onoff").notNull().default(0),
  inquiryBalanceDeductions: int("tc_inquiry_balance_deductions").notNull().default(0),
  inquiryPointDeductions: int("tc_inquiry_point_deductions").notNull().default(0),
  inquiryUploadExtension: varchar("tc_inquiry_upload_extension", { length: 255 }),
  inquiryFilesizeLimitMb: int("tc_inquiry_filesize_limit_mb"),
});

export type Config = InferSelectModel<typeof config>;
// export type NewConfig = InferInsertModel<typeof config>;
