import { chunkWithRandomPrefixes, cn } from "@/lib/utils";
import { NonWidgetTabProps, WidgetProps, WidgetTabProps } from "@/types";
import WidgetBasicGallery from "./widget-basic-gallery";
import WidgetCarousel from "./widget-carousel";
import WidgetTab from "./widget-tab";

export default function Widget({
  layout = "default",
  title,
  data,
  dataLimitPerList = 5,
  carouselSize = 2,
  hasItemPrefix = true,
  path,
  rootClassname = "",
  rankColor = "",
  isReviews = false,
  addCategory = false,
  showRank = true,
  hasContentTitle = true,
  chunkData = true,
  loop = false,
  showAuthor = false,
  showPoints = false,
  showTitle = true,
  tabNames,
  routable = true,
} : WidgetProps) {
  return (
    <div className={cn("max-w-full", rootClassname)}>
      {layout === "tab" && (
        <WidgetTab {...{
          layout,
          tabNames,
          title,
          dataLimitPerList,
          carouselSize,
          hasItemPrefix,
          path,
          rootClassname,
          isReviews,
          addCategory,
          showRank,
          hasContentTitle,
          chunkData,
          loop,
          showAuthor,
          showTitle,
          rankColor,
          showPoints,
          routable,
          data: chunkData ? 
            Object.fromEntries(
              Object.entries(data).map(([key, value]) => [key, chunkWithRandomPrefixes(
              value, 
              hasItemPrefix ? dataLimitPerList + 2 : dataLimitPerList, 
              hasItemPrefix ? 2 : 0
            )])
            ) : 
            data,
        } as WidgetTabProps} />
      )}

      {layout === "basic-gallery" && (
        <WidgetBasicGallery {...{
          title,
          data: data as NonWidgetTabProps['data'],
          path,
          hasContentTitle,
          routable
        }} />
      )}

      {(layout === "default" || layout === "gallery" || layout === "article") && (
        <WidgetCarousel {...{
          layout,
          title,
          dataLimitPerList,
          carouselSize,
          hasItemPrefix,
          path,
          rootClassname,
          isReviews,
          addCategory,
          showRank,
          hasContentTitle,
          chunkData,
          loop,
          showAuthor,
          showTitle,
          routable,
          data: chunkData ? 
            chunkWithRandomPrefixes(
              data as NonWidgetTabProps['data'], 
              hasItemPrefix ? dataLimitPerList + 2 : dataLimitPerList, 
              hasItemPrefix ? 2 : 0) : 
              data as NonWidgetTabProps['data'],
        }} />
      )}


    </div>
  )
}