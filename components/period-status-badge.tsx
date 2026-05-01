import { userLevelClasses } from "@/lib/constants";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface Props {
  className?: string;
  isRounded?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  isHot?: boolean;
}

function progressProps(
  startDate?: string | null,
  endDate?: string | null
): { text: string; bgColor: string; borderTColor: string; } | undefined {
  if (!startDate || !endDate) return { text: "", bgColor: "", borderTColor: "" };

  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (now.isBefore(start)) {
    return { text: "대기", bgColor: "bg-gray-500", borderTColor: "border-t-gray-500" }; // waiting
  } else if (now.isAfter(end)) {
    return { text: "종료", bgColor: "bg-green-500", borderTColor: "border-t-green-500" }; // ended
  } else {
    return { text: "진행", bgColor: "bg-orange-500", borderTColor: "border-t-orange-500" }; // in progress
  }
}

export function PeriodStatusBadge({className = "", startDate, endDate, isRounded = false}: Props) {

  return (
    <span 
      className={cn(
        "inline-flex justify-center items-center w-8 h-5 text-center text-[10px] font-bold text-nowrap bg-blue-500 text-white",
        className,
        isRounded && "rounded-full size-5 px-0",
        progressProps(startDate, endDate)?.bgColor
      )}
    >
      { progressProps(startDate, endDate)?.text }
    </span>
  );
}

export function PeriodStatusTag({className = "", startDate, endDate, isHot}: Props) {

  return (
    <div className={cn(
      "absolute top-0 right-0 w-0 h-0 border-t-[60px] border-l-[60px] border-t-orange-500 border-l-transparent", 
      className,
      !isHot ? progressProps(startDate, endDate)?.borderTColor : "border-t-orange-500",
    )}>
      <span className="absolute top-[-50px] right-[5px] rotate-45 text-white text-xs font-bold whitespace-nowrap">
        { !isHot ? progressProps(startDate, endDate)?.text : "HOT" }
      </span>
    </div>
  );
}