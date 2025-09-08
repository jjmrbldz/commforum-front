"use client"

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { SearchFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/schema/form";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import SearchTypeSelect from "../select/search-type-select";
import SearchOperatorSelect from "../select/search-operator-select";
import { cn } from "@/lib/utils";
import CategorySelect from "../select/category-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function SearchForm({className = ""}: {className?: string}) {
  const searchParams  = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      type: "title",
      // searchOperator: "",
      category: "all",
      term: "",
    },
  });

  function onSubmit(data: SearchFormSchema) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", data.type);
    params.set("category", data.category || "");
    params.set("term", data.term || "");
    params.set("page", "1");
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right"
    // })
    router.push(`${pathName}?${params.toString()}`)
  }

  useEffect(() => {
    form.setValue("type", searchParams.get("type") || "title");
    form.setValue("category", searchParams.get("category") || "all");
    form.setValue("term", searchParams.get("term") || "");
  }, [searchParams]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={cn("grid grid-col-2 gap-2", className)}>
          <FormField 
            control={form.control}
            name="type"
            render={(({field}) => (
              <FormItem className="col-span-1">
                <SearchTypeSelect field={field} />
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name="category"
            render={(({field}) => (
              <FormItem className="col-span-1">
                {/* <SearchOperatorSelect field={field} /> */}
                <CategorySelect field={field} search />
                <FormMessage />
              </FormItem>
            ))}
          />
          <div className="col-span-2 flex">
            <FormField 
              control={form.control}
              name="term"
              render={(({field}) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input 
                      placeholder="검색어는 두글자 이상"
                      type="search"
                      id="search"
                      autoComplete="search"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
            <Button size={'input'} type="submit" loading={form.formState.isLoading}>
              <Search />
            </Button>
          </div>
        </div>
      </form>
    </Form>
   
      
  )
}