"use client"

import PageHeader from "@/components/page-header";
import Widget from "@/components/widget/widget";
import { oEventsBoard } from "@/lib/constants";
import { useState } from "react";


export default function EventCatPage({title}: {title: string}) {
  const [viewMode, setViewMode] = useState("grid")
  return (
    <>
      <PageHeader title={title} viewMode={viewMode} onChangeView={(mode) => setViewMode(mode)} />
      <Widget {...{
        title: "진행중 이벤트",
        data: oEventsBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'basic-gallery',
      }} />
    </>
  )
}