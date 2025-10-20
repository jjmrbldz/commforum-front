import { sql } from "drizzle-orm";
import { datetime, index, int, mysqlEnum, mysqlTable, tinyint, varchar } from "drizzle-orm/mysql-core";

const POST_CATEGORIES = [
  "CASINO",
  "FREEBOARD",
  "MINIGAMES",
  "REVIEWBOARD",
  "SLOT",
  "SPORTS",
  "EVENTMEMBER",
  "EVENTVERIFIED",
  "EVENTTAZZA",
  "SCAMCASINO",
  "SLOTREVIEWBOARD",
  "MINIGAME",
  "FISHGAME",
] as const;

export type Categories = (typeof POST_CATEGORIES)[number];

export const categories = mysqlTable("T_CATEGORY", {
    id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),

    title: varchar("tc_title", { length: 255 }).default(""),

    status: int("tc_status").default(1),

    postPts: int("tc_post_pts").notNull().default(0),
    commentsPts: int("tc_comments_pts").notNull().default(0),

    luckyComment: tinyint("tc_lucky_comment").notNull().default(0),
    luckyPtsChance: int("tc_lucky_pts_chance").notNull().default(0),
    luckyPts: int("tc_lucky_pts").notNull().default(0),

    allowedUserLevel: int("tc_allowed_user_level").notNull().default(1),
    allowedUserLevelComment: int("tc_allowed_user_level_comment").notNull().default(1),
    allowedViewLevel: int("tc_allowed_view_level").notNull().default(1),

    layout: varchar("tc_layout", { length: 100 }).notNull().default("grid"),

    homepageCount: int("tc_homepage_count").default(20),
    singlepageCount: int("tc_singlepage_count").default(50),

    regDatetime: datetime("tc_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
    updateDatetime: datetime("tc_update_datetime"),

    orderBy: tinyint("order_by").default(0),

    visibility: varchar("tc_visibility", { length: 100 }),

    postExp: int("tc_post_exp"),
    commentExp: int("tc_comment_exp"),
    value: mysqlEnum("tc_value", [
      "casino",
      "slot",
      "freeboard",
      "reviewboard",
      "slotreviewboard",
      "eventmember",
      "eventtazza",
      "eventverified",
      "scamcasino",
      "sports",
      "minigames",
      "fishgame",
    ]).notNull(),
    titleKr: varchar("tc_title_kor", { length: 255 }).default(sql`NULL`),
  },
  (t) => ([
    index("tc_status_idx").on(t.status),
    index("tc_reg_datetime_idx").on(t.regDatetime),
    index("tc_update_datetime_idx").on(t.updateDatetime),
    index("tc_title_idx").on(t.title),
    index("tc_id_idx").on(t.id),
  ])
);

export type CategoryRow = typeof categories.$inferSelect;