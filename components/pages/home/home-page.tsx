import AdBoxImage from "@/components/ads/adbox-img";
import Article from "@/components/article/article";
import Banner from "@/components/pages/home/banner";
import Widget from "@/components/widget/widget";
import banner3 from "@/assets/images/banner/banner-3.jpg";
import { articleWidget, baccBoard, freeBoard, noticeFreeBoard, oEventsBoard, pointsTab, slotsBoard } from "@/lib/constants";
import BannerCarousel from "./banner-carousel";
import WidgetTitle from "@/components/widget/widget-title";
import BottomSection from "./bottom-section";
import AuthBox from "@/components/auth/auth-box";

export default function HomePage() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <div className="grid md:grid-cols-12 gap-4 p-4 md:p-0">
          <div className="col-span-12 mt-4">
            <Banner />
          </div>
          <div className="col-span-12 md:col-span-9 py-4">
            <WidgetTitle title={"온카 후기 게시판"} />
            <div className="grid grid-cols-2 gap-4 my-4">
              <Article 
                data={{
                  id: 1,
                  title: "AI 덕분에 컴퓨터도 전문가 장비 수준으로 진화",
                  description: "모집자와 제공자간 거래크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 …",
                  author: "백마탄환자",
                  date: "2022-03-22",
                  rating: 5
                }}
              />
              <Article 
                data={{
                  id: 2,
                  title: "조립 게이밍 컴퓨터의 혁명, 7세대 '브랑' 출시",
                  description: "모집자와 제공자간 거래크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 …",
                  author: "백마탄환자",
                  date: "2022-03-21",
                  rating: 3
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-8 mb-4">
              <Article 
                orientation="landscape"  
                data={{
                  id: 3,
                  title: "'디포'의 차세대 메모리와 컨트롤러 출시",
                  description: "모집자와 제공자간 거래크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 지향적이고 집단 기능적 속성…",
                  author: "시베리안허숙희",
                  date: "2022-03-21",
                }}
              />
              <Article 
                orientation="landscape"  
                data={{
                  id: 4,
                  title: "게임의 활성화와 규제",
                  description: "모집자와 제공자간 거래크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 지향적이고 집단 기능적 속성…",
                  author: "할인의추억",
                  date: "2022-03-21",
                }}
              />
            </div>
            <BannerCarousel images={[banner3]} />
            {/* <div className="grid grid-cols-2 gap-4 my-4">
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
            </div> */}
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
            {/* <Widget {...{
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
            }} /> */}
            <div className="grid grid-cols-2 gap-4">  
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
            </div>
            {/* <Widget {...{
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
            }} /> */}
          </div>
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
              title: "명예의 전당",
              data: noticeFreeBoard.slice(0, 1),
              path: '/board', 
              rootClassname: '',
              hasItemPrefix: false,
              carouselSize: 1,
              addCategory: true,
              showRank: false,
            }} />
            {/* <Widget {...{
              title: "알림장",
              data: noticeFreeBoard,
              path: '/board', 
              rootClassname: '',
              hasItemPrefix: false,
              carouselSize: 1,
              addCategory: true,
            }} /> */}
            {/* <AdBoxImage 
              href="?hbw=3"
              src={'/images/ad2.gif'}
              alt="Some content"
              className="w-full"
            /> */}
            <AdBoxImage 
              href="?hbw=4"
              src={'/images/ad3.png'}
              alt="Some content"
              className="w-full"
            />
            <Widget {...{
              title: "갤러리 유튜브",
              layout: "article",
              data: articleWidget,
              path: '/board', 
              rootClassname: 'my-4',
              carouselSize: 1,
              hasItemPrefix: false,
              chunkData: false,
            }} />
            <Widget {...{
              title: "최근글",
              data: freeBoard,
              path: '/board', 
              rootClassname: 'my-4',
              carouselSize: 1,
            }} />            
            {/* <Widget {...{
              title: "댓글",
              data: topComments,
              path: '/board', 
              rootClassname: 'my-4',
              carouselSize: 1,
              hasItemPrefix: false,
              showAuthor: true,
            }} /> */}
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
      </div>
      <BottomSection />
    </>
  );
}
