"use client"

import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "../../ui/button";
import { useSheetStore } from "@/store/use-sheet-store";

export default function SidebarButton() {
  const setSheet = useSheetStore((state) => state.setSheet);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center">
      <Button size={'icon'} className="rounded-full" onClick={() => setSheet("menu")}>
        <Menu />
      </Button>
      <Button size={'icon'} className="rounded-full" onClick={() => setSheet("user")}>
        <User />
      </Button>
      <Button size={'icon'} className="rounded-full" onClick={() => setSheet("notif")}>
        <Bell />
      </Button>
      <Button size={'icon'} className="rounded-full" onClick={() => setSheet("search")}>
        <Search />
      </Button>
    </div>
  )
}