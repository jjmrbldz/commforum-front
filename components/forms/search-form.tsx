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


export default function SearchForm() {
  const form = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchType: "post",
      searchOperator: "or",
      searchTerm: "",
    },
  });

  function onSubmit(data: SearchFormSchema) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-col-2 gap-2">
          <FormField 
            control={form.control}
            name="searchType"
            render={(({field}) => (
              <FormItem className="col-span-1">
                <SearchTypeSelect field={field} />
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name="searchOperator"
            render={(({field}) => (
              <FormItem className="col-span-1">
                <SearchOperatorSelect field={field} />
                <FormMessage />
              </FormItem>
            ))}
          />
          <div className="col-span-2 flex">
            <FormField 
              control={form.control}
              name="searchTerm"
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