import { WidgetCarouselProps } from "@/types"
import { CarouselContent, CarouselItem } from "../ui/carousel"
import { carouselItemClass, cn } from "@/lib/utils";
import WidgetList from "./widget-list";

export default function WidgetCarouselContent({
  // layout,
  data,
  dataLimitPerList,
  carouselSize,
  hasItemPrefix,
  path,
  isReviews,
  addCategory,
  showRank
} : WidgetCarouselProps) {
  return (
    <CarouselContent>
      {data.map((item, index) => (
        <CarouselItem key={index} className={cn("pl-4", carouselItemClass(carouselSize))}>
          <WidgetList {...{
            data: item,
            path,
            hasItemPrefix,
            dataLimitPerList,
            isReviews,
            addCategory,
            showRank
          }} />
        </CarouselItem>
      ))}
    </CarouselContent>
  )
}