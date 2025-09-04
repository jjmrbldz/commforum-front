import { getHtml } from "@/app/posts/[category]/[id]/actions";
import { parseImage } from "@/lib/utils";
import { PostData } from "@/types";
import Image from "next/image";

export default async function Post({ data } : { data: PostData }) {
  const html = await getHtml(data.content);
  const media = parseImage(data.media || "", false) as string[];

  return (
    <div className="space-y-4">
      <div className="aspect-video">
        <Image 
          width={900}
          height={300}
          className="!h-full !w-full object-cover"
          src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}${parseImage(data.thumbnail || "", true)}`}
          alt=""
        />
      </div>
      <article 
        // suppressHydrationWarning
        dangerouslySetInnerHTML={{__html: html}}
      />
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