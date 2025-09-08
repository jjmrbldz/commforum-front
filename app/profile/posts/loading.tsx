import TabSkeleton from "@/components/skeletons/tab-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function Loading() {
  return (
    <>
      <TabSkeleton />
      <Skeleton className="w-full h-[500px]" />
    </>
  )
}