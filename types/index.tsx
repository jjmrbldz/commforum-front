import { loginFormSchema, searchFormSchema } from "@/lib/schema/form";
import z from "zod";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type SearchFormSchema = z.infer<typeof searchFormSchema>;