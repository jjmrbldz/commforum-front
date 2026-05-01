import { Skeleton } from "../ui/skeleton";


export default function GridSkeleton() {
  
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-[174px]" />
          <div className="space-y-2">
            <Skeleton className="w-[110px] h-[24px]" />
            <Skeleton className="w-[260px] h-[18px]" />
            <div className="flex gap-1">
              <Skeleton className="w-[80px] h-[18px]" />
              <Skeleton className="w-[130px] h-[18px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}