import { cn, formatDate, isValidJSON } from "@/lib/utils";
import { WidgetItemProps } from "@/types";
import Link from "next/link"
import { NumberFormatter } from "../number-formatter";
import { categoryKrLabel } from "@/lib/constants";
import ContentPlainText from "../content-plaintext";

export default function WidgetItem({
  item,
  path,
  isReviews,
  addCategory,
  showRank,
  showAuthor,
  rankColor,
  showPoints,
  routable
}: WidgetItemProps) {
  return (
    <Link href={routable ? `${path}/${item.category}/${item.postId || item.id}` : "#"} className="flex items-center gap-1 text-xs hover:text-red-500 mt-1">
      {showRank && ((item.index !== undefined) || item.rank ? (
        <div className={cn("bg-yellow-500 text-white py-[2px] w-6 min-w-6 text-center leading-none", rankColor)}>{item.index !== undefined ? item.index + 1 : item.rank}</div>
        ) : (
          <div className="bg-yellow-500 min-w-3 min-h-3 rounded-full"></div>
        )
      )}
      {isValidJSON(item.content) ? (
        <ContentPlainText content={item.content} />
      ) : (
        <div className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full">{addCategory && (`${categoryKrLabel[item.category] || ""} | `)}{item.title || item.content || item.name}</div>
      )}
      <div className="flex ml-auto">
        {isReviews && (<div className="text-red-500 mr-3">+{item.reviews}</div>)}
        {showAuthor && (<div className="text-slate-500 text-nowrap mr-3">{item.author || item.username || item.authorUsername}</div>)}
        {showPoints && <div className="text-red-500 font-bold text-right"><NumberFormatter value={item.points} suffix=" P" /></div>}
        {(item.date || item.regDatetime) && <div className="text-slate-500 text-right">{item.date || formatDate(item.regDatetime, "YY.MM")}</div>}
      </div>
    </Link>
  )
}