import { ControllerRenderProps } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormControl } from "../ui/form"
import { PostData } from "@/db/validations/posts"
import { useSiteDataStore } from "@/store/use-sitedata-store"
import { useMemo } from "react"
import { useUserStore } from "@/store/use-user-store"
import { SearchFormSchema } from "@/types"
import { SelectProps } from "@radix-ui/react-select"

interface Props extends SelectProps {
  search?: boolean;
  field: ControllerRenderProps<any>
}

export default function CategorySelect({
  field,
  search,
  ...props
}: Props) {
  const siteData = useSiteDataStore(state => state.siteData);
  const user = useUserStore(state => state.user);

  const options = useMemo(() => {
    const categories = (siteData?.categories || []);

    if (!user) return categories.map(item => ({
      value: String(item.id),
      label: `${item.titleKr || ""} ${process.env.NODE_ENV === "development" && `(${item.title})`}`
    })) || [];

    const options =  categories.filter(item => item.allowedUserLevel <= (user?.level || 1)).map(item => ({
      value: String(item.id),
      label: `${item.titleKr || ""} ${process.env.NODE_ENV === "development" && `(${item.title})`}`
    })) || [];

    if (search) options.unshift({value: "all", label: "전체"})

    return options;
  }, [siteData, user]);

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value as string} {...props}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="카테고리를 선택하세요" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((item, index) => (
          <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}