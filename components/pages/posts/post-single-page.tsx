
import PageHeader from "@/components/page-header";
import { PostData } from "@/types";
import Post from "./post";
import PostInteraction from "./post-interaction";
import { getComments } from "@/db/query/comment";
import { JSDOM } from "jsdom"

export default async function PostSinglePagePage({title, data}: {title: string, data: PostData}) {
  const comments = await getComments({
    categoryId: data.categoryId || 0,
    category: data.category,
    id: data.id
  });

  const dom = new JSDOM();

  // @ts-ignore
  global.window = dom.window;
  global.document = dom.window.document;

  return (
    <>
      <PageHeader title={decodeURIComponent(title)} />
      <Post data={data} />
      <PostInteraction data={data} userComments={comments} />
    </>
  )
}