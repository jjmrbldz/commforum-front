import { NumberFormatter } from "@/components/number-formatter";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { type PostRow } from "@/db/schema/posts";
import { formatDate } from "@/lib/utils";
import { PostData } from "@/types";
import { Eye, MessageCircle, ThumbsDown, ThumbsUp, User } from "lucide-react";
import Link from "next/link";

export default function PostRowItem(item: PostData) {
  
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={`/posts/${item.category}/${item.id}`} className="hover:underline">
          {item.title}
        </Link>
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
        <Link href={`/posts/${item.category}/${item.id}`}>
          <Button size={"icon"} variant={"default"} className="cursor-pointer size-8">
            <Eye className="size-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  )
}