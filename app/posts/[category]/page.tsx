import NotOkMessage from "@/components/not-ok-message";
import PostCategoryPage from "@/components/pages/posts/post-page";
import { getPostsByCategory } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";


export default async function Page({
  params,
}: {
  params: Promise<{ category: PostCategory }>
}) {
  const {category} = await params;
  const postRes = await getPostsByCategory({category});

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;
  
  return <PostCategoryPage title={category.toUpperCase()} data={postRes.data} />
}