"use client"

import { UseFormReturn } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { FormInput } from '@/components/FormInput'
import { FormSelect } from '@/components/FormSelect'
// import { FormDatePicker } from '@/components/FormDatePicker'

import { FormSchemaType } from '@/schemas/formSchema'
import { enum_tipo_documento } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

export function DatosBasicos({ form }: FormInputProps) {
   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormSelect<FormSchemaType>
               form={form}
               name="tipo_documento"
               label="Tipo de documento"
               array={enum_tipo_documento}
               placeholder="Seleccione un documento"
               description="Campo obligatorio."
            />
            <FormInput<FormSchemaType>
               form={form}
               name="num_documento"
               label="Número de documento"
               placeholder="Ingresa tu número de documento"
               description="Campo obligatorio."
            />
            <FormInput<FormSchemaType>
               form={form}
               name="primer_nombre"
               label="Primer nombre"
               placeholder="Ingresa tu primer nombre"
               description="Campo obligatorio."
            />
            <div className="grid gap-2">
               <Label htmlFor="segundo_nombre">Segundo nombre</Label>
               <Input id="segundo_nombre" placeholder="Ingresa tu primer nombre" {...form.register("segundo_nombre")} />
               <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
            </div>
            <FormInput<FormSchemaType>
               form={form}
               name="primer_apellido"
               label="Primer apellido"
               placeholder="Ingresa tu primer nombre"
               description="Campo obligatorio."
            />
            <div className="grid gap-2">
               <Label htmlFor="segundo_apellido">Segundo apellido</Label>
               <Input id="segundo_apellido" placeholder="Ingresa tu segundo apellido" {...form.register("segundo_apellido")} />
               <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
               <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
               <Input
                  type="date"
                  id="fecha_nacimiento"
                  placeholder="YYYY-MM-DD"
                  aria-invalid={!!form.formState.errors.fecha_nacimiento}
                  {...form.register("fecha_nacimiento")}
               />
               <p className="text-sm italic dark:text-emerald-400 text-emerald-600">
                  Campo obligatorio.
               </p>
               {/* {form.formState.errors.fecha_nacimiento?.type === "invalid_date" && (
                  <p className="italic dark:text-red-400 text-sm text-red-600">La fecha de nacimiento es obligatoria</p>
               )} */}
            </div>
         </div>
      </>
   )
}