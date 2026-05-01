"use server"

import { desc, eq, sql } from "drizzle-orm";
import { db } from "..";
import { pointLogTables } from "../schema/point-log";
import { ExpLogGroup } from "../schema/exp-log";
import { users } from "../schema/user";

export async function getUserPoint(userId: number, group: string) {
  const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
  const pointLogs = pointLogTables[userGroup];

  const res =  await db
    .select({afterBalance: pointLogs.afterBalance})
    .from(pointLogs)
    .where(eq(pointLogs.userId, userId))
    .orderBy(desc(pointLogs.regDatetime))
    .limit(1);

    return {
      afterBalance: res[0] ? (res[0].afterBalance || 0) : 0
    }
}

export async function getAllUserPoint() {
  return await db
    .select({
      points: sql<number>`COALESCE(${users.balance}, 0)`.as("points"),
      name: users.username
    })
    .from(users)
    .orderBy(desc(users.balance))
    .limit(20);
}