"use client"

import NotOkMessage from "@/components/not-ok-message";
import PageHeader from "@/components/page-header";
import PostGrid from "@/components/posts/grid/post-grid";
import PostTable from "@/components/posts/list/table/table";
import { useSiteDataStore } from "@/store/use-sitedata-store";
import { PostData } from "@/types";
import { useMemo, useState } from "react";

interface Props {
  title: string;
  data: PostData[];
  totalItems?: number;
  totalPages?: number;
  category?: string;
}

export default function PostCategoryPage({title, data, category, totalItems = 0, totalPages = 0}: Props) {
  const [viewMode, setViewMode] = useState("grid");
  const siteData = useSiteDataStore(state => state.siteData);

  const layout = useMemo(() => {
    if (siteData && siteData.categories && category) {
      return siteData.categories?.find(item => item.value === category)?.layout;
    }
  }, [category, siteData]);



  return layout && (
    <>
      <PageHeader title={decodeURIComponent(title)} viewMode={viewMode} onChangeView={(mode) => setViewMode(mode)} />
      {data.length === 0 ? (
        <NotOkMessage variant={"warn"} title="" message={"No data found"} />
        ) : 
        layout === "list" ? (
          <PostTable data={data} totalItems={totalItems} totalPages={totalPages} />
        ) : (
          <PostGrid data={data} totalItems={totalItems} totalPages={totalPages} />
        )
      }
    </>
  )
}