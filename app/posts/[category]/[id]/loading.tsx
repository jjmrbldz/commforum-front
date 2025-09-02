import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
 return (
    <div className="col-span-12 md:col-span-9 py-4 space-y-4">
      <div className="flex items-center justify-between py-4">
        <Skeleton className="w-[170px] h-[28px]" />
      </div>
      <div className="space-y-2">
        <div className="flex gap-4 py-1">
          <Skeleton className="w-full flex-1" />
          <div className="space-y-2 flex-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[20px]" />
            ))}
          </div>
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[20px]" />
        ))}
        <Skeleton className="w-full h-[200px]" />
      </div>
    </div>
  )
}