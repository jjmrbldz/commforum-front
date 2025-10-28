import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PointExchangeHistory } from "@/types";
import { Paginate } from "@/components/paginate";
import ExchangeHistoryRow from "./exchange-history-row";

interface Props {
  data: PointExchangeHistory[];
  totalItems?: number;
  totalPages?: number;
}

export default async function ExchangeHistoryList({data, totalItems = 0, totalPages = 0}: Props) {
  return (
    <>
      <div className="space-y-2">
        <div className="overflow-x-auto max-w-[calc(100vw-1rem)]">
          <Table>
            <TableHeader className="text-sm">
              <TableRow>
                <TableHead className="text-center font-bold">번호</TableHead>
                <TableHead className="text-center font-bold">회원아이디</TableHead>
                <TableHead className="text-center font-bold">교환업체명</TableHead>
                <TableHead className="text-center font-bold">교환금액</TableHead>
                <TableHead className="text-center font-bold">교환상태</TableHead>
                <TableHead className="text-center font-bold">신청일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <ExchangeHistoryRow key={index} item={item} />
              ))}
            </TableBody>
            {data.length === 0 && (
              <TableCaption>No result found.</TableCaption>
            )}
          </Table>
        </div>
        <Paginate totalItems={totalItems} totalPages={totalPages} />
      </div>
    </>
  )
}