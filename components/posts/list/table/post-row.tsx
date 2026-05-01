"use client"

import NewBadge from "@/components/new-badge";
import NoticeBadge from "@/components/notice-badge";
import { TableCell, TableRow } from "@/components/ui/table";
import UserLevelBadge from "@/components/user-level-badge";
import { formatDate, isSameDay } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import { PostData } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  item: PostData;
  isNoticePage?: boolean;
}

export default function PostRowItem({item, isNoticePage}: Props) {
  const user = useUserStore(state => state.user);
  
  const isOwnPost = useMemo(() => user?.id === item.authorId, [user]);

  return (
    <TableRow className="text-xs">
      <TableCell className="text-center">
        {(!isNoticePage && item.category === "announcements") ? 
          <NoticeBadge /> : 
          item.id
        }
      </TableCell>
      <TableCell className="font-medium hover:text-red-500">
        <Link href={`/posts/${item.category}/${item.id}`} className="hover:underline w-full block" target={isOwnPost ? "_blank" : undefined}>
          <NewBadge show={isSameDay(item.regDatetime)} /> {item.title} <span className="text-xs text-red-500">{item.commentCount}</span>
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/profile/${item.authorId}`} className="hover:underline">
          <div className="flex gap-2 items-center">
            <UserLevelBadge level={item.authorLevel!} />
            <span className="">{item.authorName}</span>
          </div>
        </Link>
      </TableCell>
      <TableCell className="text-center">{formatDate(item.regDatetime!, "MM.DD")}</TableCell>
      <TableCell className="text-center">{item.viewCount}</TableCell>
    </TableRow>
  )
}