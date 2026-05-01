import z from "zod";

export const loginSchema = z.object({
  username: z.string({error: "Username is required"}).min(3, {error: "Username must be at least 3 characters."}),
  password: z.string({error: "Password is required"}).min(6, {error: "Password must be at least 6 characters."}),
  isKeepSignedIn: z.boolean().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;