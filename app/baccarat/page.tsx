import Widget from "@/components/widget/widget";
import { baccBoard } from "@/lib/constants";


export default function Page() {
  return (
    <Widget {...{
      title: "보증 바카라 카지노",
      data: baccBoard,
      path: '/board', 
      rootClassname: 'my-4',
      layout: 'basic-gallery',
    }} />
  )
}