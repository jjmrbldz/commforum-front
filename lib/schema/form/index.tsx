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
  searchType: z.string().min(2, {
    error: "Type is required",
  }),
  searchOperator: z.string().min(2, {
    error: "AND OR is required",
  }),
  searchTerm: z.string().min(2, {
    error: "검색어는 두글자 이상 입력하십시오.",
  }),
})