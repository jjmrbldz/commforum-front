import Widget from "@/components/widget/widget";
import { oEventsBoard } from "@/lib/constants";


export default function Page() {
  return (
    <Widget {...{
      title: "진행중 이벤트",
      data: oEventsBoard,
      path: '/board', 
      rootClassname: 'my-4',
      layout: 'basic-gallery',
    }} />
  )
}