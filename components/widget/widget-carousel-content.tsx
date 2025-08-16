import { WidgetCarouselProps } from "@/types"
import { CarouselContent, CarouselItem } from "../ui/carousel"
import { carouselItemClass, cn } from "@/lib/utils";
import WidgetList from "./widget-list";
import WidgetCarouselGallery from "./widget-carousel-gallery";
import Article from "../article/article";

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
  showAuthor,
  rankColor,
  showPoints
} : WidgetCarouselProps) {
  return data && data.length > 0 ? (
    <CarouselContent className="min-h-[100px]">
      {data.map((item, index) => (
        <CarouselItem key={index} className={cn("pl-4", carouselItemClass(carouselSize))}>
          {(layout === 'default' || layout === 'tab') && (
            <WidgetList {...{
              data: item,
              path,
              hasItemPrefix,
              dataLimitPerList,
              isReviews,
              addCategory,
              showRank,
              showAuthor,
              rankColor,
              showPoints,
            }} />
          )}

          {(layout === "gallery" || layout === "basic-gallery") && (
            <WidgetCarouselGallery {...{
              item,
              path,
              hasContentTitle,
            }} /> 
          )}

          {layout === "article" && (
            <Article 
              data={{
                ...item
              }}
            />
          )}
        </CarouselItem>
      ))}
    </CarouselContent>
  ) : (
    <div className="min-h-lg text-center text-neutral-300">등록된 글이 없습니다.</div>
  )
}