import SearchForm from "@/components/forms/search-form";
import LeftPanel from "@/components/pages/board/left-panel";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <LeftPanel />
      <div className="col-span-9 py-4">
        <SearchForm className="mb-8" />
        {children}
      </div>
    </div>
  )
}