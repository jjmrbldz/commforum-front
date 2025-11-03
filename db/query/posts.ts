"use server"

import { and, asc, count, countDistinct, desc, eq, inArray, like, lte, sql, SQL } from "drizzle-orm";
import { db } from "..";
import { PostCategory, postTables } from "../schema/posts";
import { PostData, ServerActionResponse } from "@/types";
import { categories } from "../schema/category";
import { users } from "../schema/user";
import { getUserSession } from "@/lib/session";
import { likeDislikeTables } from "../schema/like-dislike";
import { viewPost } from "./view-post";
import { MySqlTableWithColumns, unionAll } from "drizzle-orm/mysql-core";

interface FilterData  {
  category: PostCategory;
  id?: number;
  logView?: boolean;
  userId?: number;
  type?: string;
  term?: string;
  page?: string;
  limit?: string;
}

type AllPostFilterData = {
  userId?: number;
  type?: string;
  category?: string;
  term?: string;
  page?: string;
  limit?: string;
  orderBy?: "date" | "views" | "likes"; // date | views
  sortBy?: "asc" | "desc"; // asc | desc
} | undefined;

export async function getPostsByCategory({category, id, logView, type, term, userId, page, limit}: FilterData): ServerActionResponse<PostData[]> {
  try {
    if (!category) return { ok: false, message: "Choose a category first." };
  
    const filters: SQL[] = [];
      
    const postTable = postTables[category];
    const likeDislikeTable = likeDislikeTables[category];
    if (!postTable) return { ok: false, message: "No available posts for this category." };

    if(id && typeof id !== "number") return { ok: false, message: "Post not found." };
    if (id) filters.push(eq(postTable.id, id));
    if (type === "title" && term) filters.push(like(postTable.title, `%${term}%`));
    if (type === "content" && term) filters.push(like(postTable.content, `%${term}%`));

    const user = await getUserSession();
    const isLoggedIn = !!user;

    if (isLoggedIn) {
      filters.push(inArray(categories.visibility, ["public", "private"]));
    } else {
      if (id) {
        filters.push(inArray(categories.visibility, ["public", "private"]))
      } else {
        // filters.push(eq(categories.visibility, "public"));
        filters.push(inArray(categories.visibility, ["public", "private"]))
      }
    }

    if (userId) filters.push(eq(postTable.userId, userId));
  
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
      categoryTitleKr: categories.titleKr,
      allowedViewLevel: categories.allowedViewLevel,
      allowedCommentLevel: categories.allowedUserLevelComment,
      allowedUserLevel: categories.allowedUserLevel,
      visibility: categories.visibility,
      authorUsername: users.username,
      authorId: users.id,
      authorName: users.name,
      authorGroup: users.group,
      authorLevel: users.level,
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
        lte(postTable.regDatetime, new Date()),
        ...filters
      )
    )
    .orderBy(desc(postTable.regDatetime))
    .$dynamic();
    
    let totalItems: number | undefined = undefined;
    let totalPages: number | undefined = undefined;

    if (page && limit) {
      const countRows = await db
        .select({ count: count() })
        .from(postTable)
        .innerJoin(categories, eq(categories.id, postTable.categoryId))
        .innerJoin(users, eq(users.id, postTable.userId))
        .where(
          and(
            eq(postTable.status, 1),
            lte(postTable.regDatetime, new Date()),
            ...filters
          )
        );  

      basePostTableRows = basePostTableRows
      .limit(parseInt(limit))
      .offset((parseInt(page) - 1) * parseInt(limit));

      totalItems = countRows[0].count;
      totalPages = Math.max(1, Math.ceil(totalItems / parseInt(limit)));
    }

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
    
    if (postTableRows.length === 0) return { ok: true, data: postTableRows, message: "No posts found." };

    const isAllowed = isLoggedIn && ((user.level || 1) >= postTableRows[0].allowedViewLevel)

    if (!isLoggedIn && postTableRows[0].visibility === "private") return { ok: false, message: "You need to login to view this content" };
    if (id && isLoggedIn && !isAllowed) return { ok: false, message: "Your level is not enough to view this content" };
    if (id && !isLoggedIn && postTableRows[0].visibility === "private") return { ok: false, message: "You need to login to view this content" };

    if (logView && isLoggedIn && id && process.env.NODE_ENV === "production") await viewPost({userId: user.id, postId: id, category})
  
    return { 
      ok: true, 
      data: postTableRows, 
      totalItems,
      totalPages,
      message: "Posts successfully retreived." 
    };
  } catch (error) {
    console.error(error)
    return { ok: false, message: "Something went wrong" };
  }  
}

