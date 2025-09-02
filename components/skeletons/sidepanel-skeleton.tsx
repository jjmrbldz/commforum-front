import { Skeleton } from "../ui/skeleton";
import ProfileSkeleton from "./profile-skeleton";


export default function SidePanelSkeleton() {
  return (
    <div className="hidden md:block col-span-3 py-4 space-y-4">
      <ProfileSkeleton />
      <Skeleton className="h-[152px] w-full" />
    </div>
  )
}