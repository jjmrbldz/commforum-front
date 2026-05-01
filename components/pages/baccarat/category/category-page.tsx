"use client"

import PageHeader from "@/components/page-header";
import Widget from "@/components/widget/widget";
import { baccBoard } from "@/lib/constants";

export default function BaccCatPage({title}: {title: string}) {
  return (
    <>
      <PageHeader title={title} />
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