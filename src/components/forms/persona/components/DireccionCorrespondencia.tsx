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

export function DireccionCorrespondencia({ form }: FormInputProps) {
   return (
      <>
         <Alert className="bg-muted">
            <Info className="h-4 w-4" />
            <AlertTitle>Dirección de correspondencia</AlertTitle>
            <AlertDescription className="italic text-muted-foreground">
               Dirección para envío de correspondencia o paqueteria. Ej: Calle 5 # 23-45, Barrio San Antonio, Cali, Valle del Cauca.
            </AlertDescription>
         </Alert>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
               control={form.control}
               name="direccion_correspondencia.direccion"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Dirección de correspondencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Calle 5 # 23-45"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="direccion_correspondencia.barrio"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Barrio de correspondencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Barrio San Antonio"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="direccion_correspondencia.ciudad"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ciudad de correspondencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Cali"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="direccion_correspondencia.departamento"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento de correspondencia</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ej: Valle del Cauca"
                           {...field}
                           style={{ fontStyle: "italic" }}
                        />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        Este campo no es obligatorio.
                     </FormDescription>
                  </FormItem>
               )}
            />
         </div>

      </>
   )
}