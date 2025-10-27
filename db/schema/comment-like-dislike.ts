import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Categories } from "./category";

function createCommentLikeDislike(name: `T_COMMENT_${Categories}_LIKE_DISLIKE`) {
  return mysqlTable(
    name.toUpperCase(),
    {
      id: int("id", { unsigned: true }).autoincrement().primaryKey(),
      commentId: int("tc_id").notNull(),
      userId: int("tu_id").notNull(),
      regDatetime: datetime("tld_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
      type: varchar("tld_type", { length: 255 }),
    }
  );
}

export const commentLikeDislikeTables = {
  casino: createCommentLikeDislike("T_COMMENT_CASINO_LIKE_DISLIKE"),
  freeboard: createCommentLikeDislike("T_COMMENT_FREEBOARD_LIKE_DISLIKE"),
  minigames: createCommentLikeDislike("T_COMMENT_MINIGAMES_LIKE_DISLIKE"),
  reviewboard: createCommentLikeDislike("T_COMMENT_REVIEWBOARD_LIKE_DISLIKE"),
  slot: createCommentLikeDislike("T_COMMENT_SLOT_LIKE_DISLIKE"),
  sports: createCommentLikeDislike("T_COMMENT_SPORTS_LIKE_DISLIKE"),
  eventmember: createCommentLikeDislike("T_COMMENT_EVENTMEMBER_LIKE_DISLIKE"),
  eventverified: createCommentLikeDislike("T_COMMENT_EVENTVERIFIED_LIKE_DISLIKE"),
  eventtazza: createCommentLikeDislike("T_COMMENT_EVENTTAZZA_LIKE_DISLIKE"),
  scamcasino: createCommentLikeDislike("T_COMMENT_SCAMCASINO_LIKE_DISLIKE"),
  slotreviewboard: createCommentLikeDislike("T_COMMENT_SLOTREVIEWBOARD_LIKE_DISLIKE"),
  minigame: createCommentLikeDislike("T_COMMENT_MINIGAME_LIKE_DISLIKE"),
  fishgame: createCommentLikeDislike("T_COMMENT_FISHGAME_LIKE_DISLIKE"),
  announcements: createCommentLikeDislike("T_COMMENT_ANNOUNCEMENTS_LIKE_DISLIKE"),
  guide: createCommentLikeDislike("T_COMMENT_GUIDE_LIKE_DISLIKE"),
  introduction: createCommentLikeDislike("T_COMMENT_INTRODUCTION_LIKE_DISLIKE"),
} as const;

export type CommentLikeDislike = keyof typeof commentLikeDislikeTables;

export type CommentLikeDislikeRow<C extends CommentLikeDislike> = InferSelectModel<typeof commentLikeDislikeTables[C]>;