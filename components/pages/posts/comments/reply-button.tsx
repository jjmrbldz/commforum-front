"use client"

import { useCommentReplyStore } from "@/store/use-comment-reply-store"


export default function ReplyCommentButton({ commentId }:{ commentId: number }) {
  const setIsReplyingCommentId = useCommentReplyStore(state => state.setIsReplyingCommentId);
  
  return <div className="hover:underline cursor-pointer" onClick={() => setIsReplyingCommentId(commentId)}>Reply</div>
}