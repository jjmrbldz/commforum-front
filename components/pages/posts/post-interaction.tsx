"use client"

import CommentForm from "@/components/forms/comment-form";
import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { PostData, UserCommentData } from "@/types";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Comment from "./comment";
import { useMemo } from "react";
import NotOkMessage from "@/components/not-ok-message";


export default function PostInteraction({
  data,
  userComments,
 }: { 
  data: PostData,
  userComments: UserCommentData[]
 }) {

  const commentLength = useMemo(() => userComments ? userComments.length : 0, [userComments]);

  return (
    <>
      <div className="flex">
        <Button variant={"secondary"} className="flex-1">
          <ThumbsUp />
          <span>Like</span>
          <span>(<NumberFormatter value={data.likeCount} />)</span>
        </Button>
        <Button variant={"secondary"} className="flex-1">
          <MessageCircle />
          <span>Comment</span>
          <span>(<NumberFormatter value={data.commentCount} />)</span>
        </Button>
        <Button variant={"secondary"} className="flex-1">
          <ThumbsDown />
          <span>Dislike</span>
          <span>(<NumberFormatter value={data.dislikeCount} />)</span>
        </Button>
      </div>
      <div className="space-y-3">
        <div className="">
          <CommentForm data={data} level={1} />
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