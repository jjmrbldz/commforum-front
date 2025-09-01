"use server"

import { db } from "@/db";
import { balanceLogTables } from "@/db/schema/balance-log";
import { categories } from "@/db/schema/category";
import { ExpLogGroup, expLogTables } from "@/db/schema/exp-log";
import { levelSettings } from "@/db/schema/level";
import { postTables } from "@/db/schema/posts";
import { users } from "@/db/schema/user";
import { PostData, postSchema } from "@/db/validations/posts";
import { getUserSession } from "@/lib/session";
import { randomUUID } from "crypto";
import { and, desc, eq } from "drizzle-orm";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import z, { ZodError } from "zod";

const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDir() {
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Error creating upload directory:", err);
  }
}

export async function uploadImages(files: File[]) {
  
  try {
    const user = getUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }

    if (files.length === 0) {
      throw new Error("No files to upload");
    }

    await ensureUploadDir();

    const isMany = files.length > 1;

    const fileNames: string[] = [];

    for (const file of files) {
      const filePath = `${randomUUID()}-${Date.now()}.${file.type.split("/")[1]}`;
      const bytes = await file.arrayBuffer();
      await writeFile(path.join(process.cwd(), "public/uploads", filePath), Buffer.from(bytes));
      fileNames.push(filePath);
    }

    return {ok: true, fileNames, message: isMany ? "Files uploaded successfully" : "File uploaded successfully"};

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {ok: false, message: error.message}
    }
    return {ok: false, message: "Something went wrong."}
  }
}

export async function insertPost(payload: PostData) {
  try {
    const user = await getUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }
    // console.log("USER:", user);
    const data = postSchema.parse(payload);

    const category = await db
    .select()
    .from(categories)
    .where(
      and(
        eq(categories.id, parseInt(data.category)),
        eq(categories.status, 1),
      )
    )
    .limit(1);
    // console.log("CATEGORY:", category);
    if (!category[0]) {
      return { ok: false, fieldErrors: { category: ["Category not available"] }, message: "Category not available." } as const;
    }
    
    const { id: userId, exp: userExp, balance: userBalance, level, group } = user;
    const { postExp, postPts, allowedUserLevel, value: categoryValue } = category[0];

    let prevLevel = level ? parseInt(level) : 1;
    let prevExp = userExp || 0;
    let prevBalance = userBalance || 0;

    const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
    const expLogs = expLogTables[userGroup];
    const posts = postTables[categoryValue];
    const balanceLogs = balanceLogTables[userGroup];

    const realExpLevelLog = await db
      .select({
        afterExp: expLogs.afterExp,
        afterLevel: expLogs.afterLevel,
      })
      .from(expLogs)
      .where(eq(expLogs.userId, userId))
      .orderBy(desc(expLogs.regDatetime))
      .limit(1);

    if (realExpLevelLog[0]) {
      prevExp = realExpLevelLog[0].afterExp || 0;
      prevLevel = realExpLevelLog[0].afterLevel || 0;
    }

    if (prevLevel < allowedUserLevel) {
      return { ok: false, fieldErrors: { category: ["Level requirement for this category is not met"] }, message: "Level requirement for this category is not met." } as const;
    }    

    const levels = await db
    .select()
    .from(levelSettings)
    .where(eq(levelSettings.level, String(prevLevel + 1)))
    .limit(1);

    // console.log("LEVEL:", levels);

    const { totalExp: requiredExpToLevelUp } = levels[0];

    const realBalanceLog = await db
      .select({afterBalance: balanceLogs.afterBalance})
      .from(balanceLogs)
      .where(eq(balanceLogs.userId, userId))
      .orderBy(desc(balanceLogs.regDatetime))
      .limit(1);
    
    if (realBalanceLog[0]) prevBalance = realBalanceLog[0].afterBalance || 0;

    const gainedUserExp = prevExp + (postExp || 0);
    const gainedUserBalance = prevBalance + (postPts || 0);
    const isLevelup = gainedUserExp >= (requiredExpToLevelUp || 0);

    // console.log({
    //   prevExp,
    //   prevBalance,
    //   prevLevel,
    //   postExp,
    //   postPts,
    //   allowedUserLevel,
    //   gainedUserExp,
    //   gainedUserBalance,
    //   requiredExpToLevelUp,
    //   isLevelup
    // });

    const afterLevel = isLevelup ? prevLevel + 1 : prevLevel

    await db.transaction(async (tx) => {

      const postInsert = await tx.insert(posts).values({
        userId,
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail || null,
        media: data.media || null,
      }).$returningId();

      // console.log("POST INSERT:", postInsert);

      const referenceTable = `T_POST_${categoryValue.toUpperCase()}`;
      const referenceId = postInsert[0].id;

      await tx.insert(expLogs).values({
        userId,
        type: "add",
        exp: postExp,
        prevExp,
        afterExp: gainedUserExp,
        prevLevel,
        afterLevel,
        note: "post",
        note2: "",
        note3: "",
        referenceTable,
        referenceId
      });

      await tx.insert(balanceLogs).values({
        userId,
        type: "add",
        amount: postPts,
        prevBalance,
        afterBalance: gainedUserBalance,
        note: "post",
        note2: "",
        note3: "",
        referenceTable,
        referenceId
      });

      await tx.update(users)
        .set({
          exp: gainedUserExp,
          balance: gainedUserBalance,
          level: String(afterLevel),
        })
        .where(eq(users.id, userId));
    });

    revalidatePath("/profile/posts");
    return { ok: true, message: "Post created successfully." };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    if (e instanceof ZodError) {
      const fieldErrors = z.flattenError(e).fieldErrors;
      return { ok: false, fieldErrors, message: "Post failed to save." } as const;
    }
    return { ok: false, message: "Something went wrong." };
  }
}