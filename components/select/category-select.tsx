import { ControllerRenderProps } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormControl } from "../ui/form"
import { PostData } from "@/db/validations/posts"
import { useSiteDataStore } from "@/store/use-sitedata-store"
import { useMemo } from "react"
import { useUserStore } from "@/store/use-user-store"

export default function CategorySelect({
  field
}: {
  field: ControllerRenderProps<PostData>
}) {
  const siteData = useSiteDataStore(state => state.siteData);
  const user = useUserStore(state => state.user);

  const options = useMemo(() => {
    const categories = (siteData?.categories || []);

    if (!user) return categories.map(item => ({
      value: String(item.id),
      label: item.title || ""
    })) || [];

    return categories.filter(item => item.allowedUserLevel <= parseInt(user?.level || "1")).map(item => ({
      value: String(item.id),
      label: item.titleKr || ""
    })) || [];
  }, [siteData, user]);

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
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