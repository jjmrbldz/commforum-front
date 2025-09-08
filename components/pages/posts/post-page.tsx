"use client"

import PageHeader from "@/components/page-header";
import PostTable from "@/components/posts/list/table/table";
import { PostData } from "@/types";
import { useState } from "react";

interface Props {
  title: string;
  data: PostData[];
  totalItems?: number;
  totalPages?: number
}

export default function PostCategoryPage({title, data, totalItems = 0, totalPages = 0}: Props) {
  const [viewMode, setViewMode] = useState("grid");
  return (
    <>
      <PageHeader title={decodeURIComponent(title)} viewMode={viewMode} onChangeView={(mode) => setViewMode(mode)} />
      <PostTable data={data} totalItems={totalItems} totalPages={totalPages} />
    </>
  )
}