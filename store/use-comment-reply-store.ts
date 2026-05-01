import { create } from "zustand";

interface CommentReplyState {
  isReplyingCommentId?: number;
  setIsReplyingCommentId: (val?: number) => void;
}

export const useCommentReplyStore = create<CommentReplyState>((set) => ({
  isReplyingCommentId: undefined,
  setIsReplyingCommentId: (val) =>
    set({ isReplyingCommentId: val}),
}));
