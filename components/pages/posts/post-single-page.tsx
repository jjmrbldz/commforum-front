
import PageHeader from "@/components/page-header";
import { PostData } from "@/types";
import Post from "./post";
import PostInteraction from "./post-interaction";
import { getComments } from "@/db/query/comment";

export default async function PostSinglePagePage({title, data}: {title: string, data: PostData}) {
  const comments = await getComments({
    category: data.category,
    postId: data.id,
    level: 1,
    limit: Number(process.env.NEXT_PUBLIC_LIMIT || 20)
  });

  return (
    <>
      <PageHeader title={data.categoryTitleKr!} />
      <Post data={data} />
      <PostInteraction data={data} userComments={comments} />
    </>
  )
}