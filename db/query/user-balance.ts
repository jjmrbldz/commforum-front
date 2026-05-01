"use server"

import { desc, eq, sql } from "drizzle-orm";
import { db } from "..";
import { balanceLogTables } from "../schema/balance-log";
import { ExpLogGroup } from "../schema/exp-log";
import { users } from "../schema/user";

export async function getUserBalance(userId: number, group: string) {
  const userGroup = (group?.toUpperCase() || "A") as ExpLogGroup;
  const balanceLogs = balanceLogTables[userGroup];

  const res =  await db
    .select({afterBalance: balanceLogs.afterBalance})
    .from(balanceLogs)
    .where(eq(balanceLogs.userId, userId))
    .orderBy(desc(balanceLogs.regDatetime))
    .limit(1);

    return {
      afterBalance: res[0] ? (res[0].afterBalance || 0) : 0
    }
}

export async function getAllUserBalance() {
  return await db
    .select({
      points: sql<number>`COALESCE(${users.balance}, 0)`.as("points"),
      name: users.username
    })
    .from(users)
    .orderBy(desc(users.balance))
    .limit(20);
}