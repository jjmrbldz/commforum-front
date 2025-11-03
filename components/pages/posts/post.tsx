import { getHtml } from "@/app/posts/[category]/[id]/actions";
import ReadOnlyContent from "@/components/readonly-content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import UserLevelBadge from "@/components/user-level-badge";
import { formatDate, parseImage } from "@/lib/utils";
import { PostData } from "@/types";
import { Clock, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import dayjs from "@/lib/dayjs"
import PostInfo from "./post-info";

export default async function Post({ data } : { data: PostData }) {
  const html = await getHtml(data.content);
  const media = parseImage(data.media || "", false) as string[];

  return (
    <div className="space-y-4">
      <PostInfo data={data} />
      {data.category === "eventtazza" && data.field1 && data.field2 && (
        <div className="text-sm">기간: {formatDate(data.field1, "YYYY-MM-DD H시")} - {formatDate(data.field2, "YYYY-MM-DD H시")}</div>
      )}
      {data.thumbnail && (  
        <div className="aspect-video">
          <Image 
            width={900}
            height={300}
            className="!h-full !w-full object-cover"
            src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}${parseImage(data.thumbnail || "", true)}`}
            alt=""
          />
        </div>
      )}
      <article 
        // suppressHydrationWarning
        className="sr-only"
        dangerouslySetInnerHTML={{__html: html}}
      />
      <ReadOnlyContent content={data.content} />
      <div className="flex items-center justify-center flex-wrap gap-4">
        {media?.map((item, index) => (
          <Image 
            key={index}
            width={300}
            height={300}
            className="w-auto h-auto max-w-[300px]"
            src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}${item}`}
            alt=""
          />
        ))}
      </div>
    </div>
  )
} 