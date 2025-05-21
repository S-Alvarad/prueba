"use client"

import { useMemo } from "react";

import { Plus } from 'lucide-react';

import { UseFormReturn, useWatch, useFieldArray } from "react-hook-form"
import { vacunasCovidSchemaType } from '@/schemas/vacunaCovidSchema'

import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"

import { enum_vacunas_covid } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<vacunasCovidSchemaType>
}

export function Vacunas({ form }: FormInputProps) {
   const tieneVacunas = useWatch({ control: form.control, name: "tiene_vacunas" });

   const {
      fields,                    // Arreglo de objetos que representan los campos actuales del array
      append,                    // Función para añadir un nuevo elemento al array
      remove                     // Función para eliminar un elemento del array por índice
   } = useFieldArray({
      control: form.control,     // Control del formulario (de useForm)
      name: "vacunas",      // Nombre del campo array en el formulario
   });

   const selectOptions = useMemo(() => {
      return enum_vacunas_covid.length > 0
         ? enum_vacunas_covid.map((option) => (
            <SelectItem key={option.value} value={option.value}>
               {option.label}
            </SelectItem>
         ))
         : (
            <SelectItem value="No hay opciones disponibles" disabled />
         );
   }, []); // ✅ Solo recalcula si cambia el array

   return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
         <FormField
            control={form.control}
            name="tiene_vacunas"
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
                        <span>¿Está vacunado contra el COVID-19?</span>
                     </div>
                  </FormLabel>
               </FormItem>
            )}
         />
         {/* Lista dinámica */}
         {tieneVacunas && fields.length > 0 && fields.map((field, index) => (
            <div key={field.id} className="grid gap-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                     control={form.control}
                     name={`vacunas.${index}.nombre_vacuna`}
                     render={({ field }) => (
                        <FormItem>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger className="w-full min-w-0 truncate">
                                    <SelectValue placeholder="Seleccione una vacuna" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent position="popper" avoidCollisions={false}>
                                 {selectOptions}
                              </SelectContent>
                           </Select>
                           {index === 0 && (
                              <FormDescription className='text-sm italic text-muted-foreground'>
                                 Especifique una vacuna. Ej: Pfizer, Moderna, Astrazeneca, Janssen
                              </FormDescription>
                           )}
                           {/* <FormMessage /> */}
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name={`vacunas.${index}.dosis_suministradas`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormControl>
                              <Input type='number' placeholder="Dosis suministradas" {...field} value={field.value ?? ""} />
                           </FormControl>
                           {index === 0 && (
                              <FormDescription className='text-sm italic text-muted-foreground'>
                                 Cuantas dosis recibio de esta vacuna?.
                              </FormDescription>
                           )}
                           {/* <FormMessage /> */}
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name={`vacunas.${index}.fecha`}
                     render={({ field }) => (
                        <FormItem className="flex-1">
                           <FormControl>
                              <Input
                                 type="date"
                                 onChange={e => field.onChange(new Date(e.target.value))}
                              />
                           </FormControl>
                           {index === 0 && (
                              <FormDescription className='text-sm italic text-muted-foreground'>
                                 No es necesaria la fecha exacta, puede ser una aproximada.
                              </FormDescription>
                           )}
                           {/* <FormMessage /> */}
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
         {tieneVacunas && (
            <div className="flex justify-start">
               <Button
                  type="button"
                  onClick={() => append({ nombre_vacuna: "", dosis_suministradas: 0, fecha: new Date() })}
                  className="w-auto justify-self-start flex bg-secondary-foreground hover:bg-secondary-foreground/90"
               >
                  <Plus />
                  <span>Agregar vacuna</span>
               </Button>
            </div>
         )}
      </div>
   )
}

export default Vacunas