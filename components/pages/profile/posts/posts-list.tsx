import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function PostsList() {

  return (
    <Table>
      <TableCaption>A list of your recent posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Stats</TableHead>
          <TableHead>Date Published</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  )
}