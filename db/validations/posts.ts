import { createInsertSchema } from "drizzle-zod";
import { postTables } from "../schema/posts";
import z from "zod";

const basePostSchema = createInsertSchema(postTables.freeboard, {
  title: (schema) => schema.min(1, "Title is required").trim(),
  content: (schema) => schema.min(1, "Content is required").trim(),
  thumbnail: () => z.string().optional(),
  media: () => z.string().optional(),
});

export const postSchema = basePostSchema.extend({
  category: z.string().min(1, "Category is required"),
});

export type PostData = z.infer<typeof postSchema>;