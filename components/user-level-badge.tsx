import { userLevelClasses } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  level: number; 
  className?: string;
  textOnly?: boolean;
  isRounded?: boolean;
}

export default function UserLevelBadge({level, className = "", textOnly, isRounded}: Props) {

  if (level === 10) {
    return (
      <span  className={cn(
        "inline-flex justify-center items-center px-2 h-5 rounded-xs text-center text-[10px] font-bold text-nowrap",
        userLevelClasses[level],
        isRounded && "rounded-full size-5 px-0",
        className,
      )}
      >
        <span className={cn("text-xs", textOnly && "hidden")}>★</span>
        <span>회장</span>
        <span className={cn("text-xs", textOnly && "hidden")}>★</span>
        
      </span>
    )
  }

  return (
    <span 
      className={cn(
        "inline-flex justify-center items-center size-5 rounded-full text-center text-[10px] font-bold text-nowrap",
        userLevelClasses[level],
        className,
        isRounded && "rounded-full size-5 px-0"
      )}
    >
      {level}
    </span>
  );
}