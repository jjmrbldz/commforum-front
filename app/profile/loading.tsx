import PageLoadingSkeleton from "@/components/skeletons/loading-skeleton"
import SidePanelSkeleton from "@/components/skeletons/sidepanel-skeleton"
import TabSkeleton from "@/components/skeletons/tab-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <PageLoadingSkeleton>
      <TabSkeleton />
      <Skeleton className="w-full h-[500px]" />
    </PageLoadingSkeleton>
  )
}