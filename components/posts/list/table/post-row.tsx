"use client"

import ContentPlainText from "@/components/content-plaintext";
import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import { PostData } from "@/types";
import { Eye, MessageCircle, Pencil, ThumbsDown, ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function PostRowItem(item: PostData) {
  const user = useUserStore(state => state.user);
  
  const isOwnPost = useMemo(() => user?.id === item.authorId, [user]);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={`/posts/${item.category}/${item.id}`} className="hover:underline" target={isOwnPost ? "_blank" : undefined}>
          {item.title}
        </Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <ContentPlainText content={item.content} />
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <ThumbsUp className="size-3" />
            <NumberFormatter value={item.likeCount} />
          </div>
          <div className="flex gap-1 items-center">
            <ThumbsDown className="size-3" />
            <NumberFormatter value={item.dislikeCount} />
          </div>
          <div className="flex gap-1 items-center">
            <MessageCircle className="size-3" />
            <NumberFormatter value={item.commentCount} />
          </div>
          <div className="flex gap-1 items-center">
            <Eye className="size-3" />
            <NumberFormatter value={item.viewCount} />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Link href={`/profile/${item.authorId}`} className="hover:underline">
          <div className="flex gap-2 items-center">
            <div className="size-7 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
              <User className="size-4 opacity-60" />
            </div>
            <span className="">{item.authorName}</span>
          </div>
        </Link>
      </TableCell>
      <TableCell>{formatDate(item.regDatetime || "")}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center gap-2">
          <Link href={`/posts/${item.category}/${item.id}`} target={isOwnPost ? "_blank" : undefined}>
            <Button size={"icon"} variant={"default"} className="cursor-pointer size-8">
              <Eye className="size-4" />
            </Button>
          </Link>
          {isOwnPost && (
            <Link href={`/profile/posts/edit?id=${item.id}&category=${item.category}`}>
              <Button size={"icon"} variant={"secondary"} className="cursor-pointer size-8">
                <Pencil className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}