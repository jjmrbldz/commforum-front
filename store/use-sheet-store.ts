import { create } from "zustand";

interface SheetState {
  activeSheet: string | null;
  setSheet: (id: string | null) => void;
  isOpen: boolean;
}

export const useSheetStore = create<SheetState>((set) => ({
  activeSheet: null,
  setSheet: (id) =>
    set((state) => ({
      activeSheet: state.activeSheet === id ? null : id,
    })),
  isOpen: false,
}));
