"use client"

import CommentForm from "@/components/forms/comment-form";
import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { PostData, UserCommentData } from "@/types";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Comment from "./comment";
import { useMemo, useRef } from "react";
import NotOkMessage from "@/components/not-ok-message";
import PostLikeDisLike from "./post-like-dislike";
import { useForm } from "react-hook-form";
import { CommentData, commentSchema } from "@/db/validations/comment";
import { zodResolver } from "@hookform/resolvers/zod";


export default function PostInteraction({
  data,
  userComments,
 }: { 
  data: PostData,
  userComments: UserCommentData[]
 }) {
  const form = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId: String(data.id),
      content: "",
      categoryId: data.categoryId,
      level: 1
    },
  });

  const commentLength = useMemo(() => userComments ? userComments.length : 0, [userComments]);

  return (
    <>
      <PostLikeDisLike form={form} data={data} />
      <div className="space-y-3">
        <div className="">
          <CommentForm form={form} />
        </div>
        <div className="font-bold text-base">Comments ({commentLength})</div>
        {commentLength > 0 ? (
          userComments.map((item, index) =><Comment key={index} {...item} />)
        ) : (
          <NotOkMessage variant={"info"} title="" message="No comments found." />
        )}
      </div>
    </>
  )
}