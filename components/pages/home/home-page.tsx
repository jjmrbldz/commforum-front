import AdBoxImage from "@/components/ads/adbox-img";
import LoginForm from "@/components/forms/login-form";
import Banner from "@/components/pages/home/banner";
import Widget from "@/components/widget/widget";
import { baccBoard, freeBoard, noticeFreeBoard, oReviewBoard } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="grid grid-cols-12 gap-4">
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
        <div className="my-4">
          <Widget {...{
            title: "보증 바카라 카지노",
            data: baccBoard,
            path: '/board', 
            rootClassname: '',
            layout: 'basic-gallery',
          }} />
        </div>
      </div>
      <div className="col-span-3 py-4">
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
            rootClassname: '',
            carouselSize: 1,
          }} />
      </div>
    </div>
  );
}
