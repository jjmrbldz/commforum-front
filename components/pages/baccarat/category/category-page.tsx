"use client"

import PageHeader from "@/components/page-header";
import Widget from "@/components/widget/widget";
import { baccBoard } from "@/lib/constants";
import { useState } from "react";


export default function BaccCatPage({title}: {title: string}) {
  const [viewMode, setViewMode] = useState("grid")
  return (
    <>
      <PageHeader title={title} viewMode={viewMode} onChangeView={(mode) => setViewMode(mode)} />
      <Widget {...{
        title: "보증 바카라 카지노",
        data: baccBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'basic-gallery',
      }} />
    </>
  )
}