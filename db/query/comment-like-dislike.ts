"use server"

import { getUserSession } from "@/lib/session";
import { PostCategory } from "../schema/posts";
import { db } from "..";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { commentLikeDislikeTables } from "../schema/comment-like-dislike";
import { commentTables } from "../schema/comment";

interface Payload {
  commentId: number;
  category: PostCategory;
  actionType: string;
  postId: number;
}

export async function commentLikeDislikeAction({commentId, category, actionType, postId}: Payload) {
  try {
    const user = await getUserSession();
    if (!user) {
      return { ok: false, message: "You need to login first." } as const; 
    }

    const { id: userId } = user;

    const likeDislikeTable = commentLikeDislikeTables[category];
    const commentTable = commentTables[category];

    // const postRows = await db
    //   .select({
    //     postId: postTable.id,
    //     currentLikeCount: postTable.likeCount,
    //     currentDislikeCount: postTable.dislikeCount,
    //   })
    //   .from(postTable)
    //   .where(eq(postTable.id, postId));

    // if (postRows.length === 0) return { ok: false, message: "Post not available." }; 

    // const { currentLikeCount, currentDislikeCount } = postRows[0];

    const likeDislikeRows = await db
      .select({
        commentId: likeDislikeTable.commentId,
        type: likeDislikeTable.type
      })
      .from(likeDislikeTable)
      .where(and(
        eq(likeDislikeTable.commentId, commentId),
        eq(likeDislikeTable.userId, userId),
      )
      );

    let queryAction: {
      query: string; 
      action: string;
      newLikeCount: number;
      newDislikeCount: number;
    } = { 
      query: "insert", 
      action: actionType,
      // newLikeCount: currentLikeCount || 0,
      // newDislikeCount: currentDislikeCount || 0,
      newLikeCount: 0,
      newDislikeCount: 0,
    };

    if (likeDislikeRows.length > 0) {
      const { type } = likeDislikeRows[0];

      if (
        type === "like" && actionType === "like"
      ) queryAction = { 
        query: "update", 
        action: "unlike", 
        newLikeCount: -1,
        newDislikeCount: queryAction.newDislikeCount
      };

      if (
        type === "like" && actionType === "dislike"
      ) queryAction = { 
        query: "update", 
        action: "dislike",
        newLikeCount: -1,
        newDislikeCount: +1
      };

      if (
        type === "dislike" && actionType === "dislike"
      ) queryAction = { 
        query: "update", 
        action: "undislike",
        newLikeCount: queryAction.newLikeCount,
        newDislikeCount: -1
      };

      if (
        type === "dislike" && actionType === "like"
      ) queryAction = { 
        query: "update", 
        action: "like",
        newLikeCount: +1,
        newDislikeCount: -1
      };
      if (
        type === "unlike" && actionType === "like"
      ) queryAction = { 
        query: "update", 
        action: "like",
        newLikeCount: +1,
        newDislikeCount: queryAction.newDislikeCount
      };
      if (
        type === "unlike" && actionType === "dislike"
      ) queryAction = { 
        query: "update", 
        action: "dislike",
        newLikeCount: queryAction.newLikeCount,
        newDislikeCount: +1
      };
      if (
        type === "undislike" && actionType === "like"
      ) queryAction = { 
        query: "update", 
        action: "like",
        newLikeCount: +1,
        newDislikeCount: queryAction.newDislikeCount
      };
      if (
        type === "undislike" && actionType === "dislike"
      ) queryAction = { 
        query: "update", 
        action: "dislike",
        newLikeCount: queryAction.newLikeCount,
        newDislikeCount: +1
      };

      db.transaction(async (tx) => {
        await tx
          .update(likeDislikeTable)
          .set({
            type: queryAction.action
          })
          .where(and(
            eq(likeDislikeTable.commentId, commentId),
            eq(likeDislikeTable.userId, userId),
          ));
  
        await tx
        .update(commentTable)
        .set({
          like: sql`COALESCE(${commentTable.like}) + ${queryAction.newLikeCount}`,
          dislike: sql`COALESCE(${commentTable.dislike}) + ${queryAction.newDislikeCount}`,
        })
        .where(eq(commentTable.id, commentId));

      });
      if (queryAction.action === "unlike" || queryAction.action === "undislike" ) return { ok: true };

      return { ok: true, message: `Comment ${queryAction.action}d` };
    }

    if (actionType === "like") queryAction.newLikeCount = queryAction.newLikeCount + 1;
    if (actionType === "dislike") queryAction.newDislikeCount = queryAction.newDislikeCount + 1;

    console.log("PAYLOAD", {userId, commentId, category, actionType});
    console.log("QUERY ACTION", queryAction);

    db.transaction(async (tx) => {
      await tx
        .insert(likeDislikeTable)
        .values({
          commentId: commentId,
          type: queryAction.action,
          userId,
        });
  
      await tx
        .update(commentTable)
        .set({
          like: queryAction.newLikeCount,
          dislike: queryAction.newDislikeCount,
        })
        .where(eq(commentTable.id, commentId));
    });
    
    revalidatePath(`/posts/${category}/${postId}`, "page")
    return { ok: true, message: `Comment ${queryAction.action}ed` };
  } catch (error) {
    console.error("LIKE DISLIKE ERROR", error);
    return { ok: false, message: "Something went wrong" };
  }
}