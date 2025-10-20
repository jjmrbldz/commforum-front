import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, int, longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Categories } from "./category";

function createPostLikeDislike(name: `T_POST_${Categories}_LIKE_DISLIKE`) {
  return mysqlTable(
    name.toUpperCase(),
    {
      id: int("id", { unsigned: true }).autoincrement().primaryKey(),
      postId: int("tp_id").notNull(),
      userId: int("tu_id").notNull(),
      regDatetime: datetime("tld_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
      type: varchar("tld_type", { length: 255 }),
    }
  );
}

export const likeDislikeTables = {
  casino: createPostLikeDislike("T_POST_CASINO_LIKE_DISLIKE"),
  freeboard: createPostLikeDislike("T_POST_FREEBOARD_LIKE_DISLIKE"),
  minigames: createPostLikeDislike("T_POST_MINIGAMES_LIKE_DISLIKE"),
  reviewboard: createPostLikeDislike("T_POST_REVIEWBOARD_LIKE_DISLIKE"),
  slot: createPostLikeDislike("T_POST_SLOT_LIKE_DISLIKE"),
  sports: createPostLikeDislike("T_POST_SPORTS_LIKE_DISLIKE"),
  eventmember: createPostLikeDislike("T_POST_EVENTMEMBER_LIKE_DISLIKE"),
  eventverified: createPostLikeDislike("T_POST_EVENTVERIFIED_LIKE_DISLIKE"),
  eventtazza: createPostLikeDislike("T_POST_EVENTTAZZA_LIKE_DISLIKE"),
  scamcasino: createPostLikeDislike("T_POST_SCAMCASINO_LIKE_DISLIKE"),
  slotreviewboard: createPostLikeDislike("T_POST_SLOTREVIEWBOARD_LIKE_DISLIKE"),
  minigame: createPostLikeDislike("T_POST_MINIGAME_LIKE_DISLIKE"),
  fishgame: createPostLikeDislike("T_POST_FISHGAME_LIKE_DISLIKE"),
} as const;

export type PostLikeDislike = keyof typeof likeDislikeTables;

export type PostLikeDislikeRow<C extends PostLikeDislike> = InferSelectModel<typeof likeDislikeTables[C]>;