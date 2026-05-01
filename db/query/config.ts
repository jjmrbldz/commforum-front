"use server"

import { db } from "..";
import { Config, config } from "../schema/config";

export default async function getConfig(): Promise<Config> {
  const result = await db.select().from(config).limit(1);
  return result[0];
}