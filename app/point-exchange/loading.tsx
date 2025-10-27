import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="col-span-12 md:col-span-9 py-4 space-y-4">
      <div className="flex items-center justify-between py-4">
        <Skeleton className="w-[170px] h-[28px]" />
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-4 h-[40px] py-1">
          <Skeleton className="w-full h-full col-span-2" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
        </div>
        <div className="">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 h-[30px] py-1">
              <Skeleton className="w-full h-full col-span-2" />
              <Skeleton className="w-full h-full" />
              <div className="flex gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="w-full h-full" />
              </div>
              <Skeleton className="w-full h-full" />
              <Skeleton className="size-6 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}