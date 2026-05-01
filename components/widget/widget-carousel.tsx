import { Carousel } from "../ui/carousel";
import WidgetCarouselContent from "./widget-carousel-content";
import WidgetTitle from "./widget-title";
import { NonWidgetTabProps, WidgetProps } from "@/types";


export default function WidgetCarousel(props: WidgetProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: props.loop,
      }}
      className="w-full"
    >
      {props.showTitle && (
        <WidgetTitle title={props.title} isCarousel />
      )}
      <WidgetCarouselContent {...{
        ...props,
        data: props.data as NonWidgetTabProps[],
      }} 
      />
    </Carousel>
  )
}