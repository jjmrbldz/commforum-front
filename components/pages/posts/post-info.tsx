import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserLevelBadge from "@/components/user-level-badge";
import { PostData } from "@/types";
import { Clock, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import dayjs from "@/lib/dayjs"
import { formatDate } from "@/lib/utils";

export default function PostInfo({data}:{data:PostData}) {
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <div className="text-lg">{data.title}</div>
        <div className="text-xs mt-1">
          <UserLevelBadge level={data.authorLevel!} />
          <span> {data.authorName}</span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ThumbsUp size={14} />
            <span>{data.likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
          <span>{data.commentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
          <span>{data.viewCount}</span>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
              <div className="flex gap-1 items-center justify-end">
              <Clock size={14} className="opacity-60 " />
              <span className="text-red-500">{dayjs(data.regDatetime).fromNow()}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {formatDate(data.regDatetime!)}
          </TooltipContent>
        </Tooltip>
        
      </div>
    </div>
  )
}