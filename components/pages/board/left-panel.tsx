"use client"

import AdBoxImage from "@/components/ads/adbox-img";
import AuthBox from "@/components/auth/auth-box";
import Widget from "@/components/widget/widget";
import { freeBoard, noticeFreeBoard, pointsTab, topComments } from "@/lib/constants";
import { useSiteDataStore } from "@/store/use-sitedata-store";

export default function LeftPanel() {
  const siteData = useSiteDataStore(state => state.siteData);

  return (
    <div className="hidden md:block col-span-3 py-4">
      <AuthBox />
      <AdBoxImage 
        href="https://t.me/winnerbrother"
        target="_blank"
        src={'/images/tg-ad1.png'}
        alt="Telegram of Winner Brother"
        className="w-full"
      />
      <Widget {...{
        title: "알림장",
        data: siteData?.noticePosts || [],
        path: '/posts', 
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
        data: siteData?.recentPosts || [],
        path: '/posts', 
        rootClassname: 'my-4',
        carouselSize: 1,
        showAuthor: true
      }} />
      <Widget {...{
        title: "댓글",
        data: siteData?.recentComments || [],
        path: '/posts', 
        rootClassname: 'my-4',
        carouselSize: 1,
        hasItemPrefix: false,
        showAuthor: true,
      }} />
      <Widget {...{
        layout: 'tab',
        tabNames: pointsTab.tabNames,
        data: {
          tab1: siteData?.topUserBalance || [],
          tab2: pointsTab.data.tab2,
        },
        routable: false,
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