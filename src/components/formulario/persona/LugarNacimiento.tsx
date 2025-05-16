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
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
               <Label htmlFor="pais_nacimiento">País de nacimiento</Label>
               <Input
                  id="pais_nacimiento"
                  {...form.register("pais_nacimiento")}
                  placeholder="Ej: Colombia"
                  style={{ fontStyle: 'italic' }}
               />
               <p className="text-sm italic dark:text-emerald-400 text-emerald-600">
                  Campo obligatorio.
               </p>
            </div>
            <div className="grid gap-2">
               <Label htmlFor="departamento_nacimiento">Departamento de nacimiento</Label>
               <Input
                  id="departamento_nacimiento"
                  {...form.register("departamento_nacimiento")}
                  placeholder="Ej: Valle del cauca"
                  style={{ fontStyle: 'italic' }}
               />
               <p className="text-sm italic text-muted-foreground">
                  Este campo no es obligatorio.
               </p>
            </div>
            <div className="grid gap-2">
               <Label htmlFor="ciudad_nacimiento">Ciudad de nacimiento</Label>
               <Input
                  id="ciudad_nacimiento"
                  {...form.register("ciudad_nacimiento")}
                  placeholder="Ej: Cali"
                  style={{ fontStyle: 'italic' }}
               />
               <p className="text-sm italic dark:text-emerald-400 text-emerald-600">
                  Campo obligatorio.
               </p>
            </div>
         </div>
      </>
   )
}