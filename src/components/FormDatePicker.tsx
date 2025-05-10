"use client"
import { useState } from "react";

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface FormInputProps<T extends FieldValues> {
   form: UseFormReturn<T>
   name: FieldPath<T>
   label: string
   placeholder?: string
}

export function FormDatePicker<T extends FieldValues>({
   form,
   name,
   label,
   placeholder
}: FormInputProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => {
            // ⬇️ Obtener el estado usando form.getFieldState()
            const fieldState = form.getFieldState(name, form.formState)
            const invalid = fieldState.invalid

            // Levantar el estado 'open' aquí
            const [open, setOpen] = useState(false)

            return (
               <FormItem className="flex flex-col">
                  <FormLabel>{label}</FormLabel>

                  <DatePopoverTrigger
                     field={field}
                     placeholder={placeholder}
                     invalid={invalid}
                     open={open}
                     setOpen={setOpen}
                  />

                  <FormDescription className="italic dark:text-emerald-400 font-semibold text-emerald-600">
                     Su fecha de nacimiento se utiliza para calcular su edad.
                  </FormDescription>

                  <FormMessage />
               </FormItem>
            )
         }}
      />
   )
}

function DatePopoverTrigger({
   field,
   placeholder,
   invalid,
   open,
   setOpen
}: {
   field: any
   placeholder?: string
   invalid: boolean,
   open: boolean
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <FormControl>
               <Button
                  variant={"outline"}
                  aria-invalid={invalid ? "true" : "false"} // ✅ Esto activa el CSS automático
                  className={cn(
                     "w-full pl-3 text-left font-normal",
                     !field.value && "text-muted-foreground",
                     invalid && "dark:border-destructive",
                  )}
               >
                  {field.value ? (
                     format(field.value, "PPP")
                  ) : (
                     <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
               </Button>
            </FormControl>
         </PopoverTrigger>

         <PopoverContent className="w-auto p-0" align="start">
            <DatePickerCalendar
               field={field}
               setOpen={setOpen} // Pasar la función setOpen al calendario
            />
         </PopoverContent>
      </Popover>
   )
}

function DatePickerCalendar({ field, setOpen }: { field: any, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
   return (
      <Calendar
         locale={es}
         mode="single"
         selected={field.value}
         onSelect={(date) => {
            field.onChange(date)
            setOpen(false)
         }}
         disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
         initialFocus
         disableNavigation={true}
         components={{
            Caption: () => null, // Oculta el encabezado del mes actual
         }}
      />
   )
}
