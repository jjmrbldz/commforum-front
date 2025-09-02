"use server"

import { and, asc, eq, inArray, SQL } from "drizzle-orm";
import { db } from "..";
import { categories, CategoryRow } from "../schema/category";

interface FilterData  {
  categoryId?: number;
  hasSession?: boolean;
}

export default async function getCategories({categoryId, hasSession}: FilterData = {}): Promise<CategoryRow[]> {
  const filters: SQL[] = [];

  if (categoryId) filters.push(eq(categories.id, categoryId));

  if (hasSession) {
    filters.push(inArray(categories.visibility, ["public", "private"]));
  } else {
    filters.push(eq(categories.visibility, "public"));
  }

  return await db
  .select()
  .from(categories)
  .where(
    and(
      eq(categories.status, 1),
      ...filters
    )
  )
  .orderBy(asc(categories.orderBy));
}