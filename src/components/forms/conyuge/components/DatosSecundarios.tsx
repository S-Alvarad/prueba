"use client"

import { UseFormReturn, useWatch } from "react-hook-form"

import { Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

interface FormInputProps {
   form: UseFormReturn<ConyugeSchemaType>
}

export function DatosSecundarios({ form }: FormInputProps) {
   const tieneTrabajo = useWatch({ control: form.control, name: "tiene_trabajo" });

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
               control={form.control}
               name="celular"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>No° Celular</FormLabel>
                     <FormControl>
                        <Input type="number" {...field} placeholder="Ingresa tu No° Celular" />
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
               name="telefono"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>No° Telefono fijo</FormLabel>
                     <FormControl>
                        <Input type="number" {...field} placeholder="Ingresa tu telefono fijo" />
                     </FormControl>
                     <FormDescription className="text-sm italic text-muted-foreground">
                        {/* Este campo no es obligatorio. */}
                     </FormDescription>
                     {/* <FormMessage /> */}
                  </FormItem>
               )}
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <FormField
               control={form.control}
               name="tiene_trabajo"
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
                           <span>¿Su cónyuge tiene empleo en la actualidad?</span>
                        </div>
                     </FormLabel>
                  </FormItem>
               )}
            />
            {tieneTrabajo && (
               <>
                  <Alert variant="emerald">
                     <Info className="h-4 w-4" />
                     <AlertTitle>Complete esta sección solo si su cónyuge tiene empleo.</AlertTitle>
                     <AlertDescription className="italic">
                        De lo contrario, puede dejar los campos vacíos.
                     </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="empresa.nombre_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nombre de la empresa</FormLabel>
                              <FormControl>
                                 <Input type="number" {...field} placeholder="Ingresa No° numero de hijos" />
                              </FormControl>
                              {/* <FormMessage /> */}
                              <p className="text-sm italic dark:text-emerald-400 text-emerald-600">
                                 Campo obligatorio.
                              </p>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="empresa.nombre_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nombre de la empresa</FormLabel>
                              <FormControl>
                                 <Input type="number" {...field} placeholder="Ingresa No° numero de hijos" />
                              </FormControl>
                              {/* <FormMessage /> */}
                              <p className="text-sm italic dark:text-emerald-400 text-emerald-600">
                                 Campo obligatorio.
                              </p>
                           </FormItem>
                        )}
                     />
                  </div>
               </>
            )}
         </div>
      </>
   )
}