import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PostCategory, type PostRow } from "@/db/schema/posts";
import PostRowItem from "./post-row";
import { PostData } from "@/types";
import { Paginate } from "@/components/paginate";

interface Props {
  data: PostData[];
  totalItems?: number;
  totalPages?: number
}

export default function PostTable({data, totalItems = 0, totalPages = 0}: Props) {
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto max-w-[calc(100vw-1rem)]">
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
      <Paginate totalItems={totalItems} totalPages={totalPages} />
    </div>
  )
}