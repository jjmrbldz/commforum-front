import { userLevelClasses } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  isRounded?: boolean;
}

export default function NoticeBadge({className = "", isRounded = false}: Props) {

  return (
    <span 
      className={cn(
        "inline-flex justify-center items-center w-8 h-5 text-center text-[10px] font-bold text-nowrap bg-blue-500 text-white",
        className,
        isRounded && "rounded-full size-5 px-0"
      )}
    >
      알림
    </span>
  );
}