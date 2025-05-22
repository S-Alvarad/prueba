"use client"

import { UseFormReturn } from "react-hook-form"

import { Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"

import { PersonaSchemaType } from '@/schemas/personaSchema'

interface FormInputProps {
   form: UseFormReturn<PersonaSchemaType>
}

export function DireccionResidencia({ form }: FormInputProps) {
   return (
      <>
         <Alert variant="emerald">
            <Info className="h-4 w-4" />
            <AlertTitle>Direccion de residencia</AlertTitle>
            <AlertDescription className="italic">
               direccion donde vives Ej: Cra. 8 #10-47, Barrio La Merced, Cali, Valle del Cauca
            </AlertDescription>
         </Alert>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
               control={form.control}
               name="direccion_residencia.direccion"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Dirección de residencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Cra. 8 #10-47"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.direccion ? (
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
               name="direccion_residencia.barrio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Barrio de residencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Barrio La Merced"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.barrio ? (
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
               name="direccion_residencia.ciudad"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ciudad de residencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Cali"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.ciudad ? (
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
               name="direccion_residencia.departamento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento de residencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Valle del Cauca"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.departamento ? (
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
      </>
   )
}