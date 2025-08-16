"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSheetStore } from "@/store/use-sheet-store";
import { cn } from "@/lib/utils";

export function MenuButton({ className = "" } : { className?: string }) {
  const { setSheet } = useSheetStore();

  return (
    <Button variant={"ghost"} size="icon" className={cn("size-8 hover:!bg-slate-700 hover:!text-white", className)} onClick={() => setSheet("menu")}>
      <Menu className="size-6 md:size-4" />
    </Button>
  )
}
