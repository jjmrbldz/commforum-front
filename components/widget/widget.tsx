import { chunkWithRandomPrefixes, cn } from "@/lib/utils";
import WidgetCarousel from "./widget-carousel";
import WidgetTitle from "./widget-title";
import { WidgetProps } from "@/types";

export default function Widget({
  layout = "default",
  title,
  data,
  dataLimitPerList = 7,
  carouselSize = 2,
  hasItemPrefix = true,
  path,
  rootClassname = ""
} : WidgetProps) {
  return (
    <div className={cn("max-w-full", rootClassname)}>
      <WidgetTitle title={title} />
      <WidgetCarousel {...{
          layout,
          data: chunkWithRandomPrefixes(data),
          dataLimitPerList,
          carouselSize,
          hasItemPrefix,
          path
        }} 
      />
    </div>
  )
}