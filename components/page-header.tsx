import { LayoutGrid, LayoutList, LayoutPanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  viewMode: string;
  onChangeView: (mode: string) => void;
}

export default function PageHeader({ title, viewMode, onChangeView }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4">
      {/* Left: Title with yellow bar */}
      <div className="flex items-center space-x-2">
        <div className="w-1.5 h-5 bg-yellow-500 rounded-sm" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="w-px h-5 bg-gray-300 mx-2" />
      </div>

      {/* Right: View selector */}
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
    </div>
  );
}
