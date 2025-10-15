import WidgetTitle from "@/components/widget/widget-title";
import Article from "@/components/article/article";
import SidebarTitle from "@/components/sidebar-title";
import { NumberFormatter } from "@/components/number-formatter";


export default function BottomSection() {
  return (
    <>
      {/* <div className="">
        <WideBanner />
      </div> */}
      <div className="max-w-7xl m-auto">
        <div className="grid md:grid-cols-12 gap-4 p-4 md:p-0">
          <div className="col-span-12 md:col-span-9 py-4">
            <WidgetTitle title={"먹튀카지노"} />
            <div className="grid grid-cols-2 gap-4 my-4">
              <Article 
                data={{
                  id: 1,
                  title: "텍스트 유출범이 정의의 기사? 이해 못할 이 영화의 …",
                  description: "크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 지향적이고 집단 기능적 …",
                  author: "최고관리자",
                  date: "2022-10-19",
                  rating: 5
                }}
              />
              <Article 
                data={{
                  id: 2,
                  title: "김미녀, '사내결혼' 이어 KES '오늘의 웹툰' 주인공 …",
                  description: "크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 지향적이고 집단 기능적 …",
                  author: "최고관리자",
                  date: "2022-03-21",
                  rating: 3
                }}
              />
            </div>
          </div>
          <div className="hidden md:block col-span-3 py-4">
            <SidebarTitle title="접속자 집계" />
            <div className="text-xs font-light mt-4">
              <div className="flex items-center justify-between border-b border-slate-300 dark:border-white/40 py-3">
                <span>오늘방문자:</span>
                <NumberFormatter className="text-right" value={48} />
              </div>
              <div className="flex items-center justify-between border-b border-slate-300 dark:border-white/40 py-3">
                <span>어제방문자:</span>
                <NumberFormatter className="text-right" value={110} />
              </div>
              <div className="flex items-center justify-between border-b border-slate-300 dark:border-white/40 py-3">
                <span>최대방문자</span>
                <NumberFormatter className="text-right" value={230} />
              </div>
              <div className="flex items-center justify-between border-b border-slate-300 dark:border-white/40 py-3">
                <span>전체방문자</span>
                <NumberFormatter className="text-right" value={16408} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}