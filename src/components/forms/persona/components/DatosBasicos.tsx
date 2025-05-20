"use client"

import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"

import { FormInput } from '@/components/FormInput'
import { FormSelect } from '@/components/FormSelect'

import { PersonaSchemaType } from '@/schemas/personaSchema'
import { enum_tipo_documento } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<PersonaSchemaType>
}

export function DatosBasicos({ form }: FormInputProps) {
   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormSelect<PersonaSchemaType>
               form={form}
               name="tipo_documento"
               label="Tipo de documento"
               array={enum_tipo_documento}
               placeholder="Seleccione un documento"
               description="Campo obligatorio."
            />
            <FormField
               control={form.control}
               name="num_documento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Número de documento</FormLabel>
                     <FormControl>
                        <Input type="number" {...field} placeholder="Ingresa tu número de documento" />
                     </FormControl>
                     <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                        Campo obligatorio.
                     </FormDescription>
                     {/* <FormMessage /> */}
                  </FormItem>
               )}
            />
            <FormInput<PersonaSchemaType>
               form={form}
               name="primer_nombre"
               label="Primer nombre"
               placeholder="Ingresa tu primer nombre"
               description="Campo obligatorio."
            />
            <div className="grid gap-2">
               <Label htmlFor="segundo_nombre">Segundo nombre</Label>
               <Input id="segundo_nombre" placeholder="Ingresa tu primer nombre" {...form.register("segundo_nombre")} />
               <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
            </div>
            <FormInput<PersonaSchemaType>
               form={form}
               name="primer_apellido"
               label="Primer apellido"
               placeholder="Ingresa tu primer nombre"
               description="Campo obligatorio."
            />
            <div className="grid gap-2">
               <Label htmlFor="segundo_apellido">Segundo apellido</Label>
               <Input id="segundo_apellido" placeholder="Ingresa tu segundo apellido" {...form.register("segundo_apellido")} />
               <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
            </div>
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
                     <Popover>
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
                                    format(field.value, "PPP")
                                 ) : (
                                    <span>YYYY-MM-DD</span>
                                 )}
                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                 date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromYear={1990}
                              toYear={2025}
                           />
                        </PopoverContent>
                     </Popover>
                     <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                        Campo obligatorio.
                     </FormDescription>
                     {/* <FormMessage /> */}
                  </FormItem>
               )}
            />
         </div>
      </>
   )
}