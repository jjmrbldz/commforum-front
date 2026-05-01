import { WidgetBasicGalleryProps } from "@/types";
import WidgetTitle from "./widget-title";
import Link from "next/link";
import Image from "next/image";


export default function WidgetBasicGallery(props: WidgetBasicGalleryProps) {
  return (
    <>
      <WidgetTitle title={props.title} />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {props.data && props.data.length > 0 ? props.data?.map((item, index) => (
          <Link key={index} href={`${props.path}/${item.category}/${item.id}`} className="block hover:text-red-500 flex-1">
            <div className="relative w-full h-[125px] shadow-[0px_9px_4px_-4px_rgba(0,0,0,0.8)]">
              <Image
                alt={item.content || ""} 
                src={item.img} 
                className="object-cover"
                fill
                sizes="168px"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs max-w-full">{item.title}</div>
            </div>
          </Link>
        )) : (
          <div className="col-span-5 w-full text-center text-slate-400 p-12">등록된 글이 없습니다.</div>
        )}
      </div>
    </>
  )
}