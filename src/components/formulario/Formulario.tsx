"use client"

import { useState } from "react";
// 1. Librerías de terceros
import { useUserForm } from '@/hooks/useForm'
// 2. Utils o helpers
import { cn } from "@/lib/utils"
// 3. Componentes UI (shadcn/ui)
import { Loader2, Send, UserRound } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// 4. Componentes propios (más específicos)
import { DatosBasicos } from '@/components/formulario/pasos/DatosBasicos'
import { LugarNacimiento } from '@/components/formulario/pasos/LugarNacimiento'
import { Direcciones } from '@/components/formulario/pasos/DireccionResidencia'
import { Loader } from '@/components/loader'
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
      setLoading(true);

      setTimeout(() => {
         setLoading(false);
         console.log(values);
      }, 3000); // 3000 milisegundos = 3 segundos

   }

   return (
      <>
         {/* Loader: solo se muestra si loading es true */}
         {loading && <Loader />}

         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
               <CardHeader className="text-start border-b-1 pb-4">
                  <div className="flex items-center gap-4">
                     <UserRound className="w-10 h-10 text-muted-foreground bg-muted rounded-full border p-2" /> {/* Tamaño ajustable */}
                     <div className="flex flex-col">
                        <CardTitle className="text-2xl font-bold">Información personal</CardTitle>
                        <CardDescription className="italic font-semibold text-md text-muted-foreground">
                           Datos básicos
                        </CardDescription>
                     </div>
                  </div>
               </CardHeader>

               <CardContent>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6">
                           {/* <Separator /> */}
                           {step === 1 && (
                              <>
                                 <DatosBasicos form={form} />
                                 <LugarNacimiento form={form} />
                                 <Direcciones form={form} />
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
      </>
   )
}
