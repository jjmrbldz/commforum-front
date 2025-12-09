"use client"

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentData, commentSchema } from "@/db/validations/comment";
import { PostData } from "@/types";
import { Textarea } from "../ui/textarea";
import { insertComment } from "@/db/query/comment";
import PostEditor from "../pages/profile/posts/editor";

interface Props {
  level: number;
  commentId: number | null;
  postId: PostData['id'];
  categoryId: number;
  isReplying?: boolean;
  setIsReplying?: (val?: number | undefined) => void;
  getReplyComments?: () => void;
}

export default function CommentForm({postId, level, commentId, categoryId, isReplying, setIsReplying, getReplyComments}: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CommentData>({
      resolver: zodResolver(commentSchema),
      defaultValues: {
        postId: String(postId),
        content: "",
        commentId,
        level,
        categoryId,
      },
    });
  const [editorKey, setEditorKey] = useState(0);

  function onSubmit(data: CommentData) {
    // return;
    startTransition(async () => {
      const res = await insertComment({payload: data, shouldRevalidate: !isReplying});
      
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof CommentData, { message: message[0] });
          });
        } else {
          toast.error(res.message, {
            position: "bottom-right",
          });
        }
        return;
      }
      setEditorKey((k) => k + 1);
      toast.success(res.message, {
        position: "bottom-right",
      });
      form.setValue("content", "");
      if (setIsReplying && getReplyComments) {
        setIsReplying(undefined);
        getReplyComments();
      }
    })
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <FormField 
            control={form.control}
            name="content"
            render={(({field}) => (
              <FormItem className="">
                <FormControl>
                  {/* <Textarea 
                    placeholder="Write a comment"
                    id="content"
                    autoComplete="content"
                    rows={5}
                    {...field}
                  /> */}
                  <PostEditor 
                    // initiaValue={isEditing && isValidJSON(data?.content || "") ? JSON.parse(data?.content || "") : undefined}
                    key={editorKey}
                    onChange={(val) => {
                      //@ts-ignore
                      const newIsEmpty = val?.toJSON()?.root?.children[0]?.children?.length === 0;
                      field.onChange( !newIsEmpty ? JSON.stringify(val.toJSON()) : null);
                      if (newIsEmpty) {
                        form.setError("content", { message: "Content is required" });
                      } else {
                        form.clearErrors("content");
                      }
                    }} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <div className="ml-auto mt-2 space-x-2">
            {isReplying && (
              <Button 
                size={'sm'} 
                variant={"secondary"} 
                className="" 
                type="button"
                onClick={setIsReplying ? () => setIsReplying(undefined) : undefined}
              >
                <span>Cancel</span>
              </Button>
            )}
            <Button size={'sm'} className="" type="submit" loading={isPending}>
              <Send className="size-3" />
              <span>Comment</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}