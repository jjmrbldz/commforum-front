import { chunkWithRandomPrefixes, cn } from "@/lib/utils";
import WidgetTitle from "./widget-title";
import { WidgetProps } from "@/types";
import { Carousel } from "../ui/carousel";
import WidgetCarouselContent from "./widget-carousel-content";
import WidgetBasicGallery from "./widget-basic-gallery";

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
  hasContentTitle = true,
} : WidgetProps) {
  return (
    <div className={cn("max-w-full", rootClassname)}>
      {layout === "basic-gallery" ? (
        <WidgetBasicGallery {...{
          title,
          data,
          path,
          hasContentTitle
        }} />
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <WidgetTitle title={title} isCarousel />
          <WidgetCarouselContent {...{
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
      )}
    </div>
  )
}