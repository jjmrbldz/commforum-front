import Widget from "@/components/widget/widget";
import { pointsTab } from "@/lib/constants";


export default function Page() {
  return (
    <Widget {...{
      layout: 'tab',
      tabNames: pointsTab.tabNames,
      data: pointsTab.data,
      path: '/board', 
      rootClassname: '',
      carouselSize: 1,
      hasItemPrefix: false,
      showAuthor: false,
      dataLimitPerList: 20,
      showPoints: true,
      // rankColor: 'bg-green-500'
    }} />
  )
}