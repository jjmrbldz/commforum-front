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