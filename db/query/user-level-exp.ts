"use server"

import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { ExpLogGroup, expLogTables } from "../schema/exp-log";

export async function getUserExpLevel(userId: number, group: string) {
  const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
  const expLogs = expLogTables[userGroup];
  
  const res = await db
    .select({
      afterExp: expLogs.afterExp,
      afterLevel: expLogs.afterLevel,
    })
    .from(expLogs)
    .where(eq(expLogs.userId, userId))
    .orderBy(desc(expLogs.regDatetime))
    .limit(1);

  return {
    userExp: res[0] ? (res[0].afterExp || 0) : 0,
    userLevel: res[0] ? (res[0].afterLevel || 0) : 1,
  }
}