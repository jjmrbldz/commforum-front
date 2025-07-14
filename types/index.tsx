import { loginFormSchema } from "@/lib/schema/form";
import z from "zod";

export type LoginFormSchema = z.infer<typeof loginFormSchema>;