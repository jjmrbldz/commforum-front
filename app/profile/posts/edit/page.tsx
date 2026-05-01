import PostForm from "@/components/forms/post-form"
import NotOkMessage from "@/components/not-ok-message";
import PageHeader from "@/components/page-header";
import { getPostsByCategory } from "@/db/query/posts";
import { PostCategory } from "@/db/schema/posts";
import { requireUserSession } from "@/lib/session"
import { PostData } from "@/types";


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = await searchParams;
  if (!filters.id && !filters.category) return;
  const user = await requireUserSession();

  const postRes = await getPostsByCategory({
    category: filters.category as PostCategory,
    id: Number(filters.id),
    userId: user.id
  })

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;

  return (
    <>
      <PageHeader title={`Edit: ${postRes.data[0].title}`} />
      <PostForm data={postRes.data[0]} />
    </>
  )
}