import ProfileSkeleton from "@/components/skeletons/profile-skeleton";
import SidePanelSkeleton from "@/components/skeletons/sidepanel-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return (
    <div className="max-w-7xl m-auto">
      <div className="grid md:grid-cols-12 gap-4 p-4 md:p-0">
        <div className="col-span-12 mt-4">
          <Skeleton className="h-[290px] w-full" />
        </div>
        <div className="col-span-12 md:col-span-9 py-4 space-y-4">
          <Skeleton className="h-[30px] w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-[360px] w-full" />
            <Skeleton className="h-[360px] w-full" />
          </div>
        </div>
        <SidePanelSkeleton />
      </div>
    </div>
  )
}