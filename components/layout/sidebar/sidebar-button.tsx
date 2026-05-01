"use client"

import { Bell, Menu, Search, User, X } from "lucide-react";
import { Button } from "../../ui/button";
import { useSheetStore } from "@/store/use-sheet-store";
import { cn } from "@/lib/utils";

export default function SidebarButton({
  isInsideSheet = false
}: {
  isInsideSheet?: boolean;
}) {
  const setSheet = useSheetStore((state) => state.setSheet);

  const btnClass = isInsideSheet ? "" : "rounded-full";

  return (
    <div className={cn(
      "fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center",
      isInsideSheet && "gap-0 absolute right-full top-1/3"
    )}>
      {isInsideSheet && (
        <Button variant={"secondary"} size={'icon'} className={cn(btnClass)} onClick={() => setSheet(null)}>
          <X />
        </Button>
      )}
      <Button size={'icon'} className={cn(btnClass)} onClick={() => setSheet("menu")}>
        <Menu />
      </Button>
      <Button size={'icon'} className={cn(btnClass)} onClick={() => setSheet("user")}>
        <User />
      </Button>
      <Button size={'icon'} className={cn(btnClass)} onClick={() => setSheet("notif")}>
        <Bell />
      </Button>
      <Button size={'icon'} className={cn(btnClass)} onClick={() => setSheet("search")}>
        <Search />
      </Button>
    </div>
  )
}