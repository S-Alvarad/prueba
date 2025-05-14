import React from "react"
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue
} from "@/components/ui/select"

interface DropdownProps {
   value?: string | number
   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
   options?: { value: string | number; label: string; disabled?: boolean }[]
}

export function CustomSelectDropdown({ value, onChange, options }: DropdownProps) {
   const handleValueChange = (newValue: string) => {
      if (onChange) {
         const syntheticEvent = {
            target: {
               value: newValue
            }
         } as React.ChangeEvent<HTMLSelectElement>
         onChange(syntheticEvent)
      }
   }

   return (
      <Select value={value?.toString()} onValueChange={handleValueChange}>
         <SelectTrigger className="h-8 w-[80px] px-2 text-xs">
            <SelectValue placeholder="Select" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               {options?.map((option) => (
                  <SelectItem
                     key={option.value}
                     value={option.value.toString()}
                     disabled={option.disabled}
                     className="text-xs"
                  >
                     {option.label}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}
