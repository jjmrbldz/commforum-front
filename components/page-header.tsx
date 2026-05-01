import { LayoutGrid, LayoutList, LayoutPanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4 px-3 border border-gray-200 dark:border-gray-800 rounded">
      {/* Left: Title with yellow bar */}
      <div className="flex items-center space-x-2">
        <div className="w-1.5 h-5 bg-yellow-500 rounded-sm" />
        <h2 className="text-lg font-semibold">{title}</h2>
        {/* <div className="w-px h-5 bg-gray-300 mx-2" /> */}
      </div>
      
      <div className="hidden md:flex gap-2 items-center justify-end">
        <Link href={"/posts/guide"} className="hover:underline opacity-60">타짜 가이드</Link>
        <span className="opacity-60">|</span>
        <Link href={"/posts/eventtazza"} className="hover:underline opacity-60">타짜 이벤트</Link>
        <span className="opacity-60">|</span>
        <Link href={"/posts/casino"} className="hover:underline opacity-60">보증 바카라 카지노</Link>
        <span className="opacity-60">|</span>
        <Link href={"/posts/scamcasino"} className="hover:underline opacity-60">먹튀 카지노</Link>
        <span className="opacity-60">|</span>
        <Link href={"/posts/freeboard"} className="hover:underline opacity-60">온라인 게시판</Link>
        <span className="opacity-60">|</span>
        <Link href={"/posts/reviewboard"} className="hover:underline opacity-60">온카 후기 게시판</Link>
        <span className="opacity-60">|</span>
        <Link href={"/point-exchange"} className="hover:underline opacity-60">타짜 포인트 교환</Link>
        <span className="opacity-60">|</span>
        <Link href={"/inquiry"} className="hover:underline opacity-60">1:1문의</Link>
      </div>
      {/* Right: View selector */}
      {/* {onChangeView !== undefined && (
        <div className="flex space-x-1 bg-gray-100 rounded overflow-hidden">
          <Button
            variant="ghost"
            className={viewMode === "grid" ? "bg-white" : ""}
            size="icon"
            onClick={() => onChangeView("grid")}
          >
            <LayoutGrid className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className={viewMode === "table" ? "bg-white" : ""}
            size="icon"
            onClick={() => onChangeView("table")}
          >
            <LayoutPanelTop className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className={viewMode === "compact" ? "bg-white" : ""}
            size="icon"
            onClick={() => onChangeView("compact")}
          >
            <LayoutList className="w-5 h-5" />
          </Button>
        </div>
      )} */}
    </div>
  );
}
