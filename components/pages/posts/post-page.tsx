"use client"

import SearchForm from "@/components/forms/search-form";
import NotOkMessage from "@/components/not-ok-message";
import PageHeader from "@/components/page-header";
import PostGrid from "@/components/posts/grid/post-grid";
import PostTable from "@/components/posts/list/table/table";
import { useSiteDataStore } from "@/store/use-sitedata-store";
import { PostData } from "@/types";
import { useMemo } from "react";

interface Props {
  title: string;
  data: PostData[];
  totalItems?: number;
  totalPages?: number;
  category?: string;
}

export default function PostCategoryPage({title, data, category, totalItems = 0, totalPages = 0}: Props) {
  const siteData = useSiteDataStore(state => state.siteData);

  const catProp = useMemo(() => {
    if (siteData && siteData.categories && category) {
      return {
        layout: siteData.categories?.find(item => item.value === category)?.layout,
        titleKr: siteData.categories?.find(item => item.value === title)?.titleKr,
        categoryId: siteData.categories?.find(item => item.value === title)?.id
      }
    }
  }, [category, siteData]);

  return catProp && (
    <div className="space-y-4">
      <PageHeader title={catProp.titleKr!} />
      <SearchForm defaultCategory={String(catProp.categoryId)} />
      {data.length === 0 ? (
        <NotOkMessage variant={"warn"} title="" message={"No data found"} />
        ) : 
        catProp.layout === "list" ? (
          <PostTable data={data} totalItems={totalItems} totalPages={totalPages} />
        ) : (
          <PostGrid data={data} totalItems={totalItems} totalPages={totalPages} />
        )
      }
    </div>
  )
}