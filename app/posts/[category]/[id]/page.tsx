import NotOkMessage from "@/components/not-ok-message";
import { getPosts } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";


export default async function Page({
  params,
}: {
  params: Promise<{ category: PostCategory, id: string }>
}) {
  const {category, id} = await params
  const postRes = await getPosts({category, id: parseInt(id)});

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;
  
  return (
    <div className="">{JSON.stringify(postRes)}</div>
  )

}