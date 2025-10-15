"use client"

import LeftPanel from "@/components/pages/board/left-panel";
import { PagePanelProps } from "@/types";

export default function PageLayout({ isPanelLeft = false, children }: PagePanelProps) {
  return (
    <div className="max-w-7xl m-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-0 gap-4">
        {isPanelLeft && <LeftPanel />}
        <div className="col-span-12 md:col-span-9 py-4 space-y-4">
          {children}
        </div>
        {!isPanelLeft && <LeftPanel />}
      </div>
    </div>
  )
}