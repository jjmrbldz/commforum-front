import { cn } from "@/lib/utils";
import { WidgetItemProps } from "@/types";
import Link from "next/link"
import { NumberFormatter } from "../number-formatter";

export default function WidgetItem({
  item,
  path,
  isReviews,
  addCategory,
  showRank,
  showAuthor,
  rankColor,
  showPoints
}: WidgetItemProps) {
  return (
    <Link href={`${path}/${item.category}/${item.id}`} className="flex items-center gap-1 text-xs hover:text-red-500 mt-1">
      {showRank && (
        item.rank > 0 ? (
          <div className={cn("bg-yellow-500 text-white py-[2px] w-6 min-w-6 text-center leading-none", rankColor)}>{item.rank}</div>
        ) : (
          <div className="bg-yellow-500 min-w-3 min-h-3 rounded-full">
        </div>
        )
      )}
      <div className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full">{addCategory && (`${item.category} | `)}{item.title || item.name}</div>
      <div className="flex ml-auto">
        {isReviews && (<div className="text-red-500 mr-3">+{item.reviews}</div>)}
        {showAuthor && (<div className="text-slate-500 text-nowrap mr-3">{item.author}</div>)}
        {showPoints && <div className="text-red-500 font-bold text-right"><NumberFormatter value={item.points} suffix=" P" /></div>}
        {item.date && <div className="text-slate-500 text-right">{item.date}</div>}
      </div>
    </Link>
  )
}