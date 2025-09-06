"use server"

import { and, desc, eq, inArray, SQL } from "drizzle-orm";
import { db } from "..";
import { PostCategory, postTables } from "../schema/posts";
import { PostData, ServerActionResponse } from "@/types";
import { categories } from "../schema/category";
import { users } from "../schema/user";
import { getUserSession } from "@/lib/session";
import { likeDislikeTables } from "../schema/like-dislike";
import { viewPost } from "./view-post";

interface FilterData  {
  category: PostCategory;
  id?: number;
  logView?: boolean;
}

export async function getPostsByCategory({category, id, logView}: FilterData): ServerActionResponse<PostData[]> {
  try {
    
    if (!category) return { ok: false, message: "Choose a category first." };
  
    const filters: SQL[] = [];
      
    const postTable = postTables[category];
    const likeDislikeTable = likeDislikeTables[category];
    if (!postTable) return { ok: false, message: "No available posts for this category." };

    if(id && typeof id !== "number") return { ok: false, message: "Post not found." };
    if (id) filters.push(eq(postTable.id, id));

    const user = await getUserSession();
    const isLoggedIn = !!user;

    if (isLoggedIn) {
      filters.push(inArray(categories.visibility, ["public", "private"]));
    } else {
      if (id) {
        filters.push(inArray(categories.visibility, ["public", "private"]))
      } else {
        filters.push(eq(categories.visibility, "public"));
      }
    }
  
    let basePostTableRows = db
    .select({
      id: postTable.id,
      title: postTable.title,
      content: postTable.content,
      thumbnail: postTable.thumbnail,
      media: postTable.media,
      likeCount: postTable.likeCount,
      dislikeCount: postTable.dislikeCount,
      commentCount: postTable.commentCount,
      viewCount: postTable.viewCount,
      categoryId: categories.id,
      category: categories.value,
      allowedViewLevel: categories.allowedViewLevel,
      allowedCommentLevel: categories.allowedUserLevelComment,
      allowedUserLevel: categories.allowedUserLevel,
      visibility: categories.visibility,
      authorUsername: users.username,
      authorId: users.id,
      authorName: users.name,
      authorGroup: users.group,
      regDatetime: postTable.regDatetime,
      updateDateTime: postTable.updateDatetime,
      ...(isLoggedIn && id ? { likeDislikeType: likeDislikeTable.type } : {})
    })
    .from(postTable)
    .innerJoin(categories, eq(categories.id, postTable.categoryId))
    .innerJoin(users, eq(users.id, postTable.userId))
    .where(
      and(
        eq(postTable.status, 1),
        ...filters
      )
    )
    .orderBy(desc(postTable.viewCount));

    if (isLoggedIn && id) {
      basePostTableRows = basePostTableRows.leftJoin(
        likeDislikeTable,
        and(
          eq(likeDislikeTable.postId, postTable.id),
          eq(likeDislikeTable.userId, user!.id)
        )
      );
    }

    const postTableRows = await basePostTableRows;
    
    if (postTableRows.length === 0) return { ok: true, data: postTableRows, message: "No available posts for this category." };

    const isAllowed = isLoggedIn && (parseInt(user.level || "1") >= postTableRows[0].allowedViewLevel)

    if (!isLoggedIn && postTableRows[0].visibility === "private") return { ok: false, message: "You need to login to view this content" };
    if (id && isLoggedIn && !isAllowed) return { ok: false, message: "Your level is not enough to view this content" };
    if (id && !isLoggedIn && postTableRows[0].visibility === "private") return { ok: false, message: "You need to login to view this content" };

    if (logView && isLoggedIn && id && process.env.NODE_ENV === "production") await viewPost({userId: user.id, postId: id, category})
  
    return { ok: true, data: postTableRows, message: "Posts successfully retreived." };
  } catch (error) {
    console.error(error)
    return { ok: false, message: "Something went wrong" };
  }  
}