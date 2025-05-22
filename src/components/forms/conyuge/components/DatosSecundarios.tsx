"use client"

import { UseFormReturn, useWatch } from "react-hook-form"

import { Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
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
                     {form.formState.errors.celular ? (
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
               name="telefono"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>No° Telefono fijo</FormLabel>
                     <FormControl>
                        <Input type="number" {...field} placeholder="Ingresa tu telefono fijo" />
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
                     <AlertTitle>Esta sección solo aplica si su cónyuge tiene empleo.</AlertTitle>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="empresa.nombre_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nombre de la empresa</FormLabel>
                              <FormControl>
                                 <Input
                                    type="text"
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ingresa el nombre de la empresa"
                                 />
                              </FormControl>
                              {form.getFieldState("empresa.nombre_empresa").error ? (
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
                        name="empresa.direccion_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Dirección de la empresa</FormLabel>
                              <FormControl>
                                 <Input
                                    type="text"
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ingresa la dirección de la empresa"
                                 />
                              </FormControl>
                              {form.getFieldState("empresa.direccion_empresa").error ? (
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
                        name="empresa.tipo_de_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Tipo de empresa</FormLabel>
                              <FormControl>
                                 <Input
                                    type="text"
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ingresa el tipo de empresa"
                                 />
                              </FormControl>
                              {form.getFieldState("empresa.tipo_de_empresa").error ? (
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
                        name="empresa.telefono_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Teléfono de la empresa</FormLabel>
                              <FormControl>
                                 <Input
                                    type="number"
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ingresa el teléfono de la empresa"
                                 />
                              </FormControl>
                              {form.getFieldState("empresa.telefono_empresa").error ? (
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
                        name="empresa.ciudad_empresa"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Ciudad de la empresa</FormLabel>
                              <FormControl>
                                 <Input
                                    type="text"
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder="Ingresa la ciudad de la empresa"
                                 />
                              </FormControl>
                              {form.getFieldState("empresa.ciudad_empresa").error ? (
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
            )}
         </div>
      </>
   )
}