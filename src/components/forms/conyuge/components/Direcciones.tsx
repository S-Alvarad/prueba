"use client"

import { UseFormReturn } from "react-hook-form"

import { FormInput } from '@/components/FormInput'
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

interface FormInputProps {
   form: UseFormReturn<ConyugeSchemaType>
}

export function Direcciones({ form }: FormInputProps) {
   return (
      <>
         <blockquote className="border-l-4 italic pl-6 dark:border-l-emerald-400 border-l-emerald-600">
            Direccion de residencia del conyuge
            <p className="italic text-sm text-muted-foreground">direccion donde vive tu conyuge Ej: Cra. 8 #10-47, Barrio La Merced, Cali, Valle del Cauca </p>
         </blockquote>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
               control={form.control}
               name="direccion_residencia.direccion"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Dirección de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Cra. 8 #10-47" style={{ fontStyle: 'italic' }} />
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
               name="direccion_residencia.barrio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Barrio de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Barrio La Merced" style={{ fontStyle: 'italic' }} />
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
               name="direccion_residencia.ciudad"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ciudad de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Cali" style={{ fontStyle: 'italic' }} />
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
               name="direccion_residencia.departamento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Valle del cauca" style={{ fontStyle: 'italic' }} />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
                  </FormItem>
               )}
            />
         </div>
      </>
   )
}