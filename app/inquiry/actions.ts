"use server"

import { db } from "@/db";
import { ExpLogGroup } from "@/db/schema/exp-log";
import { inquiryTables, UserInquiry } from "@/db/schema/inquiry";
import { InquiryData, inquirySchema } from "@/db/validations/inquiy";
import { requireUserSession } from "@/lib/session";
import { ServerActionResponse } from "@/types";
import { desc, eq } from "drizzle-orm";
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

    const { id: userId, group } = user;
    const userGroup = (group?.toUpperCase()) as ExpLogGroup;
    const inquiries = inquiryTables[userGroup];

    await db.transaction(async (tx) => {
      await tx.insert(inquiries).values({
        userId,
        content: data.content,
        attachment: data.attachment || "",
        partnerId: data.partnerId,
        regDatetime: new Date(),
        userLastReadDatetime: new Date(),
        userIsRead: 1,
        sender: "user"
      });
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
      data: result,
      message: "Inquiries retreived." 
    };

  } catch (error: any) {
    console.error(error)
    return { ok: false, message: error?.message || "Something went wrong" };
  }
}