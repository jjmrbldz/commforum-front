import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PostCategory, type PostRow } from "@/db/schema/posts";
import PostRowItem from "./post-row";
import { PostData } from "@/types";

interface Props {
  data: PostData[];
}

export default function PostTable({data}: Props) {
  return (
    <div className="overflow-x-auto max-w-[calc(100vw-1rem)] pr-4 md:pr-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead className="hidden md:table-cell">Content</TableHead>
            <TableHead>Stats</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <PostRowItem key={index} {...item} />
          ))}
        </TableBody>
        {data.length === 0 && (
          <TableCaption>No posts found.</TableCaption>
        )}
      </Table>
    </div>
  )
}