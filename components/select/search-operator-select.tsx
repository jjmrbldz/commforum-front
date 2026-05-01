import { SearchFormSchema } from "@/types"
import { ControllerRenderProps } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormControl } from "../ui/form"
import { searchOperatorOptions } from "@/lib/constants"

export default function SearchOperatorSelect({
  field
}: {
  field: ControllerRenderProps<SearchFormSchema>
}) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select search operator" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {searchOperatorOptions.map((item, index) => (
          <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}