// store/sheetStore.ts
import { UserSession } from "@/types";
import { create } from "zustand";

interface SheetState {
  user?: UserSession;
  setUserSession: (val?: UserSession) => void;
}

export const useUserStore = create<SheetState>((set) => ({
  user: undefined,
  setUserSession: (val) =>
    set({ user: val}),
}));
