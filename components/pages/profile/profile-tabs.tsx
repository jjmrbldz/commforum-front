"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkClassName = "block h-full flex-1 max-w-[150px]";
const tabTriggerClassName = "rounded-none w-full max-w-[150px]";

export default function ProfileTab() {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="border-t-[3px] border-gray-500 max-w-xl"></div>
      <Tabs defaultValue="/profile" value={pathname}>
        <TabsList className="rounded-none p-0 w-full justify-start">
          <Link href="/profile" className={linkClassName}>
            <TabsTrigger value="/profile" className={tabTriggerClassName}>
              <div className="flex gap-1 items-center">
                <User className="size-4" />
                <div className="text-xs">마이페이지</div>
              </div>
            </TabsTrigger>
          </Link>
          <Link href="/profile/posts" className={linkClassName}>
            <TabsTrigger value="/profile/posts" className={tabTriggerClassName}>
              <div className="flex gap-1 items-center">
                <Pencil className="size-4" />
                <div className="text-xs">내글 반응</div>
              </div>
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  )
}