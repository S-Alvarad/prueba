"use client"

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"

import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

interface FormInputProps<T extends FieldValues> {
   form: UseFormReturn<T>
   name: FieldPath<T>
   label: string
   placeholder?: string
}

export function FormInput<T extends FieldValues>({
   form,
   name,
   label,
   placeholder
}: FormInputProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input placeholder={placeholder} {...field} />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
