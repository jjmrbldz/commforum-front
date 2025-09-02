import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentData, commentSchema } from "@/db/validations/comment";
import { PostData } from "@/types";
import { Textarea } from "../ui/textarea";
import { insertComment } from "@/db/query/comment";

interface Props {
  level: number;
  data: PostData;
}

export default function CommentForm({data, level}: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CommentData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId: String(data.id),
      content: "",
      categoryId: data.categoryId,
      level
    },
  });

  function onSubmit(data: CommentData) {
    startTransition(async () => {
      const res = await insertComment(data);
      console.log('INSERT COMMENT RES', res)
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
      toast.success(res.message, {
        position: "bottom-right",
      });
      form.setValue("content", "");
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
                  <Textarea 
                    placeholder="Write a comment"
                    id="content"
                    autoComplete="content"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <Button size={'sm'} className="mt-2 ml-auto" type="submit" loading={isPending}>
            <Send />
            <span>Comment</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}