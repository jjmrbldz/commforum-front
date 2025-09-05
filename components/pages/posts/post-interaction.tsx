import CommentForm from "@/components/forms/comment-form";
import { PostData, UserCommentData } from "@/types";
import NotOkMessage from "@/components/not-ok-message";
import PostLikeDisLike from "./post-like-dislike";
import Comments from "./comments/comment";
import { buildCommentTree } from "@/lib/utils";


export default function PostInteraction({
  data,
  userComments,
 }: { 
  data: PostData,
  userComments: UserCommentData[]
 }) {

  const commentLength = userComments ? userComments.length : 0;
  // const treeifyComments = buildCommentTree(userComments);

  // console.log("COMMENTS", userComments);

  return (
    <>
      <PostLikeDisLike data={data} />
      <div className="space-y-3">
        <div className="">
          <CommentForm level={1} commentId={null} postId={data.id} categoryId={data.categoryId || 0} />
        </div>
        <div className="font-bold text-base">Comments ({data.commentCount})</div>
        {commentLength > 0 ? (
          userComments.map((item, index) => <Comments key={item.id} {...item} categoryId={data.categoryId || 0} />)
        ) : (
          <NotOkMessage variant={"info"} title="" message="No comments found." />
        )}
      </div>
    </>
  )
}