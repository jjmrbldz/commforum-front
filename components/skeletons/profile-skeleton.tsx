import { Skeleton } from "../ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="h-[152px] w-full">
      <div className="flex gap-2">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-[20px] w-40" />
          <Skeleton className="h-[20px] w-30" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Skeleton className="h-[32px] w-full" />
        <Skeleton className="h-[32px] w-full" />
      </div>
    </div>
  )
}