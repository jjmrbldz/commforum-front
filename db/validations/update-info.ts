import { createInsertSchema } from "drizzle-zod";
import { users } from "../schema/user";
import z from "zod";

const baseUpdateInfo = createInsertSchema(users, {
  // username: (schema) => schema.min(3, "Username must be atleast 3 characters.").regex(/^[A-Za-z0-9_]+$/, { message: "영문자, 숫자, _ 만 입력 가능. 최소 3자 이상 입력하세요." }).toLowerCase().trim(),
  password: () => z.optional(z.string().min(6, "Password must be atleast 6 characters.").trim()).nullish(),
  name: () => z.string().min(1, "Name is required").trim(),
  nickname: (schema) => schema.min(1, "Nickname is required").trim(),
  email: () => z.optional(z.email({ error: "Invalid Email" }).toLowerCase().trim()).nullable(),
  phone: () => z.optional(z.string().regex(/^\d{11}$/, "Must be exactly 11 digits").trim().nullable()),
});

export const updateInfoSchema = baseUpdateInfo.extend({
  passwordConfirm: z.optional(z.string().min(1, "Confirm your password.").trim()).nullish(),
}).refine((v) => v.password === v.passwordConfirm, {
  error: "Passwords do not match",
  path: ["passwordConfirm"]
});

export type UserInfoData = z.infer<typeof updateInfoSchema>;