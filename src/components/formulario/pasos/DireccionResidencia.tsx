"use client"

import { UseFormReturn } from "react-hook-form"

import { FormInput } from '@/components/FormInput'
import { FormSchemaType } from '@/schemas/formSchema'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

export function Direcciones({ form }: FormInputProps) {
   return (
      <>
         <blockquote className="border-l-4 italic pl-6 dark:border-l-emerald-400 border-l-emerald-600">
            Direccion de residencia
            <p className="italic text-sm text-muted-foreground">direccion donde vives Ej: Cra. 8 #10-47, Barrio La Merced, Cali, Valle del Cauca </p>
         </blockquote>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput<FormSchemaType>
               form={form}
               name="direccion_residencia.direccion"
               label="Direccion de residencia"
               placeholder="Ej: Cra. 8 #10-47"
               style={{ fontStyle: 'italic' }}
            />
            <FormInput<FormSchemaType>
               form={form}
               name="direccion_residencia.barrio"
               label="Barrio de residencia"
               placeholder="Ej: Barrio La Merced"
               style={{ fontStyle: 'italic' }}
               />
            <FormInput<FormSchemaType>
               form={form}
               name="direccion_residencia.ciudad"
               label="Ciudad de residencia"
               placeholder="Ej: Cali"
               style={{ fontStyle: 'italic' }}
            />
            <FormInput<FormSchemaType>
               form={form}
               name="direccion_residencia.departamento"
               label="Departamento de residencia"
               placeholder="Ej: Valle del cauca"
               style={{ fontStyle: 'italic' }}
            />
         </div>
      </>
   )
}