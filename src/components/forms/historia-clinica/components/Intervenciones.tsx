"use client"

import React from 'react'
import { UseFormReturn, useWatch, useFieldArray } from "react-hook-form"
import { historiaCinicaSchemaType } from '@/schemas/historiaClinicaSchema'

import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"

interface FormInputProps {
   form: UseFormReturn<historiaCinicaSchemaType>
}

export function Intervenciones({ form }: FormInputProps) {
   const tieneIntervenciones = useWatch({ control: form.control, name: "tiene_intervenciones" });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "intervenciones",
   });

   return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         <FormField
            control={form.control}
            name="tiene_intervenciones"
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
                        <span>¿Ha tenido intervenciones quirúrgicas?</span>
                     </div>
                  </FormLabel>
               </FormItem>
            )}
         />
         {/* Lista dinámica */}
         {tieneIntervenciones && fields.length > 0 && fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row gap-2 items-center">
               <FormField
                  control={form.control}
                  name={`intervenciones.${index}.tipo`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel hidden>Tipo</FormLabel>
                        <FormControl>
                           <Input placeholder="Tipo de intervención" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name={`intervenciones.${index}.fecha`}
                  render={({ field }) => (
                     <FormItem className="flex-1">
                        <FormLabel hidden>Fecha</FormLabel>
                        <FormControl>
                           <Input
                              type="date"
                              value={field.value ? new Date(field.value).toISOString().split('T')[0] : ""}
                              onChange={e => field.onChange(new Date(e.target.value))}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button variant="destructive" type="button" onClick={() => remove(index)} className="text-red-500 px-2">
                  Eliminar
               </Button>
            </div>
         ))}

         {/* Botón para agregar */}
         {tieneIntervenciones && (
            <button
               type="button"
               onClick={() => append({ tipo: "", fecha: new Date() })}
               className="text-emerald-600 dark:text-emerald-400 underline"
            >
               Agregar intervención
            </button>
         )}
      </div>
   )
}

export default Intervenciones