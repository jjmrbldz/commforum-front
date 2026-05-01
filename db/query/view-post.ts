"use server"

import { db } from ".."
import { PostCategory, postTables } from "../schema/posts"
import { viewPostTables } from "../schema/view-post";
import { eq, sql } from "drizzle-orm";

export async function viewPost({
  userId, 
  postId, 
  category, 
} : {
  userId: number, 
  postId: number, 
  category: PostCategory, 
}) {

  try {
    const viewPostTable = viewPostTables[category];
    const postTable = postTables[category];

    await db.transaction(async (tx) => {
      await tx
      .insert(viewPostTable)
      .values({
        userId,
        postId,
      });
      await tx
        .update(postTable)
        .set({
          viewCount: sql`COALESCE(${postTable.viewCount}, 0) + 1`
        })
        .where(eq(postTable.id, postId));
    });
  } catch (error) {
    console.error("LOG VIEW POST ERROR", error);
  }
}