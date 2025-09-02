import NotOkMessage from "@/components/not-ok-message";
import PostSinglePagePage from "@/components/pages/posts/post-single-page";
import { getPosts } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";
import { JSDOM } from "jsdom"

export default async function Page({
  params,
}: {
  params: Promise<{ category: PostCategory, id: string }>
}) {
  const {category, id} = await params
  const postRes = await getPosts({category, id: parseInt(id)});

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;

  const dom = new JSDOM();

  // @ts-ignore
  global.window = dom.window;
  global.document = dom.window.document;

  return <PostSinglePagePage data={postRes.data[0]} title={postRes.data[0].title} />
}