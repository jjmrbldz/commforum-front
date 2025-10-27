import { AffiliateData } from "@/types";
import { z } from "zod";
// Example: non-negative currency with max 2 decimals
export const pointExchangesSchema = (affliate: AffiliateData) => z.object({
  amount: z.number().min(affliate.minExchangeAmount).max(affliate.maxExchangeAmount)
});
export type PointExchangeData = z.infer<typeof pointExchangesSchema>;
