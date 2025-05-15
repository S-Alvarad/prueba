"use client"

import { FieldPath, UseFormReturn, FieldValues, useWatch } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

import { FormInput } from '@/components/FormInput'
import { FormSelect } from '@/components/FormSelect'
import { FormDatePicker } from '@/components/FormDatePicker'

import { FormSchemaType } from '@/schemas/formSchema'
import { enum_sexo, enum_tipo_rh, enum_estado_civil } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

function DatosSecundarios({ form }: FormInputProps) {

   const tineHijos = useWatch({ control: form.control, name: "tiene_hijos" });

   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormSelect<FormSchemaType>
               form={form}
               name="sexo"
               label="Sexo"
               array={enum_sexo}
               placeholder="Sexo"
               description="Campo obligatorio."
            />
            <FormSelect<FormSchemaType>
               form={form}
               name="tipo_sangre"
               label="Tipo de sangre"
               array={enum_tipo_rh}
               placeholder="Tipo de sangre"
               description="Campo obligatorio."
            />
            <FormSelect<FormSchemaType>
               form={form}
               name="estado_civil"
               label="Estado civil"
               array={enum_estado_civil}
               placeholder="Estado civil"
               description="Campo obligatorio."
            />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput<FormSchemaType>
               form={form}
               name="celular"
               label="No° Celular"
               placeholder="Ingresa No° celular"
               description="Campo obligatorio."
            />
            <div className="grid gap-2">
               <Label htmlFor="telefono_fijo">Telefono fijo</Label>
               <Input
                  id="telefono_fijo"
                  placeholder="Ingresa telefono fijo"
                  {...form.register("telefono")}
               />
               <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
            </div>
            <FormInput<FormSchemaType>
               form={form}
               name="personas_a_cargo"
               type="number"
               label="No° Personas a su cargo"
               placeholder="Ingresa No° personas a cargo"
               description="No° personas que depende financieramente de usted."
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
               // <FormInput<FormSchemaType>
               //    form={form}
               //    name="numero_hijos"
               //    type="number"
               //    // label="No° Personas a su cargo"
               //    placeholder="Ingresa No° numero de hijos"
               // />

               <div className="grid gap-2">
                  <Input
                     type="number"
                     {...form.register("numero_hijos", { valueAsNumber: true })}
                     placeholder="Ingresa No° numero de hijos"
                  />
                  <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
               </div>
            )}
         </div>
      </>
   )
}

export default DatosSecundarios