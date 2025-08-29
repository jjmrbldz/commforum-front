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
    console.log('Failed to verify session', error);
    return undefined;
  }
}

export async function createSession({ id, username, level, expiresAt }: SessionPayload) {
 
  const session = await encrypt({ id, username, level, expiresAt })
  const ip = (await headers()).get("x-forwarded-for");
  await db
    .update(users)
    .set({
      token: session,
      lastLoginIp: ip,
      lastLogin: new Date().toISOString()
    })
    .where(eq(users.id, id));

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getUserSession() {
  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
  
    if (!token) return undefined;
  
    const payload = await decrypt(token);
    if (!payload) return redirect('/');
  
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
      redirect('/');
    }

    return user[0];
  } catch (error) {
    console.log('Error getting user session', error);
    return undefined;
  }
}