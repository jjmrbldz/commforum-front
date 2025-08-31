import SearchForm from "@/components/forms/search-form";
import PostsList from "@/components/pages/profile/posts/posts-list";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <SearchForm />
      <div className="">
        <div className="mb-2 flex items-center justify-between">
          <div className="">전체 0 건</div>
          <Link href={"/profile/posts/write"}>
            <Button size={'sm'} type="button">
              <SquarePen />
              <span className="text-xs">글을 쓰세요</span>
            </Button>
          </Link>
        </div>
        <PostsList />
      </div>
    </>
  )
}