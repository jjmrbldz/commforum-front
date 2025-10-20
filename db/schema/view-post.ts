import { InferSelectModel, sql } from "drizzle-orm";
import { datetime, int, longtext, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { Categories } from "./category";

function createPostView(name: `T_POST_${Categories}_VIEWLIST`) {
  return mysqlTable(
    name.toUpperCase(),
    {
      id: int("id", { unsigned: true }).autoincrement().primaryKey(),
      postId: int("tp_id").notNull(),
      userId: int("tu_id").notNull(),
      regDatetime: datetime("tvl_reg_datetime").default(sql`CURRENT_TIMESTAMP`),
    }
  );
}

export const viewPostTables = {
  casino: createPostView("T_POST_CASINO_VIEWLIST"),
  freeboard: createPostView("T_POST_FREEBOARD_VIEWLIST"),
  minigames: createPostView("T_POST_MINIGAMES_VIEWLIST"),
  reviewboard: createPostView("T_POST_REVIEWBOARD_VIEWLIST"),
  slot: createPostView("T_POST_SLOT_VIEWLIST"),
  sports: createPostView("T_POST_SPORTS_VIEWLIST"),
  eventmember: createPostView("T_POST_EVENTMEMBER_VIEWLIST"),
  eventverified: createPostView("T_POST_EVENTVERIFIED_VIEWLIST"),
  eventtazza: createPostView("T_POST_EVENTTAZZA_VIEWLIST"),
  scamcasino: createPostView("T_POST_SCAMCASINO_VIEWLIST"),
  slotreviewboard: createPostView("T_POST_SLOTREVIEWBOARD_VIEWLIST"),
  minigame: createPostView("T_POST_MINIGAME_VIEWLIST"),
  fishgame: createPostView("T_POST_FISHGAME_VIEWLIST"),
} as const;

export type ViewPost = keyof typeof viewPostTables;

export type ViewPostRow<C extends ViewPost> = InferSelectModel<typeof viewPostTables[C]>;