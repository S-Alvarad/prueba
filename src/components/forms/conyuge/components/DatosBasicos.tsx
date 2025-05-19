"use client"

import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

import { ConyugeSchemaType } from '@/schemas/conyugeSchema'
import { enum_tipo_documento } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<ConyugeSchemaType>
}

export function DatosBasicos({ form }: FormInputProps) {

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
   }, [enum_tipo_documento]); // ✅ Solo recalcula si cambia el array

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
               control={form.control}
               name="tipo_documento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
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
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
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
                        <Input type="number" {...field} placeholder="Ingresa tu número de documento" />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
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
                        <Input {...field} placeholder="Ingresa tu primer nombre" />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
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
                        <Input {...field} placeholder="Ingresa tu segundo nombre" />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
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
                        <Input {...field} placeholder="Ingresa tu primer apellido" />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
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
                        <Input {...field} placeholder="Ingresa tu segundo apellido" />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
                  </FormItem>
               )}
            />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
               <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
               <Input
                  type="date"
                  id="fecha_nacimiento"
                  placeholder="YYYY-MM-DD"
                  aria-invalid={!!form.formState.errors.fecha_nacimiento}
                  {...form.register("fecha_nacimiento")}
               />
               <p className="text-sm italic text-muted-foreground">
                  {/* Este campo no es obligatorio. */}
               </p>
               {/* {form.formState.errors.fecha_nacimiento?.type === "invalid_date" && (
                  <p className="italic dark:text-red-400 text-sm text-red-600">La fecha de nacimiento es obligatoria</p>
               )} */}
            </div>
         </div>
      </>
   )
}