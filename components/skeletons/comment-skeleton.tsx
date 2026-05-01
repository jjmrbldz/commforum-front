import { Skeleton } from "../ui/skeleton";

export default function CommentSkeleton({ replyCount }:{ replyCount: number }) {
  return ( 
    <div className="space-y-2">
      {Array.from({ length: (replyCount || 1) }).map((_, i) => (
        <div key={i} className="flex gap-2">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-[60px] w-60" />
          </div>
        </div>
      ))}
    </div>
  )
}