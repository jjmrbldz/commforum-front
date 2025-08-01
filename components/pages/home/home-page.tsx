import AdBoxImage from "@/components/ads/adbox-img";
import LoginForm from "@/components/forms/login-form";
import Banner from "@/components/pages/home/banner";
import Widget from "@/components/widget/widget";
import { baccBoard, casinoBoard, freeBoard, noticeFreeBoard, oEventsBoard, oReviewBoard, pointsTab, slotsBoard, specialBoard, topComments } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="grid md:grid-cols-12 gap-4 p-4 md:p-0">
      <div className="col-span-9 py-4">
        <Banner />
        <div className="grid grid-cols-2 gap-4 my-4">
          <Widget {...{
            title: "온카,슬롯 후기",
            data: oReviewBoard,
            path: '/board', 
            rootClassname: '',
            isReviews: true,
          }} />
          <Widget {...{
            title: "자유게시판",
            data: freeBoard,
            path: '/board', 
            rootClassname: ''
          }} />
        </div>
        <Widget {...{
          title: "보증 바카라 카지노",
          data: baccBoard,
          path: '/board', 
          rootClassname: 'my-4',
          layout: 'basic-gallery',
        }} />
        <Widget {...{
          title: "보증 슬롯 카지노",
          data: slotsBoard,
          path: '/board', 
          rootClassname: 'my-4',
          layout: 'basic-gallery',
        }} />
        <Widget {...{
          title: "진행중 이벤트",
          data: oEventsBoard,
          path: '/board', 
          rootClassname: 'my-4',
          layout: 'basic-gallery',
        }} />
        <Widget {...{
          title: "스페셜",
          data: specialBoard,
          path: '/board', 
          rootClassname: 'my-4',
          layout: 'gallery',
          carouselSize: 3,
          hasItemPrefix: false,
          chunkData: false,
          hasContentTitle: false,
          loop: true
        }} />
        <div className="grid grid-cols-3 gap-4">  
          <Widget {...{
            title: "베스트글",
            data: noticeFreeBoard,
            path: '/board', 
            rootClassname: '',
            hasItemPrefix: false,
            carouselSize: 1,
            addCategory: true,
          }} />
          <Widget {...{
            title: "공지사항",
            data: noticeFreeBoard.slice(2, 4),
            path: '/board', 
            rootClassname: '',
            hasItemPrefix: false,
            carouselSize: 1,
            addCategory: true,
            showRank: false,
          }} />
          <Widget {...{
            title: "명예의 전당",
            data: noticeFreeBoard.slice(0, 1),
            path: '/board', 
            rootClassname: '',
            hasItemPrefix: false,
            carouselSize: 1,
            addCategory: true,
            showRank: false,
          }} />
        </div>
        <Widget {...{
          title: "먹튀 카지노",
          data: casinoBoard,
          path: '/board', 
          rootClassname: 'my-4',
          layout: 'gallery',
          carouselSize: 3,
          hasItemPrefix: false,
          chunkData: false,
          hasContentTitle: false,
          loop: true
        }} />
      </div>
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
    </div>
  );
}
