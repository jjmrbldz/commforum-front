"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { levelSettings } from "../schema/level";

export async function getLevelSettings(prevLevel: number) {
  return await db
        .select()
        .from(levelSettings)
        .where(eq(levelSettings.level, String(prevLevel + 1)))
        .limit(1);
}