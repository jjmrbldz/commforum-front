"use client"

import PageHeader from "@/components/page-header";
import Widget from "@/components/widget/widget";
import { oEventsBoard } from "@/lib/constants";

export default function EventCatPage({title}: {title: string}) {
  return (
    <>
      <PageHeader title={title} />
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