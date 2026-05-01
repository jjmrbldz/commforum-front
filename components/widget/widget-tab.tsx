import { WidgetTabProps } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import WidgetTitle from "./widget-title";
import React, { useMemo } from "react";
import { chunkWithRandomPrefixes } from "@/lib/utils";
import WidgetCarouselContent from "./widget-carousel-content";
import { Carousel } from "../ui/carousel";

export default function WidgetTab({layout = 'tab', dataLimitPerList = 5,  ...props}: WidgetTabProps) {
  
  const data = useMemo(() => {
    if (!props.chunkData) return props.data;

    return Object.fromEntries(
      Object.entries(props.data).map(([key, value]) => [
        key,
        chunkWithRandomPrefixes(
          value,
          props.hasItemPrefix ? dataLimitPerList + 2 : dataLimitPerList,
          props.hasItemPrefix ? 2 : 0
        ),
      ])
    );
  }, [props.data, props.chunkData, props.hasItemPrefix, dataLimitPerList]);

  return (
    <Tabs defaultValue={props.tabNames[0].value}>
      <TabsList className="bg-unset">
        <WidgetTitle 
          className="gap-2"
          title={props.tabNames.map(item => (
            <React.Fragment key={item.value}>
              <TabsTrigger className="p-0 bg-unset data-[state=active]:shadow-none text-lg font-bold data-[state=active]:text-yellow-500" value={item.value}>{item.label}</TabsTrigger>
              <span className="last:hidden text-lg font-bold">/</span>
            </React.Fragment>
          ))}
          isTab
        />
      </TabsList>
      {Object.entries(data).map(([key, value], index) => (
        <TabsContent key={key} value={key}>
          <Carousel
            opts={{
              align: "start",
              loop: props.loop,
            }}
            className="w-full"
          >  
            <WidgetCarouselContent {...{
                ...props,
                layout,
                rankColor: layout === 'tab' && index % 2 !== 0 ? 'bg-green-500' : '',
                data: value.flat(),
              }} 
            />
          </Carousel>
        </TabsContent>
      ))}
    </Tabs>
  )
}