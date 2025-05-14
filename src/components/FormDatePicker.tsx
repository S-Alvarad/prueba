"use client"

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"

import { format } from "date-fns"
import { es } from "date-fns/locale"

import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FormInputProps<T extends FieldValues> {
   form: UseFormReturn<T>
   name: FieldPath<T>
   label: string
   placeholder?: string
   description?: string
}

export function FormDatePicker<T extends FieldValues>({
   form,
   name,
   label,
   placeholder,
   description,
}: FormInputProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel>{label}</FormLabel>
               <Popover>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant={"outline"}
                           className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                           )}
                        >
                           {field.value ? (
                              // format(field.value, "yyyy 'de' MM dd")
                              format(field.value, "PPP", { locale: es }) // 13 de mayo de 2025
                           ) : (
                              <span>{placeholder}</span>
                           )}
                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                        captionLayout="dropdown-buttons"
                        fromYear={1990}
                        toYear={2025}
                        locale={es}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                           date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                     />
                  </PopoverContent>
               </Popover>
               <FormDescription className="italic dark:text-emerald-400 font-semibold text-emerald-600">
                  {description}
               </FormDescription>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}