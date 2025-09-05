"use client"

import CommentForm from "@/components/forms/comment-form";
import { useCommentReplyStore } from "@/store/use-comment-reply-store";
import { UserCommentData } from "@/types";

export default function ReplyCommentForm(item: UserCommentData & {categoryId: number; getReplyComments: () => void}) {
  const { isReplyingCommentId, setIsReplyingCommentId } = useCommentReplyStore();
  return isReplyingCommentId === item.id && (
    <div className="pl-12">
      <CommentForm 
        level={(item.level || 1) + 1} 
        postId={Number(item.postId)} 
        commentId={item.id}
        categoryId={item.categoryId}
        isReplying={isReplyingCommentId === item.id}
        setIsReplying={setIsReplyingCommentId}
        getReplyComments={item.getReplyComments}
      />
    </div>
  );
}