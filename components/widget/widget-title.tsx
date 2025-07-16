import { ReactNode } from "react";

export default function WidgetTitle({
  title
} : {
  title: ReactNode;
}) {
  return (
    <div className="">
      <div className="text-lg font-bold">{title}</div>
      <div className="my-2 flex items-center">
        <div className="h-[3px] bg-slate-700 w-[45px]"></div>
        <div className="h-[1px] bg-slate-700 flex-1"></div>
      </div>
    </div>
  )
}