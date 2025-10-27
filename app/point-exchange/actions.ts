"use server"

import { db } from "@/db";
import { users } from "@/db/schema/user";
import { withdrawalLogs } from "@/db/schema/withdrawal-log";
import { getUserSession, requireUserSession } from "@/lib/session"
import { PointExchangeHistory, ServerActionResponse } from "@/types";
import { count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z, { ZodError } from "zod";

interface FilterData {
  page?: string;
  limit?: string;
}

export async function exchangePoint(payload: {amount: number; affiliateId: number;}) {
  try {
    const user = await requireUserSession();
    if (!user) {
      return { ok: false, message: "You need to login first." } as const; 
    }
    const { id: userId } = user;
    console.log("exchange point", payload);
    await db.transaction(async (tx) => {
      await tx.insert(withdrawalLogs)
        .values({
          userId,
          amount: payload.amount,
          type: "Bank",
          note: "Bank name",
          note1: "Pending",
        });
    });

    revalidatePath("/point-exchange");
    return { ok: true, message: `Point exchange application success.` };
  } catch (error) {
    console.error("LIKE DISLIKE ERROR", error);
    if (error instanceof ZodError) {
      const fieldErrors = z.flattenError(error).fieldErrors;
      return { ok: false, fieldErrors, message: "Updates failed to save." } as const;
    }
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: "Something went wrong" };
  }
}

export async function getUserWithdrawalLogs({page, limit}: FilterData): ServerActionResponse<PointExchangeHistory[]> {
  try {
    const user = await getUserSession();
    if (!user) {
      return { ok: false, message: "로그인 후 이용해주세요" } as const; 
    }

    const result = await db
      .select({
        id: withdrawalLogs.id,
        username: users.username,
        amount: withdrawalLogs.amount,
        status: withdrawalLogs.status,
        regDatetime: withdrawalLogs.regDatetime
      })
      .from(withdrawalLogs)
      .leftJoin(users, eq(users.id, user.id))
      .where(eq(withdrawalLogs.userId, user.id))
      .orderBy(desc(withdrawalLogs.id))
      .limit(Number(limit))
      .offset((Number(page) - 1) * Number(limit));

    const countRows = await db
      .select({ count: count() })
      .from(withdrawalLogs)
      .leftJoin(users, eq(users.id, user.id));

    const totalItems = countRows[0].count;
    const totalPages = Math.max(1, Math.ceil(totalItems / Number(limit)));
    
    return {
      ok: true,
      data: result,
      totalItems,
      totalPages,
      message: "Exchange history retrieved."
    }
  } catch (error) {
    console.error(error)
    return { ok: false, message: "Something went wrong" };
  }
}