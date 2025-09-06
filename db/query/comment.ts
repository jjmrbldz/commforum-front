"use server"

import { getUserSession } from "@/lib/session";
import { CommentData, commentSchema } from "../validations/comment";
import getCategories from "./categories";
import { ExpLogGroup, expLogTables } from "../schema/exp-log";
import { balanceLogTables } from "../schema/balance-log";
import { getUserExpLevel } from "./user-level-exp";
import { db } from "..";
import { and, asc, desc, eq, SQL, sql } from "drizzle-orm";
import z, { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { commentTables } from "../schema/comment";
import { users } from "../schema/user";
import { getLevelSettings } from "./level";
import { getUserBalance } from "./user-balance";
import { PostCategory, postTables } from "../schema/posts";
import { UserCommentData } from "@/types";
import { commentLikeDislikeTables } from "../schema/comment-like-dislike";

interface FilterData  {
  category: PostCategory;
  postId: number;
  commentId?: number;
  level: number;
  sort?: "asc" | "desc";
  limit?: number;
}

function getLuckyPoints(luckyChance: number, luckyPoints: number): number {
  const roll = Math.random() * 100; 

  if (roll < luckyChance) {
    return luckyPoints;
  }
  return 0;
}

async function transactLuckyCommentPoints(
  userId: number, 
  luckyPoints: number, 
  referenceId: number, 
  referenceTable: string
) {
  try {

    const user = await db
      .select({
        group: users.group,
        balance: users.balance,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const { balance: userBalance, group } = user[0];

    const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
    const balanceLogs = balanceLogTables[userGroup];

    let prevBalance = userBalance || 0;
    const realBalanceLog = await getUserBalance(userId, userGroup);
    prevBalance = realBalanceLog.afterBalance;

    const gainedUserBalance = prevBalance + luckyPoints;    

    await db.transaction(async (tx) => {
        
      await tx.insert(balanceLogs).values({
        userId,
        type: "add",
        amount: luckyPoints,
        prevBalance,
        afterBalance: gainedUserBalance,
        note: "lucky",
        note2: "",
        note3: "",
        referenceTable,
        referenceId
      });


      await tx.update(users)
        .set({
          balance: gainedUserBalance,
        })
        .where(eq(users.id, userId));
    });

  } catch (error) {
    console.error("Error earning lucky points");
  }
}


export async function insertComment({payload, shouldRevalidate}: {payload: CommentData, shouldRevalidate?: boolean}) {

  try {
    const user = await getUserSession();
    if (!user) {
      return { ok: false, message: "You need to login first." } as const; 
    }
    console.log("INSERT COMMENT PAYLOAD", payload)
    const data = commentSchema.parse(payload);

    if (!data.categoryId || !data.postId || !data.level) return { ok: false, message: "Post details are required" } as const; 
    if (!data.content) return { ok: false, fieldErrors: { content: ["Content should not be empty"] }, message: "Comment failed." } as const; 

    const category = await getCategories({categoryId: data.categoryId, hasSession: !!user});

    if (!category[0]) {
      return { ok: false, message: "Category not available." } as const;
    }

    const { id: userId, exp: userExp, balance: userBalance, level, group } = user;
    const { 
      commentExp, 
      commentsPts, 
      allowedUserLevelComment, 
      value: categoryValue,
      luckyComment, 
      luckyPtsChance,
      luckyPts,
    } = category[0];

    let prevLevel = level ? parseInt(level) : 1;
    let prevExp = userExp || 0;
    let prevBalance = userBalance || 0;

    const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
    const expLogs = expLogTables[userGroup];
    const comments = commentTables[categoryValue];
    const balanceLogs = balanceLogTables[userGroup];
    const postTable = postTables[categoryValue];

    const realExpLevelLog  = await getUserExpLevel(userId, userGroup);

    prevExp = realExpLevelLog.userExp;
    prevLevel = realExpLevelLog.userLevel;

    if (prevLevel < allowedUserLevelComment) {
      return { ok: false, message: "Level requirement to comment for this post is not met" } as const;
    } 

    const levels = await getLevelSettings(prevLevel);

    const { totalExp: requiredExpToLevelUp } = levels[0];
    
    const realBalanceLog = await getUserBalance(userId, userGroup);

    prevBalance = realBalanceLog.afterBalance;

    const gainedUserExp = prevExp + (commentExp || 0);
    const gainedUserBalance = prevBalance + (commentsPts || 0);
    const isLevelup = gainedUserExp >= (requiredExpToLevelUp || 0);

    const afterLevel = isLevelup ? prevLevel + 1 : prevLevel;
    const awardedLuckyPoints = luckyComment === 1 ? getLuckyPoints(luckyPtsChance, luckyPts) : 0;
    const shouldAwardLuckyPoints = awardedLuckyPoints > 0;
    const isEarnBalanceEnabled = commentsPts !== 0;

    console.log({
      prevExp,
      prevBalance,
      prevLevel,
      commentExp,
      commentsPts,
      allowedUserLevelComment,
      gainedUserExp,
      gainedUserBalance,
      requiredExpToLevelUp,
      isLevelup,
      afterLevel,
      luckyComment,
      luckyPtsChance,
      luckyPts,
      awardedLuckyPoints,
      shouldAwardLuckyPoints,
      isEarnBalanceEnabled
    });

    const referenceTable = `T_COMMENT_${categoryValue.toUpperCase()}`;
    // let referenceId: number;

    const referenceId = await db.transaction(async (tx) => {
    
      const commentInsert = await tx.insert(comments).values({
        userId,
        postId: data.postId,
        commentId: data.commentId,
        content: data.content,
        level: data.level,
      }).$returningId();

      const returningId = commentInsert[0].id;

      if (data.commentId) {
        await tx.update(comments)
        .set({
          replyCount: sql`COALESCE(${comments.replyCount}, 0) + 1`,
        })
        .where(
          eq(comments.id, data.commentId)
        );
      }      

      await tx.update(postTable)
        .set({
          commentCount: sql`COALESCE(${postTable.commentCount}, 0) + 1`
        })
        .where(
          eq(postTable.id, Number(data.postId))
        );

      

      await tx.insert(expLogs).values({
        userId,
        type: "add",
        exp: commentExp,
        prevExp,
        afterExp: gainedUserExp,
        prevLevel,
        afterLevel,
        note: "comment",
        note2: "",
        note3: "",
        referenceTable,
        referenceId: returningId
      });

      if (isEarnBalanceEnabled) {
        await tx.insert(balanceLogs).values({
          userId,
          type: "add",
          amount: commentsPts,
          prevBalance,
          afterBalance: gainedUserBalance,
          note: "comment",
          note2: "",
          note3: "",
          referenceTable,
          referenceId: returningId
        });
      }

      await tx.update(users)
        .set({
          exp: gainedUserExp,
          balance: isEarnBalanceEnabled ? gainedUserBalance : 0,
          level: String(afterLevel),
        })
        .where(eq(users.id, userId));

        return returningId;
    });

    if (shouldAwardLuckyPoints && referenceId > 0) await transactLuckyCommentPoints(userId, luckyPts, referenceId, referenceTable);


    // if (shouldRevalidate) revalidatePath(`/posts/${categoryValue}/${data.postId}`);
    revalidatePath(`/posts/${categoryValue}/${data.postId}`);
    return { ok: true, message: `Comment submitted. ${shouldAwardLuckyPoints ? `Congrats! You've earned ${luckyPts} points!` : ""}` };
  } catch (e) {
    console.error("COMMENT ERROR", e);
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    if (e instanceof ZodError) {
      const fieldErrors = z.flattenError(e).fieldErrors;
      return { ok: false, fieldErrors, message: "Comment failed to save." } as const;
    }
    return { ok: false, message: "Something went wrong." };
  }
  
}

export async function getComments({category, postId, commentId, level, sort = "desc", limit}: FilterData): Promise<Omit<UserCommentData, "children">[]> {
  try {
    const comments = commentTables[category];
    const likeDislikeTable = commentLikeDislikeTables[category];
    const filters: SQL[] = [];
    const orders: SQL[] = [];

    const user = await getUserSession();
    const isLoggedIn = !!user;
  
    if (level) filters.push(eq(comments.level, level));
    if (commentId) filters.push(eq(comments.commentId, commentId));
    if (sort === "desc") orders.push(desc(comments.regDatetime));
    if (sort === "asc") orders.push(asc(comments.regDatetime));
  
    console.log("COMMENT FILTERS", {
      category,
      postId,
      commentId,
      level,
      sort,
      limit
    })

    let base  = db
      .select({
        id: comments.id,
        commentId: comments.commentId,
        content: comments.content,
        postId: comments.postId,
        level: comments.level,
        replyCount: comments.replyCount,
        regDatetime: comments.regDatetime,
        userId: users.id,
        like: comments.like,
        dislike: comments.dislike,
        username: users.username,
        name: users.name,
        ...(isLoggedIn ? { likeDislikeType: likeDislikeTable.type } : {})
      })
      .from(comments)
      .where(and(
        eq(comments.postId, String(postId)),
        ...filters
      ))
      .innerJoin(users, eq(users.id, comments.userId))
      .orderBy(...orders);

    let baseWithLimit = typeof limit === 'number' ? base.limit(limit) : base;  

    if (isLoggedIn) {
      baseWithLimit = baseWithLimit.leftJoin(
        likeDislikeTable,
        and(
          eq(likeDislikeTable.commentId, comments.id),
          eq(likeDislikeTable.userId, user!.id)
        )
      );
    }
    
    const res = await baseWithLimit;

    console.log("COMMENT RES", res)
    return res;
  } catch (error) {
    console.error("Error getting comments:", error);
    return [];
  }
}