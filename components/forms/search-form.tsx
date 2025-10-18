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
import { useSiteDataStore } from "@/store/use-sitedata-store";

interface Props {
  className?: string; 
  defaultCategory?: string;
  searchAllCategories?: boolean;
}

export default function SearchForm({className = "", defaultCategory, searchAllCategories = false}: Props) {
  const searchParams  = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      type: "title",
      category: defaultCategory || "all",
      term: "",
    },
  });

  function onSubmit(data: SearchFormSchema) {
    const params = new URLSearchParams(searchParams.toString());
    let path = pathName;    

    if (!searchAllCategories) {
      params.delete("category");
      const siteData = useSiteDataStore.getState().siteData;
      const categoryVal = siteData?.categories?.find(item => item.id == Number(data.category || defaultCategory))?.value;
      path = `/posts/${categoryVal}`
    } else {
      params.set("category", data.category || "");
    }

    params.set("type", data.type);
    params.set("term", data.term || "");
    params.set("page", "1");

    router.push(`${path}?${params.toString()}`)
  }

  useEffect(() => {
    form.setValue("type", searchParams.get("type") || "title");
    form.setValue("category", defaultCategory || searchParams.get("category") || "all");
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
            disabled={!!defaultCategory}
            render={(({field}) => (
              <FormItem className="col-span-1">
                {/* <SearchOperatorSelect field={field} /> */}
                <CategorySelect field={field} search={searchAllCategories} disabled={!!defaultCategory} />
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