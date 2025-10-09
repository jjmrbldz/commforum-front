"use server"

import { db } from "@/db";
import getConfig from "@/db/query/config";
import { getUserBalance } from "@/db/query/user-balance";
import { getUserPoint } from "@/db/query/user-point";
import { balanceLogTables } from "@/db/schema/balance-log";
import { ExpLogGroup } from "@/db/schema/exp-log";
import { inquiryTables, UserInquiry } from "@/db/schema/inquiry";
import { pointLogTables } from "@/db/schema/point-log";
import { users } from "@/db/schema/user";
import { InquiryData, inquirySchema } from "@/db/validations/inquiy";
import { requireUserSession } from "@/lib/session";
import { ServerActionResponse } from "@/types";
import { desc, eq, getTableName } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z, { ZodError } from "zod";

export async function insertInquiry(payload: InquiryData) {

  try {
    console.log("INSERT INIQUIRY PAYLOAD", payload)
    const user = await requireUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const data = inquirySchema.parse(payload);

    const config = await getConfig();

    if (config?.inquiryOnOff === 0) return { ok: false, message: "Inquiry is not available as of the moment." };

    const { id: userId, group, balance: userBalance, point: userPoint } = user;
    let prevBalance = userBalance || 0;
    let prevPoint = userPoint || 0;

    const userGroup = (group?.toUpperCase()) as ExpLogGroup;
    const inquiries = inquiryTables[userGroup];

    const balanceLogs = balanceLogTables[userGroup];
    const pointLogs = pointLogTables[userGroup];

    const realBalanceLog = await getUserBalance(userId, userGroup);
    const realPointLog = await getUserPoint(userId, userGroup);

    prevBalance = realBalanceLog?.afterBalance || prevBalance;
    prevPoint = realPointLog?.afterBalance || prevPoint;

    const deductedUserBalance = prevBalance - (config?.inquiryBalanceDeductions || 0);
    const deductedUserPoint = prevPoint - (config?.inquiryPointDeductions || 0);

    await db.transaction(async (tx) => {
      
      const inquiryInsert = await tx.insert(inquiries).values({
        userId,
        content: data.content,
        attachment: data.attachment || "",
        partnerId: data.partnerId,
        regDatetime: new Date(),
        userLastReadDatetime: new Date(),
        userIsRead: 1,
        sender: "user"
      }).$returningId();

      const returningId = inquiryInsert[0].id;

      if (config?.inquiryBalanceDeductions > 0) {
        await tx.insert(balanceLogs).values({
          userId,
          type: "deduct",
          amount: -Math.abs(config?.inquiryBalanceDeductions),
          prevBalance,
          afterBalance: deductedUserBalance,
          note: "inquiry",
          note2: "",
          note3: "",
          referenceTable: getTableName(inquiries),
          referenceId: returningId
        });

        await tx.update(users)
          .set({
            balance: deductedUserBalance,
          })
          .where(eq(users.id, userId));
      }

      if (config?.inquiryPointDeductions > 0) {
        await tx.insert(pointLogs).values({
          userId,
          type: "deduct",
          amount: -Math.abs(config?.inquiryPointDeductions),
          prevBalance: prevPoint,
          afterBalance: deductedUserPoint,
          note: "inquiry",
          note2: "",
          note3: "",
          referenceTable: getTableName(inquiries),
          referenceId: returningId
        });

        await tx.update(users)
          .set({
            point: deductedUserPoint,
          })
          .where(eq(users.id, userId));
      }
    });

    revalidatePath("/inquiry");
    return { ok: true, message: "Inquiry submitted." };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { ok: false, message: e.message };
    }
    if (e instanceof ZodError) {
      const fieldErrors = z.flattenError(e).fieldErrors;
      return { ok: false, fieldErrors, message: "Inquiry failed to submit" } as const;
    }
    return { ok: false, message: "Something went wrong." };
  }
}

export async function getInquiries(): ServerActionResponse<UserInquiry<"A">[]> {
  try {
    const user = await requireUserSession();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { id: userId, group } = user;
    const userGroup = (group?.toUpperCase()) as ExpLogGroup;
    const inquiries = inquiryTables[userGroup];

    const result = await db.select()
      .from(inquiries)
      .where(eq(inquiries.userId, userId))
      .orderBy(desc(inquiries.id))
      .limit(100);

    if (result.length === 0) return { ok: true, data: result, message: "No inquiries found." };

    return { 
      ok: true, 
      data: result.reverse(),
      message: "Inquiries retreived." 
    };

  } catch (error: any) {
    console.error(error)
    return { ok: false, message: error?.message || "Something went wrong" };
  }
}