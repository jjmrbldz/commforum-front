import NotOkMessage from "@/components/not-ok-message";
import PostCategoryPage from "@/components/pages/posts/post-page";
import { getPostsByCategory } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";


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

  console.log("postRes", postRes);

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;
  
  return (
    <PostCategoryPage 
      title={category.toUpperCase()} 
      data={postRes.data} 
      totalItems={postRes.totalItems} 
      totalPages={postRes.totalPages} 
      category={category}
    />
  )
}