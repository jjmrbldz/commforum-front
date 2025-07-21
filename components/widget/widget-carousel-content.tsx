import { WidgetCarouselProps } from "@/types"
import { CarouselContent, CarouselItem } from "../ui/carousel"
import { carouselItemClass, cn } from "@/lib/utils";
import WidgetList from "./widget-list";
import WidgetCarouselGallery from "./widget-carousel-gallery";

export default function WidgetCarouselContent({
  layout,
  data,
  dataLimitPerList,
  carouselSize,
  hasItemPrefix,
  path,
  isReviews,
  addCategory,
  showRank,
  hasContentTitle,
  showAuthor
} : WidgetCarouselProps) {
  return data && data.length > 0 ? (
    <CarouselContent>
      {data.map((item, index) => (
        <CarouselItem key={index} className={cn("pl-4", carouselItemClass(carouselSize))}>
          {layout === 'default' ? (
            <WidgetList {...{
              data: item,
              path,
              hasItemPrefix,
              dataLimitPerList,
              isReviews,
              addCategory,
              showRank,
              showAuthor
            }} />
          ) : (
            <WidgetCarouselGallery {...{
              item,
              path,
              hasContentTitle,
            }} /> 
          )}
        </CarouselItem>
      ))}
    </CarouselContent>
  ) : (
    <div className="min-h-lg text-center text-neutral-300">등록된 글이 없습니다.</div>
  )
}