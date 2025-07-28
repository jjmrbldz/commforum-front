import { ReactNode } from "react";
import { CarouselNext, CarouselPrevious } from "../ui/carousel";
import { cn } from "@/lib/utils";

export default function WidgetTitle({
  className = "",
  title,
  isCarousel = false,
  isTab = false
} : {
  className?: string;
  title: ReactNode;
  isCarousel?: boolean;
  isTab?: boolean;
}) {
  return (
    <div className="">
      <div className={cn("flex items-center justify-between", className)}>
        {isTab ? (
          title
        ) : (
          <div className="text-lg font-bold">{title}</div>
        )}
        {isCarousel && (
          <div className="">
            <CarouselPrevious className="static translate-none rounded-none size-6 border border-slate-200" />
            <CarouselNext className="static translate-none rounded-none size-6 border border-slate-200" />
          </div>
        )}
      </div>
      <div className="my-2 flex items-center">
        <div className="h-[3px] bg-slate-700 w-[45px]"></div>
        <div className="h-[1px] bg-slate-300 flex-1"></div>
      </div>
    </div>
  )
}