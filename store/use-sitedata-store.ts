import { CategoryRow } from "@/db/schema/category";
import { Config } from "@/db/schema/config";
import { PostData, TopUserPointsData, UserCommentData } from "@/types";
import { create } from "zustand";

export interface SiteDataState {
  siteData?: {
    categories?: CategoryRow[];
    config?: Config,
    recentPosts?: PostData[];
    bestPosts?: PostData[];
    noticePosts?: PostData[];
    recentComments?: UserCommentData[];
    topUserBalance?: TopUserPointsData[];
  };
  setSiteData: (val?: { 
    categories?: CategoryRow[]; 
    config?: Config;
    recentPosts?: PostData[];
    bestPosts?: PostData[];
    noticePosts?: PostData[];
    recentComments?: UserCommentData[];
    topUserBalance?: TopUserPointsData[];
  }) => void;
}

export const useSiteDataStore = create<SiteDataState>((set) => ({
  siteData: undefined,
  setSiteData: (val) => set({ siteData: val}),
}));
