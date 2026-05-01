import NotOkMessage from "@/components/not-ok-message";
import PostCategoryPage from "@/components/pages/posts/post-page";
import { getPostsByCategory } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";
import { PostData } from "@/types";


export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: PostCategory }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const {category} = await params;
  const filters = await searchParams;
  const postRes = await getPostsByCategory({
    category,
    page: "1",
    limit: process.env.NEXT_PUBLIC_LIMIT || "20",
    ...filters,
  });

  let prependData: PostData[] = [];

  if (category === "freeboard" && ( !filters.page || filters.page === "1")) {
    const prependRes = await getPostsByCategory({
      category: "announcements",
      page: "1",
      limit: "10",
    });

    if (prependRes.ok) {
      prependData = prependRes.data;
    }
  }

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;  
  
  return (
    <PostCategoryPage 
      title={category} 
      data={postRes.data} 
      prependData={prependData}
      totalItems={postRes.totalItems} 
      totalPages={postRes.totalPages} 
      category={category}
    />
  )
}