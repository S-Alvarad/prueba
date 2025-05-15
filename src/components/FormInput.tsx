"use client"

import { FieldPath, UseFormReturn, FieldValues } from "react-hook-form"

import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"

interface FormInputProps<T extends FieldValues> extends Omit<React.ComponentProps<typeof Input>, 'form'> {
   form: UseFormReturn<T>
   name: FieldPath<T>
   label?: string
   type?: string
   placeholder?: string
   description?: string
}

export function FormInput<T extends FieldValues>({
   form,
   name,
   label,
   type,
   placeholder,
   description,
   ...inputProps

}: FormInputProps<T>) {
   const nameParts = name.split("_"); // ["direccion", "residencia.direccion"]
   const tipo = nameParts[1]?.split(".")[0]; // "residencia"
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input
                     type={type}
                     placeholder={placeholder}
                     {...field}
                     {...inputProps}
                  />
               </FormControl>
               <FormDescription
                  className={
                     tipo === "residencia"
                        ? "italic dark:text-emerald-400 text-emerald-600"
                        : tipo === "correspondencia"
                           ? "text-sm italic text-muted-foreground"
                           : "italic dark:text-emerald-400 text-emerald-600" // Estilo por defecto
                  }
               >
                  {tipo === "residencia"
                     ? "Campo obligatorio."
                     : tipo === "correspondencia"
                        ? "Este campo no es obligatorio"
                        : description} {/* Si no es ninguno de esos, muestra description por defecto */}
               </FormDescription>
            </FormItem>
         )}
      />
   )
}
