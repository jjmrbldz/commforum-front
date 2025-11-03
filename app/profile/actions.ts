"use server"

import { db } from "@/db";
import getCategories from "@/db/query/categories";
import { getLevelSettings } from "@/db/query/level";
import { getUserExpLevel } from "@/db/query/user-level-exp";
import { balanceLogTables } from "@/db/schema/balance-log";
import { ExpLogGroup, expLogTables } from "@/db/schema/exp-log";
import { postTables } from "@/db/schema/posts";
import { users } from "@/db/schema/user";
import { PostData, postSchema } from "@/db/validations/posts";
import { updateInfoSchema, UserInfoData } from "@/db/validations/update-info";
import { requireUserSession } from "@/lib/session";
import { randomUUID } from "crypto";
import { and, desc, eq } from "drizzle-orm";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import z, { ZodError } from "zod";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function updateInfoAction(payload: UserInfoData) {
  
  try {
    const user = await requireUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const data = updateInfoSchema.parse({...payload, username: user.username});

    const {name, nickname, email, phone, bankName, accountNumber}  = data;

    let newPassword = "";

    if (data.password) {
      newPassword = await bcrypt.hash(data.password, 12);
    }

    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          name,
          nickname,
          email,
          phone,          
          bankName,          
          accountNumber,          
          ...(payload.password ? {password: newPassword} : {}),          
        })
        .where(eq(users.id, user.id));
    })

    return { ok: true, message: "Successfully updated." } as const;
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      const fieldErrors = z.flattenError(e).fieldErrors;
      return { ok: false, fieldErrors, message: "Updates failed to save." } as const;
    }
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: "Something went wrong." };
  }
}

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
    const user = requireUserSession();
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
    return {ok: false, message: "Something went wrong while uploading your image"}
  }
}

export async function insertPost(payload: PostData) {
  try {
    const user = await requireUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const data = postSchema.parse(payload);


    const category = await getCategories({categoryId: parseInt(data.categoryId), hasSession: !!user});
    
    if (!category[0]) {
      return { ok: false, fieldErrors: { category: ["Category not available"] }, message: "Category not available." } as const;
    }
    
    const { id: userId, exp: userExp, balance: userBalance, level, group } = user;
    const { postExp, postPts, allowedUserLevel, value: categoryValue } = category[0];

    let prevLevel = level ? level : 1;
    let prevExp = userExp || 0;
    let prevBalance = userBalance || 0;

    const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
    const expLogs = expLogTables[userGroup];
    const posts = postTables[categoryValue];
    const balanceLogs = balanceLogTables[userGroup];

    // const realExpLevelLog = await db
    //   .select({
    //     afterExp: expLogs.afterExp,
    //     afterLevel: expLogs.afterLevel,
    //   })
    //   .from(expLogs)
    //   .where(eq(expLogs.userId, userId))
    //   .orderBy(desc(expLogs.regDatetime))
    //   .limit(1);

    const realExpLevelLog  = await getUserExpLevel(userId, userGroup);

    prevExp = realExpLevelLog.userExp;
    prevLevel = realExpLevelLog.userLevel;

    if (prevLevel < allowedUserLevel) {
      return { ok: false, fieldErrors: { category: ["Level requirement for this category is not met"] }, message: "Level requirement for this category is not met." } as const;
    }    

    const levels = await getLevelSettings(prevLevel);
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

    const afterLevel = isLevelup ? prevLevel + 1 : prevLevel

    await db.transaction(async (tx) => {

      const postInsert = await tx.insert(posts).values({
        userId,
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail || null,
        media: data.media || null,
        categoryId: parseInt(data.categoryId),
        regDatetime: data.schedule || undefined,
        field1: data.startDate ? dayjs(data.startDate).format("YYYY-MM-DD HH:mm:ss") : undefined,
        field2: data.endDate ? dayjs(data.endDate).format("YYYY-MM-DD HH:mm:ss") : undefined,
      }).$returningId();

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
          level: afterLevel,
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

export async function updatePost(payload: PostData) {
  try {
    const user = await requireUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const data = postSchema.parse(payload);

    if (!data.id) return { ok: false, message: "Post ID is required." } as const;

    const category = await getCategories({categoryId: parseInt(data.categoryId), hasSession: !!user});
    
    if (!category[0]) {
      return { ok: false, fieldErrors: { category: ["Category not available"] }, message: "Category not available." } as const;
    }
    
    const { id: userId } = user;
    const { value: categoryValue, id: categoryId } = category[0];

    const posts = postTables[categoryValue];

    await db.transaction(async (tx) => {

      const postUpdate = await tx.update(posts).set({
        userId,
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail || null,
        ...(data.thumbnail ? {thumbnail: data.thumbnail} : {}),
        ...(data.media ? {media: data.media} : {}),
        categoryId: parseInt(data.categoryId),
        updateDatetime: new Date(),
      })
      .where(and(
        eq(posts.id, data.id || 0),
        eq(posts.categoryId, categoryId),
        eq(posts.userId, userId),
      ));
    });

    revalidatePath("/profile/posts/edit");
    return { ok: true, message: "Post updated successfully." };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    if (e instanceof ZodError) {
      const fieldErrors = z.flattenError(e).fieldErrors;
      return { ok: false, fieldErrors, message: "Update failed to save." } as const;
    }
    return { ok: false, message: "Something went wrong." };
  }
}
