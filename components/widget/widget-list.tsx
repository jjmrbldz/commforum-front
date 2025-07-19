import { WidgetListProps } from "@/types";
import WidgetItemPrefix from "./widget-item-prefix";
import WidgetItem from "./widget-item";

export default function WidgetList({
  data,
  path,
  hasItemPrefix,
  dataLimitPerList,
  isReviews
}: WidgetListProps) {
  return (
    <div className="">
      {hasItemPrefix && (
        <WidgetItemPrefix {...{
            data,
            path,
            isReviews
          }}
        />
      )}
      {data.slice(hasItemPrefix ? 2 : 0, hasItemPrefix ? 7 : dataLimitPerList).map((item, index) => (
        <WidgetItem key={index} {...{
          item,
          path,
          isReviews
        }} />
      ))}
    </div>
  )
}