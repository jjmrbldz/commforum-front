"use server"

import { db } from "@/db";
import { users } from "@/db/schema/user";
import { LoginData, loginSchema } from "@/db/validations/login";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z, { ZodError } from "zod";
import { LoginFormState } from "@/types";

export default async function loginAction(payload: LoginData): Promise<LoginFormState> {
  try {

    const data = loginSchema.parse(payload);

    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, data.username))
      .limit(1);

    if (!user[0]) {
      return { ok: false, fieldErrors: { username: ["Username incorrect"] }, message: "Login failed." } as const;
    }

    const isValid = await bcrypt.compare(data.password, user[0]?.password);
    if (!isValid) {
      return { ok: false, fieldErrors: { password: ["Password incorrect"] }, message: "Login failed." } as const;
    }

    if (user[0].status !== "1") {
      return { ok: false, message: "You account is inactive." } as const;
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await createSession({
      id: user[0].id,
      username: user[0].username,
      level: user[0].level ?? "1",
      expiresAt
    });

    revalidatePath("/");
    return { ok: true, message: "Successfully logged in." } as const;
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      // const fieldErrors = e.issues;
      const fieldErrors = z.flattenError(e).fieldErrors;
      console.log("Field errors", fieldErrors);
      return { ok: false, fieldErrors, message: "Login failed." } as const;
    }
    return { ok: false, message: "Login failed." } as const;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  revalidatePath('/');
  // redirect('/');
}