"use client"

import { useState } from "react";
// 1. Librerías de terceros
import { useUserForm } from '@/hooks/useForm'
// 2. Utils o helpers
import { cn } from "@/lib/utils"
// 3. Componentes UI (shadcn/ui)
import { Loader2, Send } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// 4. Componentes propios (más específicos)
import { DatosBasicos } from '@/components/formulario/pasos/DatosBasicos'
import { LugarNacimiento } from '@/components/formulario/pasos/LugarNacimiento'
// 5. Tipos y esquemas
import { FormSchemaType } from '@/schemas/formSchema'


export function Formulario({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
   const [step, setStep] = useState(1);
   const [loading, setLoading] = useState(false);

   // 1. Define your form.
   const form = useUserForm();

   // 2. Define a submit handler.
   function onSubmit(values: FormSchemaType) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
   }

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card>
            <CardHeader className="text-start">
               <CardTitle className="text-2xl font-bold">Informacion personal</CardTitle>
               <CardDescription className='italic text-md text-muted-foreground'>
                  Datos basicos
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="grid gap-6">
                        <Separator />
                        {step === 1 && (
                           <>
                              <DatosBasicos form={form} />
                              <LugarNacimiento form={form} />
                           </>
                        )}
                        <Separator />
                        <Button type="submit" className="w-[100%]" disabled={loading}>
                           {loading ? (
                              <>
                                 <Loader2 className="animate-spin" /> Enviando...
                              </>
                           ) : (
                              <>
                                 <Send /> Enviar
                              </>
                           )}
                        </Button>
                     </div>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div >
   )
}
