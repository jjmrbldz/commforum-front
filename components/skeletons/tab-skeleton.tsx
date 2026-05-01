import { Skeleton } from "../ui/skeleton";


export default function TabSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <Skeleton className="h-[35px] w-full max-w-[150px]" />
      <Skeleton className="h-[35px] w-full max-w-[150px]" />
      <Skeleton className="h-[35px] w-full max-w-[150px]" />
    </div>
  )
}