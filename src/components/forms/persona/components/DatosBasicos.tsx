"use client"

import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { PersonaSchemaType } from '@/schemas/personaSchema'
import { enum_tipo_documento } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<PersonaSchemaType>
}

export function DatosBasicos({ form }: FormInputProps) {
   const [open, setOpen] = useState(false);

   const selectOptions = useMemo(() => {
      return enum_tipo_documento.length > 0
         ? enum_tipo_documento.map((option) => (
            <SelectItem key={option.value} value={option.value}>
               {option.label}
            </SelectItem>
         ))
         : (
            <SelectItem value="No hay opciones disponibles" disabled />
         );
   }, []); // ✅ Solo recalcula si cambia el array

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
               control={form.control}
               name="tipo_documento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Tipo de documento</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="w-full min-w-0 truncate">
                              <SelectValue placeholder="Seleccione un documento" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper" avoidCollisions={false}>
                           {selectOptions}
                        </SelectContent>
                     </Select>
                     {form.formState.errors.tipo_documento ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                           Campo obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="num_documento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Número de documento</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="Ingresa tu número de documento" {...field} />
                     </FormControl>
                     {form.formState.errors.num_documento ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                           Campo obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="primer_nombre"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Primer nombre</FormLabel>
                     <FormControl>
                        <Input placeholder="Ingresa tu primer nombre" {...field} />
                     </FormControl>
                     {form.formState.errors.primer_nombre ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                           Campo obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="segundo_nombre"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Segundo nombre</FormLabel>
                     <FormControl>
                        <Input placeholder="Ingresa tu segundo nombre" {...field} />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="primer_apellido"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Primer apellido</FormLabel>
                     <FormControl>
                        <Input placeholder="Ingresa tu primer apellido" {...field} />
                     </FormControl>
                     {form.formState.errors.primer_apellido ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                           Campo obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="segundo_apellido"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Segundo apellido</FormLabel>
                     <FormControl>
                        <Input placeholder="Ingresa tu segundo apellido" {...field} />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                  </FormItem>
               )}
            />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* <div className="grid gap-2">
               <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
               <Input
                  type="date"
                  id="fecha_nacimiento"
                  placeholder="YYYY-MM-DD"
                  aria-invalid={!!form.formState.errors.fecha_nacimiento}
                  {...form.register("fecha_nacimiento")}
               />
               <p className="text-sm italic dark:text-emerald-400 text-emerald-600">
                  Campo obligatorio.
               </p> */}
            {/* {form.formState.errors.fecha_nacimiento?.type === "invalid_date" && (
                  <p className="italic dark:text-red-400 text-sm text-red-600">La fecha de nacimiento es obligatoria</p>
               )} */}
            {/* </div> */}
            <FormField
               control={form.control}
               name="fecha_nacimiento"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <FormLabel>Fecha de nacimiento</FormLabel>
                     <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 aria-invalid={!!form.formState.errors.fecha_nacimiento}
                                 variant={"outline"}
                                 className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                 ) : (
                                    <span>dd/mm/aaaa</span>
                                 )}
                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                 field.onChange(date);
                                 setOpen(false); // ✅ cierra el Popover al seleccionar
                              }}
                              disabled={(date) =>
                                 date > new Date(new Date().setFullYear(new Date().getFullYear() - 15)) ||
                                 date < new Date("1900-01-01")
                              }
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromYear={1990}
                              toYear={new Date().getFullYear()}
                           />
                        </PopoverContent>
                     </Popover>
                     {form.formState.errors.fecha_nacimiento?.message === "Invalid date" ? (
                        <FormDescription className="text-destructive text-sm">
                           Este campo es obligatorio.
                        </FormDescription>
                     ) : (
                        <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                           Campo obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
         </div>
      </>
   )
}