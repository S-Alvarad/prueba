"use client"

import { useMemo } from "react";

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormInputProps<T extends FieldValues> {
   form: UseFormReturn<T>
   name: FieldPath<T>
   label: string
   array: { value: string; label: string }[]
   placeholder?: string
   description?: string
}

export function FormSelect<T extends FieldValues>({
   form,
   name,
   label,
   array,
   placeholder,
   description
}: FormInputProps<T>) {

   const selectOptions = useMemo(() => {
      return array.length > 0
         ? array.map((option) => (
            <SelectItem key={option.value} value={option.value}>
               {option.label}
            </SelectItem>
         ))
         : (
            <SelectItem value="No hay opciones disponibles" disabled />
         );
   }, [array]); // ✅ Solo recalcula si cambia el array

   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                     <SelectTrigger className="w-full min-w-0 truncate">
                        <SelectValue placeholder={placeholder} className="truncate" />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" avoidCollisions={false}>
                     {selectOptions}
                  </SelectContent>
               </Select>
               <FormDescription className="italic dark:text-emerald-400 font-semibold text-emerald-600">
                  {description}
               </FormDescription>
               {/* <FormMessage /> */}
            </FormItem>
         )}
      />
   )
}
