import { WidgetItemProps } from "@/types";
import { Circle } from "lucide-react";
import Link from "next/link"

export default function WidgetItem({
  item,
  path,
  isReviews,
  addCategory,
  showRank
}: WidgetItemProps) {
  return (
    <Link href={`${path}?id=${item.id}`} className="flex items-center gap-1 text-xs hover:text-red-500 mt-1">
      {showRank && (
        item.rank > 0 ? (
          <div className="bg-yellow-500 text-white py-[2px] w-6 min-w-6 text-center leading-none">{item.rank}</div>
        ) : (
          <div className="bg-yellow-500 min-w-3 min-h-3 rounded-full">
        </div>
        )
      )}
      <div className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full">{addCategory && (`${item.category} | `)}{item.title}</div>
      <div className="flex ml-auto">
        {isReviews && (<div className="text-red-500 mr-3">+{item.reviews}</div>)}
        <div className="text-slate-500 text-right">{item.date}</div>
      </div>
    </Link>
  )
}