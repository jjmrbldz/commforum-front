"use client";

import ImagePreview from "@/components/image-preview";
import NotOkMessage from "@/components/not-ok-message";
import ReadOnlyContent from "@/components/readonly-content";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserInquiry } from "@/db/schema/inquiry";
import { cn, formatDate, isValidJSON } from "@/lib/utils";
import dayjs from "dayjs";
import { Check, CheckCheck, Loader } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";


export default function InquiryList({data}: {data: UserInquiry<"A">[]}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("MESSAGES", data)
    const timer = setTimeout(() => {
      const el = scrollRef.current;
      if (el && !loading) el.scrollTop = el.scrollHeight;
      setLoading(false)
    }, 500);

    return () => clearTimeout(timer);
  }, [loading, data.length]);

  return data.length === 0 ? (
    <div className="min-h-[400px]">
      <NotOkMessage variant={"warn"} message="No inquiries found." />
    </div>
  ) : ( loading ? (
      <div className="min-h-[400px] flex justify-center items-center">
        <Loader className="animate-spin m-auto" />
      </div>
    ) : (

      <div ref={scrollRef} className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
        {data?.map(item => (
          <div 
            key={item.id}
            className={cn(
              "flex flex-col", 
              item.sender === "user" ? "ml-auto items-end" : "mr-auto"
            )} 
          >
            {item.attachment && isValidJSON(item.attachment) && (
              <div className="p-1">
                <ImagePreview initialValue={item.attachment} />
              </div>
            )}
            <ReadOnlyContent 
              rootClassname={cn(
                "bg-slate-200/40 dark:bg-slate-900 w-max",
                item.sender === "user" ? "bg-slate-200 dark:bg-slate-700" : ""
              )} 
              className={cn(
                "min-h-[unset] px-3 py-3",
                
              )} 
              content={item.content!} 
            />
            <div 
              className={cn(
                "p-1 flex gap-2 align-center",
                item.sender === "user" ? "justify-end flex-row-reverse" : "justify-start"
              )} 
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  {item.partnerIsRead === 1 ? (<CheckCheck size={20} className="text-green-500" />) : <Check size={20} className="text-gray-400" />}
                </TooltipTrigger>
                <TooltipContent>
                  {item.partnerIsRead === 1 ? (
                    <p>Seen {formatDate(item.partnerLastReadDatetime!)}</p>
                  ) : (
                    <p>Sent {formatDate(item.regDatetime!)}</p>
                  )}
                </TooltipContent>
              </Tooltip>
              
              <span className="text-slate-400">{formatDate(item.regDatetime!)}</span>
            </div>
          </div>
        ))}
      </div>
    )
  )
}