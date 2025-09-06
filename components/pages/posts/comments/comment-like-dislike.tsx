"use client"
import { NumberFormatter } from "@/components/number-formatter";
import { commentLikeDislikeAction } from "@/db/query/comment-like-dislike";
import { PostCategory } from "@/db/schema/posts";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import { UserCommentData } from "@/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";


export default function CommentLikeDislike(item: UserCommentData & {categoryId: number}) {
  const { category } = useParams();
  const user = useUserStore(state => state.user);
  const [isPending, startTransition] = useTransition();
  const [likeDislike, setLikeDislike] = useState<string | null | undefined>(item.likeDislikeType);
  const [likeCount, setLikeCount] = useState(item.like);
  const [dislikeCount, setDislikeCount] = useState(item.dislike);

  const handleClick = async (type: string) => {
    if (isPending) return;
    if (!user) {
      toast.warning("You need to login first.");
      return;
    }
    if (likeDislike === null) {
      setLikeDislike(type);
      if (type === "like") setLikeCount((prev) => (prev || 0) + 1);
      if (type === "dislike") setDislikeCount((prev) => (prev || 0) + 1);
    }
    if (likeDislike === "like" && type === "like") {
      setLikeCount((prev) => (prev || 0) - 1);
      setLikeDislike("unlike");
    }
    if (likeDislike === "like" && type === "dislike") {
      setLikeCount((prev) => (prev || 0) - 1);
      setDislikeCount((prev) => (prev || 0) + 1);
      setLikeDislike("dislike");
    }
    if (likeDislike === "dislike" && type === "dislike") {
      setDislikeCount((prev) => (prev || 0) - 1);
      setLikeDislike("undislike");
    }
    if (likeDislike === "dislike" && type === "like") {
      setLikeCount((prev) => (prev || 0) + 1);
      setDislikeCount((prev) => (prev || 0) - 1);
      setLikeDislike("like");
    }
    if (likeDislike === "unlike" && type === "like") {
      setLikeCount((prev) => (prev || 0) + 1);
      setLikeDislike("like");
    }
    if (likeDislike === "unlike" && type === "dislike") {
      setDislikeCount((prev) => (prev || 0) + 1);
      setLikeDislike("dislike");
    }
    if (likeDislike === "undislike" && type === "like") {
      setLikeCount((prev) => (prev || 0) + 1);
      setLikeDislike("like");
    }
    if (likeDislike === "undislike" && type === "dislike") {
      setDislikeCount((prev) => (prev || 0) + 1);
      setLikeDislike("dislike");
    }
    startTransition(async () => {
      const res = await commentLikeDislikeAction({
        commentId: item.id,
        postId: Number(item.postId),
        category: category as PostCategory,
        actionType: type
      })
      if (res.message) toast[res.ok ? "success" : "warning"](res.message);
    })
  }

  return (
    <>
      <div className="flex items-center gap-[1px] mr-1"> 
        <ThumbsUp 
          fill={user && likeDislike === "like" ? "blue" :"none"}
          className={cn(
            "size-4 cursor-pointer hover:text-blue-500",
            user && likeDislike === "like" && "text-white"
          )} 
          onClick={() => handleClick("like")} 
        />
        <span><NumberFormatter value={likeCount || 0} /></span>
      </div>
      <div className="flex items-center gap-[1px] mr-2">
        <ThumbsDown 
          fill={user && likeDislike === "dislike" ? "red" :"none"}
          className={cn(
            "size-4 relative -bottom-[2px] cursor-pointer hover:text-red-500",
            user && likeDislike === "dislike" && "text-white"
          )} 
          onClick={() => handleClick("dislike")} 
        />
        <span><NumberFormatter value={dislikeCount || 0} /></span>
      </div>
    </>
  )
}