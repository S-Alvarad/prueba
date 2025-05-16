"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchemaType } from '@/schemas/conyugeSchema'

import { DatosBasicos } from '@/components/formulario/persona/components/DatosBasicos'

interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

function Conyuge({ form }: FormInputProps) {
   return (
      <>
         <DatosBasicos form={form} />
      </>
   )
}

export default Conyuge;