import { AffiliateData } from "@/types";
import { z } from "zod";

export const pointExchangesSchema = (affliate: AffiliateData) => z.object({
  amount: z.number().min(affliate.minimumAmount).max(affliate.maximumAmount)
});
export type PointExchangeData = z.infer<typeof pointExchangesSchema>;
