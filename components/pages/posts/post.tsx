"use client"

import useLexicalHTML from "@/hooks/use-lexical-html";
import { parseImage } from "@/lib/utils";
import { PostData } from "@/types";
import Image from "next/image";

export default function Post({ data } : { data: PostData }) {
  const htmlString = useLexicalHTML(data.content);

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
        suppressHydrationWarning
        dangerouslySetInnerHTML={{__html: htmlString}}
      />
    </div>
  )
} 