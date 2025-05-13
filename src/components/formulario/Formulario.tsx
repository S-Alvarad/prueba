"use client"

import { useState } from "react";

// 1. Librerías de terceros
import { Loader2, Send, UserRound } from "lucide-react"
import { useUserForm } from '@/hooks/useForm'

// 2. Utils o helpers
import { cn } from "@/lib/utils"

// 3. Componentes UI (shadcn/ui)
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

// 4. Componentes propios (más específicos)
import { DatosBasicos } from '@/components/formulario/pasos/DatosBasicos'
import { LugarNacimiento } from '@/components/formulario/pasos/LugarNacimiento'
import { Direcciones } from '@/components/formulario/pasos/DireccionResidencia'
import { DatosSecundarios } from '@/components/formulario/pasos/DatosSecundarios'
import { Loader } from '@/components/loader'

// 5. Tipos y esquemas
import { FormSchemaType } from '@/schemas/formSchema'


export function Formulario({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
   const [step, setStep] = useState(1);
   const [loading, setLoading] = useState(false);

   // 1. Define your form.
   const form = useUserForm();

   // 2. Define a submit handler.
   async function onSubmit(values: FormSchemaType) {
      console.log(values)
      setLoading(true);

      try {
         const response = await fetch("http://192.168.120.97:4000/api/persona", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         });

         const data = await response.json();

         if (!response.ok) {
            toast.info("Error en la solicitud!", {
               description: data.message || "Ocurrió un error inesperado.",
               duration: 5000,
            });
            setLoading(false); // ❗️ Ocultamos loader en caso de error
            return; // Salimos para NO continuar abajo
         }

         // ✅ Esperar 3 segundos antes de ocultar loader
         setTimeout(() => {
            setLoading(false);

            console.log("Respuesta del servidor:", data);
            toast.success("Todos los datos guardados correctamente!", {
               duration: 5000,
            });

            // ✅ Aquí formateamos (reseteamos) el formulario:
            form.reset();
         }, 3000); // 3000 milisegundos = 3 segundos

      } catch (error: any) {
         console.error("Error al enviar datos:", error);
         toast.error("Error al guardar los datos!", {
            description: error?.message || "Ocurrió un error inesperado.",
            duration: 5000,
         });
         setLoading(false); // ❗️ También ocultamos loader si entra en catch
      }
   }

   return (
      <>
         {/* Loader: solo se muestra si loading es true */}
         {loading && <Loader />}
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="gap-0 p-0">
               <CardHeader className="text-start flex items-center space-x-3 border-b-[1px] p-6">
                  <UserRound className="w-[40px] h-[40px] p-2 border rounded-full bg-muted" />
                  <div>
                     <CardTitle className="text-2xl font-bold">Información personal</CardTitle>
                     <CardDescription className="italic text-md text-muted-foreground">
                        Datos básicos
                     </CardDescription>
                  </div>
               </CardHeader>
               <CardContent className="p-6">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6">
                           {step === 1 && (
                              <>
                                 <DatosBasicos form={form} />
                                 {/* <LugarNacimiento form={form} /> */}
                                 <DatosSecundarios form={form} />
                              </>
                           )}
                           {step === 2 && (
                              <>
                              </>
                           )}
                           <Separator />
                           {/* <Button type="submit" className="w-[100%] dark:bg-emerald-400 bg-emerald-600" disabled={loading}> */}
                           <Button type="submit" className="w-[100%] bg-button" disabled={loading}>
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
