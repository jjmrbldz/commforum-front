import { WidgetItemPrefixProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default function WidgetItemPrefix({
  data, 
  path,
  isReviews
}: WidgetItemPrefixProps) {
  return (
    <div className="flex items-center justify-between">
      {data.slice(0, 2).map((item, index) => (
        <Link key={index} href={`${path}?id=${item.id}`} className="block hover:text-red-500">
          <Image width={110} height={75} alt={item.content || ""} src={item.img} className="!w-[110px] !h-[75px] !max-w-[110px] !max-h-[75px] object-cover" style={{width: 'auto', height: 'auto'}} />
          <div className="flex items-center justify-between mt-1">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs">{item.title}</div>
            <div className="text-red-500 font-bold">+{item.reviews}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}