import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, int, longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Categories } from "./category";

function createComment(name: `T_COMMENT_${Categories}`) {
  return mysqlTable(
    name.toUpperCase(),
    {
      id: int("id", { unsigned: true }).autoincrement().primaryKey(),
      postId: varchar("tp_id", { length: 255 }).default(""),
      categoryId: int("tc_id"),
      content: longtext("tc_content").notNull(),
      level: int("tc_level").default(1),
      regDatetime: datetime("tc_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
      updateDatetime: datetime("tc_update_datetime"),
      userId: int("tu_id").notNull().default(0),
      like: int("tc_like"),
      dislike: int("tc_dislike"),
    }
  );
}

export const commentTables = {
  casino: createComment("T_COMMENT_CASINO"),
  freeboard: createComment("T_COMMENT_FREEBOARD"),
  minigames: createComment("T_COMMENT_MINIGAMES"),
  reviewboard: createComment("T_COMMENT_REVIEWBOARD"),
  slot: createComment("T_COMMENT_SLOT"),
  sports: createComment("T_COMMENT_SPORTS"),
} as const;

export type Comment = keyof typeof commentTables;

export type CommentRow<C extends Comment> = InferSelectModel<typeof commentTables[C]>;