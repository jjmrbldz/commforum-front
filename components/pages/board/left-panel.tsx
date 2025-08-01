import AdBoxImage from "@/components/ads/adbox-img";
import LoginForm from "@/components/forms/login-form";
import Widget from "@/components/widget/widget";
import { freeBoard, noticeFreeBoard, pointsTab, topComments } from "@/lib/constants";

export default function LeftPanel() {
  return (
    <div className="hidden md:block col-span-3 py-4">
      <LoginForm />
      <AdBoxImage 
        href="https://t.me/winnerbrother"
        target="_blank"
        src={'/images/tg-ad1.png'}
        alt="Telegram of Winner Brother"
        className="w-full"
      />
      <Widget {...{
        title: "알림장",
        data: noticeFreeBoard,
        path: '/board', 
        rootClassname: '',
        hasItemPrefix: false,
        carouselSize: 1,
        addCategory: true,
      }} />
      <AdBoxImage 
        href="?hbw=3"
        src={'/images/ad2.gif'}
        alt="Some content"
        className="w-full"
      />
      <AdBoxImage 
        href="?hbw=4"
        src={'/images/ad3.png'}
        alt="Some content"
        className="w-full"
      />
      <Widget {...{
        title: "최근글",
        data: freeBoard,
        path: '/board', 
        rootClassname: 'my-4',
        carouselSize: 1,
      }} />
      <Widget {...{
        title: "댓글",
        data: topComments,
        path: '/board', 
        rootClassname: 'my-4',
        carouselSize: 1,
        hasItemPrefix: false,
        showAuthor: true,
      }} />
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
    </div>
  )
}