"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { levelSettings } from "../schema/level";

export async function getLevelSettings(prevLevel: number) {
  const result = await db
        .select()
        .from(levelSettings)
        .where(eq(levelSettings.level, String(prevLevel + 1)))
        .limit(1);

  return result?.[0] ? result : [{id: 0, level: 0, totalExp: Infinity}]
}