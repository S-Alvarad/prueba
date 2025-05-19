"use client"

import { UseFormReturn } from "react-hook-form"
import { PersonaSchemaType } from '@/schemas/personaSchema'

import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"

import { paises, departamentos, ciudades } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<PersonaSchemaType>
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
                        <Input
                           {...field}
                           list="paises"
                           placeholder="Ej: Colombia"
                           style={{ fontStyle: 'italic' }}
                        />
                     </FormControl>
                     <datalist id="paises">
                        {paises.length > 0 ? (
                           paises.map((option) => <option key={option.value} value={option.value} />)
                        ) : (
                           <option value="No hay opciones disponibles" disabled />
                        )}
                     </datalist>
                     <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                        Campo obligatorio.
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
                        <Input
                           {...field}
                           list="departamentos"
                           placeholder="Ej: Valle del cauca"
                           style={{ fontStyle: 'italic' }}
                        />
                     </FormControl>
                     <datalist id="departamentos">
                        {departamentos.length > 0 ? (
                           departamentos.map((option) => <option key={option.value} value={option.value} />)
                        ) : (
                           <option value="No hay opciones disponibles" disabled />
                        )}
                     </datalist>
                     <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                        Campo obligatorio.
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
                        <Input
                           {...field}
                           list="ciudades"
                           placeholder="Ej: Cali"
                           style={{ fontStyle: 'italic' }}
                        />
                     </FormControl>
                     <datalist id="ciudades">
                        {ciudades.length > 0 ? (
                           ciudades.map((option) => <option key={option.value} value={option.value} />)
                        ) : (
                           <option value="No hay opciones disponibles" disabled />
                        )}
                     </datalist>
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