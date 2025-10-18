import { userLevelClasses } from "@/lib/constants";
import { cn } from "@/lib/utils";


export default function UserLevelBadge({level, className = ""}:{level: number; className?: string}) {

  return (
    <span 
      className={cn(
        "inline-flex justify-center items-center size-5 rounded-full text-center text-[10px] font-bold",
        userLevelClasses[level],
        className
      )}
    >
      {level}
    </span>
  );
}