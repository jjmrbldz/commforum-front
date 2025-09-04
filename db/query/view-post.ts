"use server"

import { db } from ".."
import { PostCategory, postTables } from "../schema/posts"
import { viewPostTables } from "../schema/view-post";
import { eq } from "drizzle-orm";

export async function viewPost({
  userId, 
  postId, 
  category, 
  currViewCount, 
} : {
  userId: number, 
  postId: number, 
  currViewCount: number, 
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
          viewCount: currViewCount + 1
        })
        .where(eq(postTable.id, postId));
    });
  } catch (error) {
    
  }
}