import { CategoryRow } from "@/db/schema/category";
import { Config } from "@/db/schema/config";
import { create } from "zustand";

export interface SiteDataState {
  siteData?: {
    categories?: CategoryRow[];
    config?: Config
  };
  setSiteData: (val?: { categories?: CategoryRow[]; config?: Config }) => void;
}

export const useSiteDataStore = create<SiteDataState>((set) => ({
  siteData: undefined,
  setSiteData: (val) => set({ siteData: val}),
}));
