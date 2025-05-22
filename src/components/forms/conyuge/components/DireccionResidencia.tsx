"use client"

import { UseFormReturn } from "react-hook-form"

import { Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"

import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

interface FormInputProps {
   form: UseFormReturn<ConyugeSchemaType>
}

export function DireccionResidencia({ form }: FormInputProps) {
   return (
      <>
         <Alert className="bg-muted">
            <Info className="h-4 w-4" />
            <AlertTitle>Direccion de residencia</AlertTitle>
            <AlertDescription className="italic">
               direccion donde tu conuyge Ej: Cra. 8 #10-47, Barrio La Merced, Cali, Valle del Cauca
            </AlertDescription>
         </Alert>
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
                     {form.formState.errors.direccion_residencia?.direccion ? (
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
               name="direccion_residencia.barrio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Barrio de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Barrio La Merced" style={{ fontStyle: 'italic' }} />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.barrio ? (
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
               name="direccion_residencia.ciudad"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ciudad de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Cali" style={{ fontStyle: 'italic' }} />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.ciudad ? (
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
               name="direccion_residencia.departamento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento de residencia</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Valle del cauca" style={{ fontStyle: 'italic' }} />
                     </FormControl>
                     {form.formState.errors.direccion_residencia?.departamento ? (
                        <FormMessage />
                     ) : (
                        <FormDescription className="text-sm italic text-muted-foreground">
                           Este campo no es obligatorio.
                        </FormDescription>
                     )}
                  </FormItem>
               )}
            />
         </div>
      </>
   )
}