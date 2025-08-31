"use server"

import { db } from "..";
import { categories, CategoryRow } from "../schema/category";

export default async function getCategories(): Promise<CategoryRow[]> {
  return await db.select().from(categories);
}