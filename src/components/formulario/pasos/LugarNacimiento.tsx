"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchemaType } from '@/schemas/formSchema'
import { FormInput } from '@/components/FormInput'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FormInputProps {
   form: UseFormReturn<FormSchemaType>
}

export function LugarNacimiento({ form }: FormInputProps) {
   return (
      <>
         <blockquote className="border-l-4 italic pl-6 dark:border-l-emerald-400 border-l-emerald-600">
            Los siguientes campos son opcionales
         </blockquote>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
               <Label htmlFor="pais_nacimiento">País de nacimiento</Label>
               <Input
                  id="pais_nacimiento"
                  {...form.register("lugar_nacimiento.pais_nacimiento")}
                  placeholder="Ingresa tu país de nacimiento"
               />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="departamento_nacimiento">Departamento de nacimiento</Label>
               <Input
                  id="departamento_nacimiento"
                  {...form.register("lugar_nacimiento.departamento_nacimiento")}
                  placeholder="Ingresa tu departamento de nacimiento"
               />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="ciudad_nacimiento">Ciudad de nacimiento</Label>
               <Input
                  id="ciudad_nacimiento"
                  {...form.register("lugar_nacimiento.ciudad_nacimiento")}
                  placeholder="Ingresa tu ciudad de nacimiento"
               />
            </div>
         </div>
      </>
   )
}