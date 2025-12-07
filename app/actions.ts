"use server"

import { db } from "@/db";
import { users } from "@/db/schema/user";
import { LoginData, loginSchema } from "@/db/validations/login";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession, getCookieData, getUserSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z, { ZodError } from "zod";
import { LoginFormState } from "@/types";
import getCategories from "@/db/query/categories";
import getConfig from "@/db/query/config";
import { getAllPosts, getPostsByCategory } from "@/db/query/posts";
import { getAllComments } from "@/db/query/comment";
import { getAllUserBalance } from "@/db/query/user-balance";
import { Groups } from "@/db/schema/user-group";
import { getUserAgentInfo } from "@/lib/helpers/user-agent";

export async function getSiteData() {
  try {
    const user = await getUserSession();
    const categories = await getCategories({hasSession: !!user});
    const config = await getConfig();
    const recentPosts = await getAllPosts({
      orderBy: "date",
      sortBy: "desc",
      page: "1",
      limit: "20",
    })
    const recentComments = await getAllComments({
      orderBy: "date",
      sortBy: "desc",
      page: "1",
      limit: "20",
    })

    const topUserBalance = await getAllUserBalance();

    const bestPosts = await getAllPosts({
      orderBy: "likes",
      sortBy: "desc",
      page: "1",
      limit: "20",
    });

    const noticePosts = await getPostsByCategory({
      category: "announcements",
      page: "1",
      limit: "20",
    });

    const youtubePosts = await getAllPosts({
      type: "content",
      term: "youtube",
      orderBy: "date",
      sortBy: "desc",
      page: "1",
      limit: "20",
    });

    return { 
      categories, 
      config, 
      user, 
      recentPosts: recentPosts.ok ?
       recentPosts.data
       .map((item, index) => ({...item, index})) : 
       [],
      bestPosts: bestPosts.ok ?
       bestPosts.data
       .map((item, index) => ({...item, index})) : 
       [],
      noticePosts: noticePosts.ok ?
       noticePosts.data
       .map((item, index) => ({...item, index})) : 
       [],
      youtubePosts: youtubePosts.ok ?
       youtubePosts.data
       .map((item, index) => ({...item, index})) : 
       [],
      recentComments: recentComments.ok ?
       recentComments.data
       .map((item, index) => ({...item, index})) : 
       [],
      topUserBalance: topUserBalance ?
       topUserBalance
       .map((item, index) => ({...item, rank: index + 1})) : 
       [],
       
    };
  } catch (error) {
    console.error("Error fetching site data:", error);
    return undefined;
  }
}

export async function loginAction(payload: LoginData): Promise<LoginFormState> {
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

    if (user[0].status !== 1) {
      return { ok: false, message: "You account is inactive." } as const;
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const group = user[0].group as Groups;

    await createSession({
      id: user[0].id,
      username: user[0].username,
      level: user[0].level ?? 1,
      expiresAt,
      group,
      minBet: user[0].minBetMinigame || -1,
      maxBet: user[0].maxBetMinigame || -1,
      minBetTournament: user[0].minBetTournament || -1,
      maxBetTournament: user[0].minBetTournament || -1,
    });

    revalidatePath("/");
    return { ok: true, message: "Successfully logged in." } as const;
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      // const fieldErrors = e.issues;
      const fieldErrors = z.flattenError(e).fieldErrors;
      return { ok: false, fieldErrors, message: "Login failed." } as const;
    }
    return { ok: false, message: "Login failed." } as const;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  // revalidatePath('/');
  // redirect('/');
}

export async function getHomePosts() {
  try {
    const casinoReviewBoardPosts = await getPostsByCategory({
      category: "casino",
      page: "1",
      limit: "10",
    });
    const slotreviewBoardPosts = await getPostsByCategory({
      category: "slot",
      page: "1",
      limit: "10",
    });
    const freeBoardPosts = await getPostsByCategory({
      category: "freeboard",
      page: "1",
      limit: "10",
    });
    const tazzaEventPosts = await getPostsByCategory({
      category: "eventtazza",
      page: "1",
      limit: "10",
    });
    const noticePosts = await getPostsByCategory({
      category: "announcements",
      page: "1",
      limit: "10",
    });

    return { 
      ok: true, data: 
      [
        ...(casinoReviewBoardPosts?.data ? casinoReviewBoardPosts?.data : []),
        ...(slotreviewBoardPosts?.data ? slotreviewBoardPosts?.data : []),
        ...(freeBoardPosts?.data ? freeBoardPosts?.data : []),
        ...(tazzaEventPosts?.data ? tazzaEventPosts?.data : []),
        ...(noticePosts?.data ? noticePosts?.data : []),
      ]
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      data: []
    }
  }
}