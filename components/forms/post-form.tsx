"use client"

import { useForm } from "react-hook-form";
import PostEditor from "../pages/profile/posts/editor";
import { PostData, postSchema } from "@/db/validations/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import ImageUpload from "../image-upload";
import { Button } from "../ui/button";
import CategorySelect from "../select/category-select";
import { insertPost } from "@/app/profile/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<PostData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      media: "",
      category: "",
    },
    mode: "onBlur",
  })

  function onSubmit(data: PostData) {
    // console.log('POST DATA', data);
    if (isPending) return;
    startTransition(async () => {
      const res = await insertPost(data);
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof PostData, { message: message[0] });
          });
        } else {
          toast.error(res.message);
        }
        return;
      }
      router.push("/profile/posts");
      toast.success(res.message);
    });
  }

  // useEffect(() => {
  //   console.log('FORM VALUES', form.watch());
  // }, [form.watch()])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="flex flex-col gap-3 space-y-4">
          <FormField 
            control={form.control}
            name="title"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="title">제목</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="제목을 입력하세요"
                    id="title"
                    autoComplete="title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name="category"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="category">범주</FormLabel>
                <FormControl>
                  <CategorySelect field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name="thumbnail"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="thumbnail">썸네일</FormLabel>
                <FormControl>
                  <ImageUpload 
                    onChange={(val) => field.onChange(val)} 
                    multiple={false}
                    maxFiles={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField
            control={form.control}
            name="content"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="content">콘텐츠</FormLabel>
                <FormControl>
                  <PostEditor 
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
          <FormField 
            control={form.control}
            name="media"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="media">메디아</FormLabel>
                <FormControl>
                  <ImageUpload 
                    onChange={(val) => field.onChange(val)} 
                    multiple={true}
                    maxFiles={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <Button size={'lg'} className="" type="submit" loading={isPending}>
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}