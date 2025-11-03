import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { datetime, index, int, longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Categories } from "./category";

function createPostTable(name: `T_POST_${Categories}`) {
  return mysqlTable(
    name.toUpperCase(),
    {
      id: int("id", { unsigned: true }).autoincrement().notNull().primaryKey(),
      userId: int("tu_id"),
      title: longtext("tp_title").notNull(),
      content: longtext("tp_content").notNull(),
      thumbnail: longtext("tp_thumbnail"),
      media: longtext("tp_media"),
      commentCount: int("tp_comment_count").default(0),
      likeCount: int("tp_like_count").default(0),
      dislikeCount: int("tp_dislike_count").default(0),
      status: int("tp_status").default(1),
      regDatetime: datetime("tp_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
      updateDatetime: datetime("tp_update_datetime"),
      viewCount: int("tp_view_count").notNull().default(0),
      categoryId: int("tc_id").notNull().default(0),
      field1: varchar("tp_field_01", { length: 100 }),
      field2: varchar("tp_field_02", { length: 100 }),
      field3: varchar("tp_field_03", { length: 100 }),
      field4: varchar("tp_field_04", { length: 100 }),
      field5: varchar("tp_field_05", { length: 100 }),
    },
    (t) => ([
      index(`${name}_IdxUser`).on(t.userId),
      index(`${name}_IdxStatus`).on(t.status),
      index(`${name}_IdxRegtime`).on(t.regDatetime),
      index(`${name}_IdxUpdtime`).on(t.updateDatetime),
      index(`${name}_IdxViews`).on(t.viewCount),
      index(`${name}_IdxLikeCount`).on(t.likeCount),
      index(`${name}_IdxDislikeCount`).on(t.dislikeCount),
      index(`${name}_IdxCommentCount`).on(t.commentCount),
      index(`${name}_IdxId`).on(t.id),
    ])
  );
}

export const postTables = {
  casino: createPostTable("T_POST_CASINO"),
  freeboard: createPostTable("T_POST_FREEBOARD"),
  minigames: createPostTable("T_POST_MINIGAMES"),
  reviewboard: createPostTable("T_POST_REVIEWBOARD"),
  slot: createPostTable("T_POST_SLOT"),
  sports: createPostTable("T_POST_SPORTS"),
  eventmember: createPostTable("T_POST_EVENTMEMBER"),
  eventverified: createPostTable("T_POST_EVENTVERIFIED"),
  eventtazza: createPostTable("T_POST_EVENTTAZZA"),
  scamcasino: createPostTable("T_POST_SCAMCASINO"),
  slotreviewboard: createPostTable("T_POST_SLOTREVIEWBOARD"),
  minigame: createPostTable("T_POST_MINIGAME"),
  fishgame: createPostTable("T_POST_FISHGAME"),
  announcements: createPostTable("T_POST_ANNOUNCEMENTS"),
  guide: createPostTable("T_POST_GUIDE"),
  introduction: createPostTable("T_POST_INTRODUCTION"),
} as const;

export type PostCategory = keyof typeof postTables;

export type PostRow<C extends PostCategory> = InferSelectModel<typeof postTables[C]>;