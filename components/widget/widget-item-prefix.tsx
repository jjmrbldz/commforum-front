import { WidgetItemPrefixProps } from "@/types";
import Image from "next/image";
import Link from "next/link";


export default function WidgetItemPrefix({
  data, 
  path
}: WidgetItemPrefixProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {data.slice(0, 2).map((item, index) => (
        <Link key={index} href={`${path}?id=${item.id}`} className="block hover:text-red-500">
          <Image width={100} height={75} alt={item.content || ""} src={item.img} className="!w-[100px] !h-[75px] !max-w-[100px] !max-h-[75px] object-cover" style={{width: 'auto', height: 'auto'}} />
          <div className="mt-1 whitespace-nowrap overflow-hidden text-ellipsis text-xs">{item.title}</div>
        </Link>
      ))}
    </div>
  )
}