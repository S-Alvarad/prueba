"use client"

import { UseFormReturn } from "react-hook-form"
import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"

interface FormInputProps {
   form: UseFormReturn<ConyugeSchemaType>
}

export function LugarNacimiento({ form }: FormInputProps) {
   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
               control={form.control}
               name="pais_nacimiento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>País de nacimiento</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Colombia" style={{ fontStyle: 'italic' }} />
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
               name="departamento_nacimiento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento de nacimiento</FormLabel>
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
            <FormField
               control={form.control}
               name="ciudad_nacimiento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ciudad de nacimiento</FormLabel>
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
         </div>
      </>
   )
}