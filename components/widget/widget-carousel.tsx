import { WidgetCarouselProps } from "@/types"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import { carouselItemClass, cn } from "@/lib/utils";
import WidgetList from "./widget-list";

export default function WidgetCarousel({
  // layout,
  data,
  dataLimitPerList,
  carouselSize,
  hasItemPrefix,
  path
} : WidgetCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index} className={cn("pl-4", carouselItemClass(carouselSize))}>
            <WidgetList {...{
              data: item,
              path,
              hasItemPrefix,
              dataLimitPerList
            }} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}