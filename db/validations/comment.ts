import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { commentTables } from "../schema/comment";

export const commentSchema = createInsertSchema(commentTables.freeboard, {
  postId: (schema) => schema.min(1, "Missing comment post details").trim(),
  content: (schema) => schema.min(1, "Comment must not be empty").trim(),
  categoryId: (schema) => schema.min(1, "Missing comment post details"),
  level: (schema) => schema.min(1, "Missing comment level."),
});

export type CommentData = z.infer<typeof commentSchema>;