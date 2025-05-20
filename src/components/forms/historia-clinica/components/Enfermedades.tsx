"use client"

import React from 'react'

import { Plus } from 'lucide-react';

import { UseFormReturn, useWatch, useFieldArray } from "react-hook-form"
import { historiaCinicaSchemaType } from '@/schemas/historiaClinicaSchema'

import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

interface FormInputProps {
   form: UseFormReturn<historiaCinicaSchemaType>
}

export function Enfermedades({ form }: FormInputProps) {
   const tieneEnfermedades = useWatch({ control: form.control, name: "tiene_enfermedades" });

   const {
      fields,                    // Arreglo de objetos que representan los campos actuales del array
      append,                    // Función para añadir un nuevo elemento al array
      remove                     // Función para eliminar un elemento del array por índice
   } = useFieldArray({
      control: form.control,     // Control del formulario (de useForm)
      name: "enfermedades",      // Nombre del campo array en el formulario
   });

   return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         <FormField
            control={form.control}
            name="tiene_enfermedades"
            render={({ field }) => (
               <FormItem>
                  <FormLabel className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                     <FormControl className="scale-130">
                        <Checkbox
                           checked={field.value}
                           onCheckedChange={field.onChange}
                           className="dark:data-[state=checked]:bg-emerald-400 dark:data-[state=checked]:border-emerald-400
                              data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <span>¿Ha tenido o tiene enfermedades?</span>
                     </div>
                  </FormLabel>
               </FormItem>
            )}
         />
         {/* Lista dinámica */}
         {tieneEnfermedades && fields.length > 0 && fields.map((field, index) => (
            <div key={field.id} className="grid gap-6">
               <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <FormField
                     control={form.control}
                     name={`enfermedades.${index}.tipo`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormLabel hidden>Tipo</FormLabel>
                           <FormControl>
                              <Input placeholder="Tipo de intervención" {...field} value={field.value ?? ""} />
                           </FormControl>
                        </FormItem>
                     )}
                  />
               </div>
               <Button variant="destructive" type="button" onClick={() => remove(index)}>
                  Eliminar
               </Button>
            </div>
         ))}

         {/* Botón para agregar */}
         {tieneEnfermedades && (
            <div className="flex justify-start">
               <Button
                  type="button"
                  onClick={() => append({ tipo: "" })}
                  className="w-auto justify-self-start flex bg-secondary-foreground hover:bg-secondary-foreground/90"
               >
                  <Plus />
                  <span>Agregar enfermedad</span>
               </Button>
            </div>
         )}
      </div>
   )
}

export default Enfermedades