import NotOkMessage from "@/components/not-ok-message";
import PostSinglePagePage from "@/components/pages/posts/post-single-page";
import { getPostsByCategory } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ category: PostCategory, id: string }>
}) {
  const {category, id} = await params
  const postRes = await getPostsByCategory({category, id: parseInt(id), logView: true});

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;

  return <PostSinglePagePage data={postRes.data[0]} title={postRes.data[0].title} />
}