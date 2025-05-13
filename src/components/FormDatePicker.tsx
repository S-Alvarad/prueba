"use client"

import { useState } from "react"
import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

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
         render={({ field }) => {
            const fieldState = form.getFieldState(name, form.formState)
            const invalid = fieldState.invalid

            const [open, setOpen] = useState(false)
            const today = new Date()
            const [month, setMonth] = useState(today.getMonth())
            const [year, setYear] = useState(today.getFullYear())

            return (
               <FormItem className="flex flex-col">
                  <FormLabel>{label}</FormLabel>

                  <DatePopoverTrigger
                     field={field}
                     placeholder={placeholder}
                     invalid={invalid}
                     open={open}
                     setOpen={setOpen}
                     month={month}
                     setMonth={setMonth}
                     year={year}
                     setYear={setYear}
                  />

                  {description && (
                     <FormDescription className="italic dark:text-emerald-400 font-semibold text-emerald-600">
                        {description}
                     </FormDescription>
                  )}

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
   setOpen,
   month,
   setMonth,
   year,
   setYear,
}: {
   field: { value: Date; onChange: (date: Date) => void }
   placeholder?: string
   invalid: boolean
   open: boolean
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
   month: number
   setMonth: React.Dispatch<React.SetStateAction<number>>
   year: number
   setYear: React.Dispatch<React.SetStateAction<number>>
}) {
   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <FormControl>
               <Button
                  variant="outline"
                  aria-invalid={invalid}
                  className={cn(
                     "w-full pl-3 text-left font-normal",
                     !field.value && "text-muted-foreground",
                     invalid && "dark:border-destructive"
                  )}
               >
                  {field.value ? (
                     format(field.value, "dd 'de' MMMM yyyy", { locale: es })
                  ) : (
                     <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
               </Button>
            </FormControl>
         </PopoverTrigger>

         <PopoverContent className="w-auto p-0" align="start">
            <div className="flex justify-center gap-2 p-3">
               <Select
                  value={month.toString()}
                  onValueChange={(val) => setMonth(Number(val))}
               >
                  <SelectTrigger className="w-[120px]">
                     <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                     {Array.from({ length: 12 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                           {format(new Date(0, i), "LLLL", { locale: es })}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>

               <Select
                  value={year.toString()}
                  onValueChange={(val) => setYear(Number(val))}
               >
                  <SelectTrigger className="w-[100px]">
                     <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                     {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(
                        (yr) => (
                           <SelectItem key={yr} value={yr.toString()}>
                              {yr}
                           </SelectItem>
                        )
                     )}
                  </SelectContent>
               </Select>
            </div>

            <DatePickerCalendar
               field={field}
               month={month}
               year={year}
               setOpen={setOpen}
               setMonth={setMonth}
               setYear={setYear}
            />
         </PopoverContent>
      </Popover>
   )
}

function DatePickerCalendar({
   field,
   month,
   year,
   setOpen,
   setMonth,
   setYear,
}: {
   field: { value: Date; onChange: (date: Date) => void }
   month: number
   year: number
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
   setMonth: React.Dispatch<React.SetStateAction<number>>
   setYear: React.Dispatch<React.SetStateAction<number>>
}) {
   return (
      <Calendar
         locale={es}
         mode="single"
         selected={field.value}
         onSelect={(date) => {
            field.onChange(date as Date)
            setOpen(false)
         }}
         month={new Date(year, month)}
         onMonthChange={(date) => {
            setMonth(date.getMonth())
            setYear(date.getFullYear())
         }}
         disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
         initialFocus
         disableNavigation
         components={{
            Caption: () => null, // Oculta el encabezado del mes actual
         }}
      />
   )
}
