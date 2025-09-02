"use client"

import PageHeader from "@/components/page-header";
import PostTable from "@/components/posts/list/table/table";
import { PostData } from "@/types";
import { useState } from "react";

export default function PostCategoryPage({title, data}: {title: string, data: PostData[]}) {
  const [viewMode, setViewMode] = useState("grid");
  return (
    <>
      <PageHeader title={decodeURIComponent(title)} viewMode={viewMode} onChangeView={(mode) => setViewMode(mode)} />
      <PostTable data={data} />
    </>
  )
}