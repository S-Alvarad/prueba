"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchemaType } from '@/schemas/formSchema'

import { DatosBasicos } from '@/components/formulario/persona/DatosBasicos'
import { LugarNacimiento } from '@/components/formulario/persona/LugarNacimiento'
import { DatosSecundarios } from '@/components/formulario/persona/DatosSecundarios'
import { Direcciones } from '@/components/formulario/persona/Direcciones'
interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

function Persona({ form }: FormInputProps) {
   return (
      <>
         <DatosBasicos form={form} />
         <LugarNacimiento form={form} />
         <DatosSecundarios form={form} />
         <Direcciones form={form} tipo="residencia" />
         <Direcciones form={form} tipo="correspondencia" />
      </>
   )
}

export default Persona;