import { WidgetItemPrefixProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default function WidgetItemPrefix({
  data, 
  path,
  isReviews
}: WidgetItemPrefixProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {data.slice(0, 2).map((item, index) => (
        <Link key={index} href={`${path}?id=${item.id}`} className="block hover:text-red-500 flex-1">
          <div className="relative w-full h-[75px]">
            <Image
              alt={item.content || ""} 
              src={item.img} 
              className="object-cover"
              fill
              sizes="110px"
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs max-w-full">{item.title}</div>
            {isReviews && <div className="text-red-500 font-bold">+{item.reviews}</div>}
          </div>
        </Link>
      ))}
    </div>
  )
}