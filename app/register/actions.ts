"use server"

import { db } from "@/db";
import getConfig from "@/db/query/config"
import { users } from "@/db/schema/user";
import { RegisterData, registerSchema } from "@/db/validations/register";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { headers } from "next/headers";
import { MySQLError } from "@/types";

export default async function registerAction(payload: RegisterData) {
  try {
    const { defaultSignupLevel, userGroup } = await getConfig();

    if (!userGroup) return {ok: false, message: "No group found"};

    const splitUserGroup = userGroup.split(",");
    const randUserGroup = splitUserGroup[Math.floor(Math.random() * userGroup.length)];

    const data = registerSchema.parse(payload);    
    
    const existing = await db.select({ id: users.id })
    .from(users)
    .where(eq(users.username, data.username))
    .limit(1);
    
    if (existing.length > 0) {
      return { ok: false, fieldErrors: { username: "Username is taken" }, message: "Register failed." } as const;
    }

    const ip = (await headers()).get("x-forwarded-for");
    const hashed = await bcrypt.hash(data.password, 12);    

    await db.transaction(async (tx) => {
      await tx.insert(users).values({
        username: data.username,
        password: hashed,
        email: data.email ?? null,
        name: data.name ?? null,
        nickname: data.nickname ?? null,
        phone: data.phone ?? null,
        referralUsername: data.referralUsername ?? null,
        emailOptin: data.emailOptin,
        level: String(defaultSignupLevel),
        status: "1",
        regDatetime: new Date().toISOString(),
        regIp: ip,
        group: randUserGroup,
      });
    });

    return { ok: true, message: "Successfully registered." } as const;

  } catch (e) {
    const err = e as MySQLError;
    if (err?.code === "ER_DUP_ENTRY") {
      return { ok: false, fieldErrors: { username: "Username is taken" }, message: err?.sqlMessage || err?.message } as const;
    }
    console.error(e);
    return { ok: false, message: err?.sqlMessage || err?.message || "Something went wrong, please try again later." } as const;
  }
}