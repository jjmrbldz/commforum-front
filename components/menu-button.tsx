"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSheetStore } from "@/store/use-sheet-store";

export function MenuButton() {
  const { setSheet } = useSheetStore();

  return (
    <Button variant={"ghost"} size="icon" className="size-8 hover:!bg-slate-700 hover:!text-white" onClick={() => setSheet("menu")}>
      <Menu className="size-6 md:size-4" />
    </Button>
  )
}
