import NotOkMessage from "@/components/not-ok-message";
import PostPage from "@/components/pages/board/post-page";
import PostCategoryPage from "@/components/pages/posts/post-page";
import PostTable from "@/components/posts/list/table/table";
import { getPosts } from "@/db/query/posts";
import { getUserExpLevel } from "@/db/query/user-level-exp";
import { PostCategory } from "@/db/schema/posts";


export default async function Page({
  params,
}: {
  params: Promise<{ category: PostCategory }>
}) {
  const {category} = await params;
  const postRes = await getPosts({category});

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;
  
  return <PostCategoryPage title={category.toUpperCase()} data={postRes.data} />
}