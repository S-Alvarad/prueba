"use client"

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"

import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

interface FormInputProps<T extends FieldValues> {
   form: UseFormReturn<T>
   name: FieldPath<T>
   label?: string
   type?: string
   placeholder?: string
   description?: string
}

export function FormInput<T extends FieldValues>({
   form,
   name,
   label,
   type,
   placeholder,
   description
}: FormInputProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input type={type} placeholder={placeholder} {...field} />
               </FormControl>
               <FormDescription className="italic dark:text-emerald-400 font-semibold text-emerald-600">
                  {description}
               </FormDescription>
               {/* <FormMessage /> */}
            </FormItem>
         )}
      />
   )
}
