"use client"

import { useForm } from "react-hook-form";
import PostEditor from "../pages/profile/posts/editor";
import { PostData, postSchema } from "@/db/validations/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import ImageUpload from "../image-upload";
import { Button } from "../ui/button";
import CategorySelect from "../select/category-select";
import { insertPost, updatePost } from "@/app/profile/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostData as PostDataRes } from "@/types";
import ImagePreview from "../image-preview";
import { isValidJSON } from "@/lib/utils";

export default function PostForm({data}:{data?: PostDataRes}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<PostData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: data?.id,
      title: data?.title || "",
      content: data?.content || "",
      thumbnail: "",
      media: "",
      categoryId: String(data?.categoryId) || "",
    },
    mode: "onBlur",
  })
  const isEditing = useMemo(() => !!data, [data]);

  function onSubmit(data: PostData) {
    console.log('UPDATE POST PAYLOAD', data);
    // return;
    if (isPending) return;
    startTransition(async () => {
      let res;
      if (isEditing) {
        res = await updatePost(data);
      } else {
        res = await insertPost(data);
      }
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
            name="categoryId"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="categoryId">범주</FormLabel>
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
           {isEditing && (
            <ImagePreview initialValue={data?.thumbnail} />
          )}
          <FormField
            control={form.control}
            name="content"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="content">콘텐츠</FormLabel>
                <FormControl>
                  <PostEditor 
                    initiaValue={isEditing && isValidJSON(data?.content || "") ? JSON.parse(data?.content || "") : undefined}
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
          {isEditing && (
            <ImagePreview initialValue={data?.media} />
          )}
          <Button size={'lg'} className="" type="submit" loading={isPending}>
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}