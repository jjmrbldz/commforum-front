"use client"

import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { likeDislikeAction } from "@/db/query/like-dislike";
import { CommentData } from "@/db/validations/comment";
import { useUserStore } from "@/store/use-user-store";
import { PostData } from "@/types";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";


export default function PostLikeDisLike({
  data,
} : {
  data: PostData;
}) {
  const user = useUserStore(state => state.user);
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [likeDislike, setLikeDislike] = useState<string | null | undefined>(data.likeDislikeType);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [dislikeCount, setDislikeCount] = useState(data.dislikeCount);

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
      const res = await likeDislikeAction({
        postId: data.id,
        category: data.category,
        actionType: type
      })
      if (res.message) toast[res.ok ? "success" : "warning"](res.message);
    })
  }

  return (
    <div className="flex">
      <Button variant={likeDislike === "like" ? "default" :"secondary"} className="flex-1" onClick={() => handleClick("like")}>
        <ThumbsUp />
        <span>Like{likeDislike === "like" && "d"}</span>
        <span>(<NumberFormatter value={likeCount || 0} />)</span>
      </Button>
      <Button variant={"secondary"} className="flex-1">
        <MessageCircle />
        <span>Comment</span>
        <span>(<NumberFormatter value={data.commentCount} />)</span>
      </Button>
      <Button variant={likeDislike === "dislike" ? "destructive" : "secondary"} className="flex-1" onClick={() => handleClick("dislike")}>
        <ThumbsDown />
        <span>Dislike{likeDislike === "dislike" && "d"}</span>
        <span>(<NumberFormatter value={dislikeCount || 0} />)</span>
      </Button>
    </div>
  )
}