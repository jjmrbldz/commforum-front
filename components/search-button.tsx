"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSheetStore } from "@/store/use-sheet-store";

export function SearchButton() {
  const { setSheet } = useSheetStore();

  return (
    <Button variant={"ghost"} size="icon" className="size-8 hover:!bg-slate-700 hover:!text-white" onClick={() => setSheet("search")}>
      <Search />
    </Button>
  )
}
