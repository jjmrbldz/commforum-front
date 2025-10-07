"use client"

import { useForm } from "react-hook-form";
import PostEditor from "../pages/profile/posts/editor";
import { PostData, postSchema } from "@/db/validations/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useTransition } from "react";
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
import { InquiryData, inquirySchema } from "@/db/validations/inquiy";
import { insertInquiry } from "@/app/inquiry/actions";

export default function InquiryForm({data}:{data?: PostDataRes}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<InquiryData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      content: data?.content || "",
      attachment: null,
    },
    mode: "onBlur",
  })

  function onSubmit(data: InquiryData) {
    console.log('UPDATE POST PAYLOAD', data);
    // return;
    if (isPending) return;
    startTransition(async () => {
      // let res;
      // if (isEditing) {
      //   res = await updatePost(data);
      // } else {
      //   res = await insertPost(data);
      // }
      const res = await insertInquiry(data);
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof InquiryData, { message: (message as string[])[0] });
          });
          form.reset();
        } else {
          toast.error(res.message);
        }
        return;
      }
      // router.push("/profile/posts");
      toast.success(res.message);
    });
  }

  useEffect(() => {
    console.log(form.watch())
  }, [form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className="flex flex-col gap-3 space-y-4">
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
            name="attachment"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormLabel htmlFor="attachment">메디아</FormLabel>
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