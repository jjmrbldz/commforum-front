import "server-only"

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from "./definitions";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { cookies, headers } from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

export async function createSession({ id, username, level, expiresAt }: SessionPayload) {
  const session = await encrypt({ id, username, level, expiresAt })
  const ip = (await headers()).get("x-forwarded-for");
  const cookieStore = await cookies();
 
  await db
    .update(users)
    .set({
      token: session,
      lastLoginIp: ip,
      lastLogin: new Date().toISOString()
    })
    .where(eq(users.id, id));

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: false, // ibalik sa true pag may SSL na hahah
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getUserSession(noRedirect = true) {
  const cookieStore = await cookies();
  try {
    
    const token = cookieStore.get('session')?.value;
  
    if (!token) {
      if (!noRedirect) redirect('/');
      return undefined;
    }
  
    const payload = await decrypt(token);
    if (!payload) {
      if (!noRedirect) redirect('/');
      return undefined;
    }
  
    const user = await db.select({
      id: users.id,
      username: users.username,
      email: users.email,
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
      revalidatePath('/');
      if (!noRedirect) redirect('/');
      return undefined;
    }

    return user[0];
  } catch (error) {
    console.error('Error getting user session', error);
    if (!noRedirect) redirect('/');
    return undefined;
  }
}