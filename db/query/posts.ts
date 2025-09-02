"use server"

import { and, asc, eq, inArray, SQL } from "drizzle-orm";
import { db } from "..";
import { PostCategory, PostRow, postTables } from "../schema/posts";
import { PostData, ServerActionResponse } from "@/types";
import { categories } from "../schema/category";
import { users } from "../schema/user";
import { getUserSession } from "@/lib/session";

interface FilterData  {
  category: PostCategory;
  id?: number;
}

export async function getPosts({category, id}: FilterData): ServerActionResponse<PostData[]> {
  try {
    
    if (!category) return { ok: false, message: "Choose a category first." };
  
    const filters: SQL[] = [];
      
    const postTable = postTables[category];
    if (!postTable) return { ok: false, message: "No available posts for this category." };

    if(id && typeof id !== "number") return { ok: false, message: "Post not found." };
    if (id) filters.push(eq(postTable.id, id));

    const user = await getUserSession();
    const isLoggedIn = !!user;

    if (user) {
      filters.push(inArray(categories.visibility, ["public", "private"]));
    } else {
      if (id) {
        filters.push(inArray(categories.visibility, ["public", "private"]))
      } else {
        filters.push(eq(categories.visibility, "public"));
      }
    }
  
    const postTableRows = await db
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
    })
    .from(postTable)
    .where(
      and(
        eq(postTable.status, 1),
        ...filters
      )
    )
    .innerJoin(categories, eq(categories.id, postTable.categoryId))
    .innerJoin(users, eq(users.id, postTable.userId))
    .orderBy(asc(postTable.viewCount));

    
    if (postTableRows.length === 0) return { ok: true, data: postTableRows, message: "No available posts for this category." };

    const isAllowed = isLoggedIn && (parseInt(user.level) >= postTableRows[0].allowedViewLevel)

    if (id && isLoggedIn && !isAllowed) return { ok: false, message: "Your level is not enough to view this content" };
    if (id && !isLoggedIn && postTableRows[0].visibility === "private") return { ok: false, message: "You need to login to view this content" };
  
    return { ok: true, data: postTableRows, message: "Posts successfully retreived." };
  } catch (error) {
    console.error(error)
    return { ok: false, message: "Something went wrong" };
  }  
}