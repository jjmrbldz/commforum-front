
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, isValidJSON } from "@/lib/utils";
import { UserCommentData } from "@/types";
import ReplyCommentButton from "./reply-button";
import ReplyCommentForm from "./reply-comment-form";
import CommentLikeDislike from "./comment-like-dislike";
import ReadOnlyContent from "@/components/readonly-content";

export default function CommentItem(item: UserCommentData & {categoryId: number; getReplyComments: () => void}) {

  return (
    <>
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="">
              <Avatar className="size-10">
                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                <AvatarFallback className="uppercase font-bold text-lg">{item.username.charAt(0)}</AvatarFallback>
              </Avatar>
          </div>
          <div className="min-w-[220px]">
            <div className="px-3 py-2 bg-black/5 rounded-xs">
              <div className="font-bold text-sm mb-2">{item.name}</div>
              {isValidJSON(item.content) ? (
                <ReadOnlyContent 
                  content={item.content} 
                  rootClassname="bg-[unset]"
                  className="min-h-[unset] p-0"
                />
              ) : (
                <div className="text-xs pr-3 whitespace-pre-line">
                  {item.content}
                </div>
              )}
            </div>
            <div className="flex item-center text-slate-500 mt-1">
              <div className="text-slate-500 text-xs">{formatDate(item.regDatetime || "")}</div>
              <div className="ml-auto flex items-center pr-1">
                  <CommentLikeDislike {...item} />
                  <ReplyCommentButton commentId={item.id} />
              </div>
            </div>
          </div>
        </div>
        <ReplyCommentForm {...item} getReplyComments={item.getReplyComments} />
      </div>
    </>
  )
}