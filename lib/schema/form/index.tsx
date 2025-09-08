import { z } from "zod"

export const loginFormSchema = z.object({
  username: z.string().min(2, {
    error: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters.",
  }),
  isKeepSigednIn: z.boolean(),
})

export const searchFormSchema = z.object({
  type: z.string().min(2, {
    error: "Type is required",
  }),
  category: z.string().min(1, {
    error: "Category is required",
  }),
  // searchOperator: z.string().min(2, {
  //   error: "AND OR is required",
  // }),
  term: z.string(),
})