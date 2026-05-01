import Article from "@/components/article/article";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import WidgetTitle from "@/components/widget/widget-title";
import Link from "next/link";


export default function WideBanner() {
  return (
    <div className="md:min-h-[500px] flex items-stretch flex-col md:flex-row">
      <div className="bg-neutral-800 h-[inherit] md:min-w-md flex items-center">
        <div className="flex-1 p-4">
          <WidgetTitle title="회원 갤러리" titleClass="text-white" />
          <Link href={"/board/gallery"} className="text-muted-foreground text-base">회원분들이 직접 올린 사진 및 영상을 함께 감상해 보세요.</Link>
        </div>
      </div>
      <div className="flex-1 p-4 bg-black">
        <Carousel 
          className="h-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="h-[inherit]">
            <CarouselItem className="pl-4 !basis-1/1 md:!basis-1/4">
              <Article 
                imageAspectRatio="aspect-video md:aspect-9/10"
                titleClass="text-white"
                footerClass="text-muted dark:text-muted-foreground"
                noDesc
                data={{
                  id: 1,
                  title: "AI 덕분에 컴퓨터도 전문가 장비 수준으로 진화",
                  author: "백마탄환자",
                  date: "2022-03-22",
                  rating: 5
                }}
              />
            </CarouselItem>
            <CarouselItem className="pl-4 !basis-1/1 md:!basis-1/4">
              <Article 
                imageAspectRatio="aspect-video md:aspect-9/10"
                titleClass="text-white"
                footerClass="text-muted dark:text-muted-foreground"
                noDesc
                data={{
                  id: 1,
                  title: "1분기 원자재 리스크 이어져..정유·화학 '흐림'",
                  author: "백마탄환자",
                  date: "2022-03-22",
                  rating: 5
                }}
              />
            </CarouselItem>
            <CarouselItem className="pl-4 !basis-1/1 md:!basis-1/4">
              <Article 
                imageAspectRatio="aspect-video md:aspect-9/10"
                titleClass="text-white"
                footerClass="text-muted dark:text-muted-foreground"
                noDesc
                data={{
                  id: 1,
                  title: "HC은행, 디지털 혁신인재 일자리 창출 업무협약 체결",
                  author: "백마탄환자",
                  date: "2022-03-22",
                  rating: 5
                }}
              />
            </CarouselItem>
            <CarouselItem className="pl-4 !basis-1/1 md:!basis-1/4">
              <Article 
                imageAspectRatio="aspect-video md:aspect-9/10"
                titleClass="text-white"
                footerClass="text-muted dark:text-muted-foreground"
                noDesc
                data={{
                  id: 1,
                  title: "청년들을 전문가로 키운다..'스포츠 아카데미' 개설",
                  author: "백마탄환자",
                  date: "2022-03-22",
                  rating: 5
                }}
              />
            </CarouselItem>
            <CarouselItem className="pl-4 !basis-1/1 md:!basis-1/4">
              <Article 
                imageAspectRatio="aspect-video md:aspect-9/10"
                titleClass="text-white"
                footerClass="text-muted dark:text-muted-foreground"
                noDesc
                data={{
                  id: 1,
                  title: "자바그룹, 지난해 사회공헌에 4220억원 투입",
                  author: "백마탄환자",
                  date: "2022-03-22",
                  rating: 5
                }}
              />
            </CarouselItem>            
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}