"use server"

import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { balanceLogTables } from "../schema/balance-log";
import { ExpLogGroup } from "../schema/exp-log";

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