import SidePanelSkeleton from "./sidepanel-skeleton";

interface Props {
  isPanelLeft?: boolean;
  children?: React.ReactNode;
}

export default function PageLoadingSkeleton({ isPanelLeft = true, children } : Props) {
  return (
    <div className="max-w-7xl m-auto">
      <div className="grid md:grid-cols-12 p-4 md:p-0 gap-4">
        {isPanelLeft && <SidePanelSkeleton />}
        <div className="col-span-12 md:col-span-9 py-4 space-y-4">
          {children}
        </div>
        {!isPanelLeft && <SidePanelSkeleton />}
      </div>
    </div>
  )
}