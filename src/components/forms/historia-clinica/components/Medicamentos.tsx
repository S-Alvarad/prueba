"use client"

import React from 'react'

import { Plus } from 'lucide-react';

import { UseFormReturn, useWatch, useFieldArray } from "react-hook-form"
import { historiaCinicaSchemaType } from '@/schemas/historiaClinicaSchema'

import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"

interface FormInputProps {
   form: UseFormReturn<historiaCinicaSchemaType>
}

export function Medicamentos({ form }: FormInputProps) {
   const tieneMedicamentos = useWatch({ control: form.control, name: "consume_medicamentos" });

   const {
      fields,                    // Arreglo de objetos que representan los campos actuales del array
      append,                    // Función para añadir un nuevo elemento al array
      remove                     // Función para eliminar un elemento del array por índice
   } = useFieldArray({
      control: form.control,     // Control del formulario (de useForm)
      name: "medicamentos",      // Nombre del campo array en el formulario
   });

   return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         <FormField
            control={form.control}
            name="consume_medicamentos"
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
                        <span>¿Consume algun medicamento actualmente?</span>
                     </div>
                  </FormLabel>
               </FormItem>
            )}
         />
         {/* Lista dinámica */}
         {tieneMedicamentos && fields.length > 0 && fields.map((field, index) => (
            <div key={field.id} className="grid gap-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                     control={form.control}
                     name={`medicamentos.${index}.nombre_medicamento`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormControl>
                              <Input placeholder="Nombre del medicamento" {...field} value={field.value ?? ""} />
                           </FormControl>
                           {index === 0 && (
                              <FormDescription className='text-sm italic text-muted-foreground'>
                                 Ej: Acetaminofén
                              </FormDescription>
                           )}
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name={`medicamentos.${index}.dosis`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormControl>
                              <Input placeholder="Dosis del medicamento" {...field} value={field.value ?? ""} />
                           </FormControl>
                           {index === 0 && (
                              <FormDescription className='text-sm italic text-muted-foreground'>
                                 Ej: 1 tableta 500mg
                              </FormDescription>
                           )}
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name={`medicamentos.${index}.frecuencia`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormControl>
                              <Input placeholder="Frecuencia de toma" {...field} value={field.value ?? ""} />
                           </FormControl>
                           {index === 0 && (
                              <FormDescription className='text-sm italic text-muted-foreground'>
                                 Ej: Cada 8 horas
                              </FormDescription>
                           )}
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
         {tieneMedicamentos && (
            <div className="flex justify-start">
               <Button
                  type="button"
                  onClick={() => append({ nombre_medicamento: "", dosis: "", frecuencia: "" })}
                  className="w-auto justify-self-start flex bg-secondary-foreground hover:bg-secondary-foreground/90"
               >
                  <Plus />
                  <span>Agregar medicamento</span>
               </Button>
            </div>
         )}
      </div>
   )
}

export default Medicamentos