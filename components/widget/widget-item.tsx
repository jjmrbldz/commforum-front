import { WidgetItemProps } from "@/types";
import Link from "next/link"

export default function WidgetItem({
  item,
  path
}: {
  item: WidgetItemProps;
  path: string;
}) {
  return (
    <Link href={`${path}?id=${item.id}`} className="flex items-center gap-1 text-xs hover:text-red-500 mt-1">
      <div className="bg-yellow-500 text-white py-[2px] w-6 text-center leading-none">{item.rank}</div>
      <div className="">{item.title}</div>
      <div className="text-slate-500 text-right ml-auto">{item.date}</div>
    </Link>
  )
}