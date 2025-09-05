import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { commentTables } from "../schema/comment";

const baseCommentSchema = createInsertSchema(commentTables.freeboard, {
  postId: (schema) => schema.min(1, "Missing comment post details").trim(),
  content: (schema) => schema.min(1, "Comment must not be empty").trim(),
  commentId: (schema) => schema.min(1, "Missing comment post details"),
  level: (schema) => schema.min(1, "Missing comment level."),
});

export const commentSchema = baseCommentSchema.extend({
  categoryId: z.number().min(1, "Missing comment post details"),
})

export type CommentData = z.infer<typeof commentSchema>;