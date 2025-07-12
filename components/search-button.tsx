import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SearchButton() {
  return (
    <Button variant={"ghost"} size="icon" className="size-8 hover:!bg-neutral-500 hover:!text-white">
      <Search />
    </Button>
  )
}
