import { WidgetListProps } from "@/types";
import WidgetItemPrefix from "./widget-item-prefix";
import WidgetItem from "./widget-item";
import { Separator } from "../ui/separator";

export default function WidgetList({
  data,
  path,
  hasItemPrefix,
  dataLimitPerList,
  isReviews,
  addCategory,
  showRank
}: WidgetListProps) {
  return (
    <div className="">
      {hasItemPrefix && (
        <>
          <WidgetItemPrefix {...{
              data,
              path,
              isReviews
            }}
          />
          <Separator className="my-3" />
        </>
      )}
      {data.slice(hasItemPrefix ? 2 : 0, hasItemPrefix ? 7 : dataLimitPerList).map((item, index) => (
        <WidgetItem key={index} {...{
          item,
          path,
          isReviews,
          addCategory,
          showRank
        }} />
      ))}
    </div>
  )
}