export async function getAllPosts(filter?: AllPostFilterData): ServerActionResponse<PostData[]> {

  try {
    const filters: SQL[] = [];

    const freeBoardPostTable = postTables['freeboard'];
    const reviewBoardPostTable = postTables['reviewboard'];
    const casinoReviewPostTable = postTables['casino'];
    const slotReviewPostTable = postTables['slot'];
    const sportsPostTable = postTables['sports'];
    const minigamesPostTable = postTables['minigames'];
    const memberEventPostTable = postTables['eventmember'];
    const verifiedEventPostTable = postTables['eventverified'];
    const eventTazzaPostTable = postTables['eventtazza'];
    const scamCasinoPostTable = postTables['scamcasino'];
    const noticePostTable = postTables['announcements'];
    const tazzaGuidePostTable = postTables['guide'];
    const tazzaGreetingPostTable = postTables['introduction'];

    const postTablesArray = [
      freeBoardPostTable, reviewBoardPostTable, 
      casinoReviewPostTable, slotReviewPostTable, 
      sportsPostTable, minigamesPostTable,
      memberEventPostTable, verifiedEventPostTable,
      eventTazzaPostTable, scamCasinoPostTable, noticePostTable,
      tazzaGuidePostTable, tazzaGreetingPostTable
    ];

    const allPostTables = postTablesArray.map((table) => 
      db.select({
        id: table.id,
        title: table.title,
        content: table.content,
        thumbnail: table.thumbnail,
        media: table.media,
        likeCount: table.likeCount,
        dislikeCount: table.dislikeCount,
        commentCount: table.commentCount,
        postStatus: table.status,
        viewCount: table.viewCount,
        authorId: table.userId,
        categoryId: table.categoryId,
        regDatetime: table.regDatetime,
        updateDateTime: table.updateDatetime,
      })
      .from(table)
    );

    // @ts-expect-error — acceptable when spreading into unionAll variadic
    const unionPosts = unionAll(...allPostTables);
    const allPosts = db.$with("allPosts").as(unionPosts);

    let order: SQL = desc(allPosts.viewCount); // default is order by viewCount desc

    if (filter?.userId) filters.push(eq(allPosts.authorId, filter?.userId));
    if (filter?.type === "title" && filter?.term) filters.push(like(allPosts.title, `%${filter.term}%`));
    if (filter?.type === "content" && filter?.term) filters.push(like(allPosts.content, `%${filter.term}%`));
    if (filter?.category && filter?.category !== "all" && filter?.term) filters.push(eq(allPosts.categoryId, parseInt(filter?.category)));
    if (filter?.orderBy && filter?.orderBy === "date" && filter?.sortBy === "desc") order = desc(allPosts.regDatetime);
    if (filter?.orderBy && filter?.orderBy === "date" && filter?.sortBy === "asc") order = asc(allPosts.regDatetime);
    if (filter?.orderBy && filter?.orderBy === "likes" && filter?.sortBy === "desc") order = desc(allPosts.likeCount);
    if (filter?.orderBy && filter?.orderBy === "likes" && filter?.sortBy === "asc") order = asc(allPosts.likeCount);

    let baseAllPostsRows = db.with(allPosts)
      .select({
        id: allPosts.id,
        title: allPosts.title,
        content: allPosts.content,
        thumbnail: allPosts.thumbnail,
        media: allPosts.media,
        likeCount: allPosts.likeCount,
        dislikeCount: allPosts.dislikeCount,
        commentCount: allPosts.commentCount,
        viewCount: allPosts.viewCount,
        postStatus: allPosts.postStatus,
        authorId: allPosts.authorId || 0,
        authorUsername: users.username,
        authorName: users.name,
        authorGroup: users.group,
        authorLevel: users.level,
        categoryId: allPosts.categoryId,
        category: categories.value,
        categoryTitleKr: categories.titleKr,
        allowedViewLevel: categories.allowedViewLevel,
        allowedCommentLevel: categories.allowedUserLevelComment,
        allowedUserLevel: categories.allowedUserLevel,
        visibility: categories.visibility,
        regDatetime: allPosts.regDatetime,
        updateDateTime: allPosts.updateDateTime,
      })
      .from(allPosts)
      .innerJoin(categories, eq(categories.id, allPosts.categoryId))
      .innerJoin(users, eq(users.id, allPosts.authorId))
      .where(and(
        eq(allPosts.postStatus, 1),
        lte(allPosts.regDatetime, new Date()),
        ...filters,
      ))
      .orderBy(order)
      .$dynamic();

    let totalItems: number | undefined = undefined;
    let totalPages: number | undefined = undefined;

    if (filter && filter?.page && filter?.limit) {
      const limit = parseInt(filter.limit);
      const page = parseInt(filter.page);
      const countRows = await db
      .with(allPosts)
      .select({ count: count() })
      .from(allPosts)
      .where(and(
        eq(allPosts.postStatus, 1),
        lte(allPosts.regDatetime, new Date()),
        ...filters
      ));

      baseAllPostsRows = baseAllPostsRows
      .limit(limit)
      .offset((page - 1) * limit);

      totalItems = countRows[0].count;
      totalPages = Math.max(1, Math.ceil(totalItems / limit));
    }


    const allPostsRows = await baseAllPostsRows;

    return { 
      ok: true, 
      data: allPostsRows as PostData[], 
      totalItems,
      totalPages,
      message: "Posts successfully retreived." 
    };

  } catch (error) {
    console.log(error)
    return { ok: false, message: "Something went wrong" };
  }
}