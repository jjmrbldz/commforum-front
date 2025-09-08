import SearchForm from "@/components/forms/search-form";
import NotOkMessage from "@/components/not-ok-message";
import PostsList from "@/components/pages/profile/posts/posts-list";
import PostTable from "@/components/posts/list/table/table";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/db/query/posts";
import { requireUserSession } from "@/lib/session";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const user = await requireUserSession();
  const filters = await searchParams;
  const postRes = await getAllPosts({
    userId: user.id,
    page: "1",
    limit: "20",
    ...filters,
  });

  console.log("POST RES", postRes)

  if (!postRes.ok) return <NotOkMessage message={postRes.message} />;

  return (
    <>
      <SearchForm />
      <div className="">
        <div className="mb-2 flex items-center justify-between">
          <div className="">전체 {postRes.totalItems} 건</div>
          <Link href={"/profile/posts/write"}>
            <Button size={'sm'} type="button">
              <SquarePen />
              <span className="text-xs">글을 쓰세요</span>
            </Button>
          </Link>
        </div>
        <PostTable data={postRes.data} totalItems={postRes.totalItems} totalPages={postRes.totalPages} />
      </div>
    </>
  )
}