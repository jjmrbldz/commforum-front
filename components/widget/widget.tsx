import { chunkWithRandomPrefixes, cn } from "@/lib/utils";
import WidgetCarousel from "./widget-carousel";
import WidgetTitle from "./widget-title";
import { WidgetProps } from "@/types";
import { Carousel } from "../ui/carousel";

export default function Widget({
  layout = "default",
  title,
  data,
  dataLimitPerList = 5,
  carouselSize = 2,
  hasItemPrefix = true,
  path,
  rootClassname = "",
  isReviews = false,
  addCategory = false,
  showRank = true,
} : WidgetProps) {
  return (
    <div className={cn("max-w-full", rootClassname)}>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <WidgetTitle title={title} />
        <WidgetCarousel {...{
            layout,
            data: chunkWithRandomPrefixes(data, hasItemPrefix ? dataLimitPerList + 2 : dataLimitPerList, hasItemPrefix ? 2 : 0),
            dataLimitPerList,
            carouselSize,
            hasItemPrefix,
            path,
            isReviews,
            addCategory,
            showRank,
          }} 
        />
    </Carousel>
    </div>
  )
}