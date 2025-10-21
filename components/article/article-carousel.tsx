"use client"

import { useEffect, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay"
import { formatDate, parseImage } from "@/lib/utils";
import { PostData } from "@/types";
import Article from "./article";
import WidgetTitle from "../widget/widget-title";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ContentPlainText from "../content-plaintext";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const tabs = [
  {
    value: "casino",
    children: "온카",
  },
  {
    value: "slot",
    children: "슬롯",
  },
  {
    value: "freeboard",
    children: "자유",
  },
]

export default function ArticleCarousel({data}: {data: PostData[]}) {
  const [categoryFilter, setCategoryFilter] = useState("casino");
  // const [list, setList] = useState(data?.filter(item => item.category === categoryFilter) || []);

  const list = useMemo(() => {
    return data.filter(item => item.category === categoryFilter)
  }, [categoryFilter]);

  console.log("fitlered list",list)

  // useEffect(() => {
  //   setList((prev) => prev.filter(item => item.category === categoryFilter))
  // }, [categoryFilter])

  return data.length > 0 && (
    <div className="my-4 max-w-[calc(100vw-2rem)] md:max-w-none">
      <div className="mb-4 flex items-center">
        <WidgetTitle rootClassName="flex-1" title={"온카 후기 게시판"} />
        <div className="text-lg">
          <Tabs defaultValue="casino" >
            <TabsList className="bg-[unset]">
              {tabs.map((item, index) => (
                <TabsTrigger 
                  key={index} 
                  value={item.value} 
                  onClick={() => setCategoryFilter(item.value)}
                  className="rounded-none border-b border-transparent data-[state=active]:bg-[unset] dark:data-[state=active]:bg-[unset] data-[state=active]:shadow-none  data-[state=active]:border-b-red-500 dark:data-[state=active]:border-transparent dark:data-[state=active]:border-b-red-500 pb-3 md:px-4 outline-none"
                >
                  <span className="text-lg font-light">
                    {item.children}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Carousel
        // opts={{
        //   loop: true,
        // }}
        className=""
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-4">
          {list
            .map(item => (
              <CarouselItem key={`${item.id}-${item.categoryId}`} className="basis-1/1 md:basis-1/2 pl-4">
                <Article 
                  data={{
                    id: item.id,
                    title: item.title,
                    description: <ContentPlainText content={item.content} />,
                    img: parseImage(item.thumbnail!),
                    author: item.authorName,
                    date: formatDate(item.regDatetime!, "MM.DD"),
                    rating: item.commentCount || undefined
                  }}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="grid grid-cols-2 gap-4 my-4">
        
      </div> */}
    </div>
  )
}