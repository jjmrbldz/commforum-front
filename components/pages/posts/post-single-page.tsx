
import PageHeader from "@/components/page-header";
import { PostData } from "@/types";
import Post from "./post";
import PostInteraction from "./post-interaction";
import { cookies } from "next/headers";
import { getComments } from "@/db/query/comment";

export default async function PostSinglePagePage({title, data}: {title: string, data: PostData}) {
  const comments = await getComments({
    categoryId: data.categoryId || 0,
    category: data.category,
    id: data.id
  });

  return (
    <>
      <PageHeader title={decodeURIComponent(title)} />
      <Post data={data} />
      <PostInteraction data={data} userComments={comments} />
    </>
  )
}