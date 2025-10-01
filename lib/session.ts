import "server-only"

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from "./definitions";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { cookies, headers } from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginLogTables } from "@/db/schema/login-log";
import { getUserAgentInfo } from "./helpers/user-agent";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.error('Failed to verify session', error);
    return undefined;
  }
}

export async function createSession({ id, username, level, expiresAt, group }: SessionPayload) {
  const session = await encrypt({ id, username, level, expiresAt })
  // const ip = (await headers()).get("x-forwarded-for");
  const cookieStore = await cookies();

  const loginLogs = loginLogTables[group!];

  const uaInfo = await getUserAgentInfo();

  await db.transaction(async (tx) => {

    await tx
      .update(users)
      .set({
        token: session,
        lastLoginIp: uaInfo.ip,
        lastLogin: new Date()
      })
      .where(eq(users.id, id));

    await tx
      .insert(loginLogs)
      .values({
        userId: id,
        ip: uaInfo.ip,
        browser: uaInfo.browser,
        os: uaInfo.os,
        device: uaInfo.device,
        time: uaInfo.time,
        dayOfWeek: uaInfo.dayOfWeek,
        day: uaInfo.day,
        month: uaInfo.month,
        year: uaInfo.year
      })
  })
 

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: false, // ibalik sa true pag may SSL na hahah
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getUserSession() {
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    
    if (!token) {
      // if (!noRedirect) redirect('/login');
      return undefined;
    }
  
    const payload = await decrypt(token);
    if (!payload) {
      // if (!noRedirect) redirect('/login');
      return undefined;
    }
  
    const user = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
      phone: users.phone,
      level: users.level,
      group: users.group,
      balance: users.balance,
      status: users.status,
      name: users.name,
      nickname: users.nickname,
      point: users.point,
      exp: users.exp,
    }).from(users).where(eq(users.id, payload.id)).limit(1);
  
    if (!user[0]) {
      // revalidatePath('/');
      // if (!noRedirect) redirect('/login');
      return undefined;
    }
  
    return user[0] || undefined;
  } catch (error) {
    console.error(error);
    return undefined
  }

}

export async function requireUserSession() {
  const user = await getUserSession();
  if (!user) redirect("/login"); // throws on purpose; do not wrap
  return user;
}