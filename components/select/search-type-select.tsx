import { SearchFormSchema } from "@/types"
import { ControllerRenderProps } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormControl } from "../ui/form"
import { searchTypeOptions } from "@/lib/constants"

export default function SearchTypeSelect({
  field
}: {
  field: ControllerRenderProps<SearchFormSchema>
}) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select search type" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {searchTypeOptions.map((item, index) => (
          <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}