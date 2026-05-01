import { createInsertSchema } from "drizzle-zod";
import { postTables } from "../schema/posts";
import z from "zod";
import { inquiryTables } from "../schema/inquiry";

const baseInquirySchema = createInsertSchema(inquiryTables.A, {
  content: (schema) => schema.min(1, "Content is required").trim(),
  attachment: () => z.string(),
});

export const inquirySchema = baseInquirySchema.omit({
  userId: true,
  // partnerId: true,
  regDatetime: true,
  userIsRead: true,
  partnerIsRead: true,
})

export type InquiryData = z.infer<typeof inquirySchema>;