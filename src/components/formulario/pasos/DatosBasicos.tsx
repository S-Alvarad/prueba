"use client"

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { FormInput } from '@/components/FormInput'
import { FormSelect } from '@/components/FormSelect'
import { FormDatePicker } from '@/components/FormDatePicker'

import { FormSchemaType } from '@/schemas/formSchema'
import { enum_tipo_documento } from '@/constants/enums'

interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

export function DatosBasicos({ form }: FormInputProps) {
   return (
      <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
               <Input id="segundo_nombre" placeholder="Ingresa tu primer nombre" {...form.register("segundo_nombre")}/>
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
               <Input id="segundo_apellido" placeholder="Ingresa tu segundo apellido" {...form.register("segundo_apellido")}/>
               <p className="text-sm italic text-muted-foreground">Este campo no es obligatorio.</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDatePicker<FormSchemaType>
               form={form}
               name="fecha_nacimiento"
               label="Fecha de nacimiento"
               placeholder="Fecha de nacimiento"
               description="Su fecha de nacimiento se utiliza para calcular su edad."
            />
         </div>
      </>
   )
}