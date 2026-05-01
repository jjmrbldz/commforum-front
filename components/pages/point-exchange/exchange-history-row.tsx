"use client"

import { NumberFormatter } from "@/components/number-formatter";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";
import { PointExchangeHistory } from "@/types";

interface Props {
  item: PointExchangeHistory;
}

const statusProps: Record<number, {label: string; className: string}> = {
  0: {label: "대기중", className: "bg-yellow-500 text-white"}, // Pending
  1: {label: "처리중", className: "bg-blue-500 text-white"}, // Processing
  2: {label: "완료", className: "bg-green-500 text-white"}, // Completed
  3: {label: "취소됨", className: "bg-red-500 text-white"}, // Cancelled
};
export default function ExchangeHistoryRow({item}: Props) {

  return (
    <TableRow className="text-xs">
      <TableCell className="text-center">
        {item.id}
      </TableCell>
      <TableCell className="text-center">
        {item.username}
      </TableCell>
      <TableCell className="text-center">
        {item.note}
      </TableCell>
      <TableCell className="text-center">
        <NumberFormatter value={item.amount} suffix=" 원" />
      </TableCell>
      <TableCell className="text-center">
        <Badge className={cn("rounded-full text-xs", statusProps[item.status].className)}> <span className="text-xs">{statusProps[item.status].label}</span> </Badge>
      </TableCell>
      <TableCell className="text-center">
        {formatDate(item.regDatetime!, "MM.DD")}
      </TableCell>
    </TableRow>
  )
}