"use client"

import { UserCommentData } from "@/types";
import CommentItem from "./comment-item";
import { useState, useTransition } from "react";
import { getComments } from "@/db/query/comment";
import { useParams } from "next/navigation";
import { PostCategory } from "@/db/schema/posts";
import CommentSkeleton from "@/components/skeletons/comment-skeleton";

export default function Comments(item: UserCommentData & {categoryId: number}) {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<UserCommentData[]>([]);
  const { category, id } = useParams();

  const getReplyComments = () => {
    startTransition(async () => {
      const res = await getComments({
        category: category as PostCategory,
        postId: Number(id),
        commentId: item.id ?? undefined,
        level: (item.level || 1) + 1,
        sort: "asc",
      })
      if (res && res.length > 0) setData(res);
    })
  }

  return (
    <>
    <div className="space-y-2"> 
      <CommentItem key={item.id} {...item} categoryId={item.categoryId || 0} getReplyComments={getReplyComments} />
      {data.length === 0 && item.replyCount && item.replyCount > 0 && (
        <div 
          className="hover:underline cursor-pointer max-w-max" 
          style={{paddingLeft: `calc(var(--spacing) * ${12 + (item.level || 1)})`}} 
          onClick={getReplyComments}
        >
          View {item.replyCount > 1 ? "all" : ""} {item.replyCount} repl{item.replyCount > 1 ? "ies" : "y"}
        </div>
      )}
      <div className="space-y-2" style={{paddingLeft: `calc(var(--spacing) * ${12 + (item.level || 1)})`}}>
        {isPending ? (
          <CommentSkeleton replyCount={item.replyCount || 1} />
        ) : (
          data && data.map((reply, index) => (
              <Comments key={reply.id} {...reply} categoryId={item.categoryId || 0} />
            ))
          )}
      </div>
    </div>
    </>
  )
}