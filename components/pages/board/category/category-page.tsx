"use client"

import PageHeader from "@/components/page-header";
import Widget from "@/components/widget/widget";
import { specialBoard } from "@/lib/constants";
import PostPage from "../post-page";

export default function BoardCatPage({title, segment}: {title: string, segment: string[]}) {
  return (
    <>
      <PageHeader title={decodeURIComponent(title)} />
        {segment.length > 0 && segment[1] ? (
          <PostPage />
        ) : (
          <Widget {...{
            title: "스페셜",
            data: specialBoard,
            path: '/board', 
            rootClassname: 'my-4',
            layout: 'gallery',
            carouselSize: 3,
            hasItemPrefix: false,
            chunkData: false,
            hasContentTitle: false,
            loop: true
          }} />
        )}
    </>
  )
}