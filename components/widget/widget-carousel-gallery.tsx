import { WidgetCarouselGalleryProps } from "@/types";
import Link from "next/link";
import Image from "next/image";


export default function WidgetCarouselGallery({item, path, hasContentTitle}: WidgetCarouselGalleryProps) {
  return (
    <Link key={item.id} href={`${path}?id=${item.id}`} className="block hover:text-red-500 flex-1">
      <div className="relative w-full h-[214px] shadow-[0px_9px_4px_-4px_rgba(0,0,0,0.8)]">
        <Image
          alt={item.content || ""} 
          src={item.img} 
          className="object-cover"
          fill
          sizes="168px"
        />
      </div>
      {hasContentTitle && (
        <div className="flex items-center justify-between mt-3">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs max-w-full">{item.title}</div>
        </div>
      )}
    </Link>
  )
}