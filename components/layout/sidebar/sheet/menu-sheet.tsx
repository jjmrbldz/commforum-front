"use client"

import AuthUserButtons from "@/components/auth/auth-user-button";
import { NumberFormatter } from "@/components/number-formatter";
import SidebarTitle from "@/components/sidebar-title";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { menuList } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSiteDataStore } from "@/store/use-sitedata-store";
import Link from "next/link";
import MenuItemSheet from "./menu-item-sheet";

export default function MenuSheet() {
  const categories = useSiteDataStore(state => state.siteData?.categories);

  return (
    <>
      <AuthUserButtons />
      <SidebarTitle title="MENU" />
      <Accordion
        type="single"
        collapsible
        className="w-full text-xs"
        // defaultValue="item-1"
      >
        {menuList.map((item, index) => <MenuItemSheet key={index} path={item.href} title={item.title || ""} sublinks={item.children} />)}
      </Accordion>
      <SidebarTitle title="STATS" />
      <div className="text-xs font-light">
        <Link href={'/connected-users'} >
          <div className="flex items-center justify-between hover:text-red-500">
            <span>현재 접속자</span>
            <NumberFormatter className="text-right" value={642} suffix="명" />
          </div>
        </Link>
        <div className="flex items-center justify-between mt-1.5">
          <span>오늘 방문자</span>
          <NumberFormatter className="text-right" value={2963} suffix="명" />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span>어제 방문자</span>
          <NumberFormatter className="text-right" value={2942} suffix="명" />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span>최대 방문자</span>
          <NumberFormatter className="text-right" value={32815} suffix="명" />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span>전체 방문자</span>
          <NumberFormatter className="text-right" value={1622612} suffix="명" />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span>전체 회원수</span>
          <NumberFormatter className="text-right" value={4899} suffix="명" />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span>전체 게시물</span>
          <NumberFormatter className="text-right" value={478393} suffix="개" />
        </div>
      </div>
    </>
  )
}