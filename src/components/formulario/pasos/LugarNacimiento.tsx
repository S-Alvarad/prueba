"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchemaType } from '@/schemas/formSchema'

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
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
               <Label htmlFor="pais_nacimiento">País de nacimiento</Label>
               <Input
                  id="pais_nacimiento"
                  {...form.register("lugar_nacimiento.pais_nacimiento")}
                  placeholder="Ej: Colombia"
                  style={{ fontStyle: 'italic' }}
               />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="departamento_nacimiento">Departamento de nacimiento</Label>
               <Input
                  id="departamento_nacimiento"
                  {...form.register("lugar_nacimiento.departamento_nacimiento")}
                  placeholder="Ej: Valle del cauca"
                  style={{ fontStyle: 'italic' }}
               />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="ciudad_nacimiento">Ciudad de nacimiento</Label>
               <Input
                  id="ciudad_nacimiento"
                  {...form.register("lugar_nacimiento.ciudad_nacimiento")}
                  placeholder="Ej: Cali"
                  style={{ fontStyle: 'italic' }}
               />
            </div>
         </div>
      </>
   )
}