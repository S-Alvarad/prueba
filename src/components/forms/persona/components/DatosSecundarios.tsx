"use client"

import { UseFormReturn, useWatch } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { PersonaSchemaType } from '@/schemas/personaSchema'
import { enum_sexo, enum_tipo_rh, enum_estado_civil } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<PersonaSchemaType>
}

export function DatosSecundarios({ form }: FormInputProps) {

   const tineHijos = useWatch({ control: form.control, name: "tiene_hijos" });

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
               control={form.control}
               name="sexo"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Sexo</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="w-full min-w-0 truncate">
                              <SelectValue placeholder="Sexo" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper" avoidCollisions={false}>
                           {enum_sexo.length > 0 ? (
                              enum_sexo.map((option) => (
                                 <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                 </SelectItem>
                              ))
                           ) : (
                              <SelectItem value="No hay opciones disponibles" disabled />
                           )}
                        </SelectContent>
                     </Select>
                     {form.formState.errors.sexo ? (
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
               name="tipo_sangre"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Tipo de sangre</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="w-full min-w-0 truncate">
                              <SelectValue placeholder="Tipo de sangre" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper" avoidCollisions={false}>
                           {enum_tipo_rh.length > 0 ? (
                              enum_tipo_rh.map((option) => (
                                 <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                 </SelectItem>
                              ))
                           ) : (
                              <SelectItem value="No hay opciones disponibles" disabled />
                           )}
                        </SelectContent>
                     </Select>
                     {form.formState.errors.tipo_sangre ? (
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
               name="estado_civil"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Estado civil</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="w-full min-w-0 truncate">
                              <SelectValue placeholder="Estado civil" />
                           </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper" avoidCollisions={false}>
                           {enum_estado_civil.length > 0 ? (
                              enum_estado_civil.map((option) => (
                                 <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                 </SelectItem>
                              ))
                           ) : (
                              <SelectItem value="No hay opciones disponibles" disabled />
                           )}
                        </SelectContent>
                     </Select>
                     {form.formState.errors.estado_civil ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                           Campo obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
               control={form.control}
               name="celular"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>No° Celular</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="Ingresa No° celular" {...field} />
                     </FormControl>
                     {form.formState.errors.celular ? (
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
               name="telefono"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Telefono fijo</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="Ej: 6012345678" {...field} />
                     </FormControl>
                     {form.formState.errors.telefono ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic text-muted-foreground">
                           Este campo no es obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="personas_a_cargo"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>No° Personas a su cargo</FormLabel>
                     <FormControl>
                        <Input type="number" placeholder="No° personas que depende financieramente de usted." {...field} />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <FormField
               control={form.control}
               name="tiene_hijos"
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
                           <span>Tiene hijos?</span>
                        </div>
                     </FormLabel>
                  </FormItem>
               )}
            />
            {tineHijos && (
               <FormField
                  control={form.control}
                  name="numero_hijos"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Número de hijos</FormLabel>
                        <FormControl>
                           <Input
                              type="number"
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Ingresa No° numero de hijos"
                           />
                        </FormControl>
                        {"numero_hijos" in form.formState.errors ? (
                           <FormMessage />
                        ) : (
                           <FormDescription className="text-sm italic dark:text-emerald-400 text-emerald-600">
                              Campo obligatorio.
                           </FormDescription>
                        )}
                     </FormItem>
                  )}
               />
            )}
         </div>
      </>
   )
}