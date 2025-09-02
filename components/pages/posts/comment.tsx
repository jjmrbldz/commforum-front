import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { UserCommentData } from "@/types";


export default function Comment(item: UserCommentData) {
  return (
    <div className="flex gap-2">
      <div className="">
          <Avatar className="size-10">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback className="uppercase font-bold text-lg">{item.username.charAt(0)}</AvatarFallback>
          </Avatar>
      </div>
      <div className="">
        <div className="px-3 py-2 bg-black/5 rounded-xs">
          <div className="font-bold text-sm mb-2">{item.name}</div>
          <div className="text-xs pr-3 whitespace-pre-line">
            {item.content}
          </div>
        </div>
        <div className="text-slate-500 text-xs">{formatDate(item.regDatetime || "")}</div>
      </div>
    </div>
  )
}