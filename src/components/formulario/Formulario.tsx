"use client"

import { useState, useEffect, lazy } from "react";
// 1. Librerías de terceros
import { Loader2, Send, UserRound, ChevronLeft, Info } from "lucide-react"
import { useUserForm } from '@/hooks/useForm'
// 2. Utils o helpers
import { cn, handleStepNext } from "@/lib/utils"
// 3. Componentes UI (shadcn/ui)
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
// 4. Componentes propios (más específicos)
import { Loader } from '@/components/loader'
// 5. Lazy load
const Persona = lazy(() => import('@/components/formulario/persona/Persona'))
const Conyuge = lazy(() => import('@/components/formulario/conyuge/conyuge'))
// 6. Tipos y esquemas
import { FormSchemaType } from '@/schemas/formSchema'

export function Formulario({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
   const [loading, setLoading] = useState(false);
   const [step, setStep] = useState(2);
   const [formData, setFormData] = useState<FormSchemaType>({} as FormSchemaType);

   // 1. Define your form.
   const form = useUserForm();

   // 2. Define a submit handler.
   async function onSubmit(values: FormSchemaType) {
      console.log(values);

      setLoading(true);
      try {
         const response = await fetch("http://localhost:4000/api/persona", {
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

         // ✅ Esperar 2 segundos antes de ocultar loader
         setTimeout(() => {
            setLoading(false);
            console.log("Respuesta del servidor:", data);
            toast.success("Todos los datos guardados correctamente!", {
               duration: 5000,
            });
            // ✅ Aquí formateamos (reseteamos) el formulario:
            form.reset();
         }, 2000); // 2000 milisegundos = 2 segundos

      } catch (error: any) {
         console.error("Error al enviar datos:", error);
         toast.error("Error al guardar los datos!", {
            description: error?.message || "Ocurrió un error inesperado.",
            duration: 5000,
         });
         setLoading(false); // ❗️ También ocultamos loader si entra en catch
      }
   }

   useEffect(() => {
      console.log(form.formState.errors);
   }, [form.formState.errors]);

   return (
      <>
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
                                 <Persona form={form} />
                              </>
                           )}
                           {step === 2 && (
                              <>
                                 <Alert variant={"emerald"}>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>La siguiente información <strong>NO</strong> es obligatoria!</AlertTitle>
                                    <AlertDescription>
                                       Puede omitir su diligenciamiento.
                                    </AlertDescription>
                                 </Alert>
                                 <Conyuge form={form} />
                              </>
                           )}
                           <Separator />
                           <Pagination className="block">
                              <PaginationContent className="justify-between">
                                 <PaginationItem>
                                    <PaginationPrevious
                                       className={cn(buttonVariants({ variant: "outline" }))}
                                       onClick={() => setStep((prev) => prev - 1)}
                                    />
                                 </PaginationItem>
                                 <PaginationItem>
                                    <PaginationNext
                                       className={cn(buttonVariants({ variant: "outline" }))}
                                       onClick={() =>
                                          handleStepNext({
                                             form,
                                             setFormData,
                                             setStep,
                                          })
                                       }
                                    />
                                 </PaginationItem>
                              </PaginationContent>
                           </Pagination>
                           {/* <Button type="submit" className="w-auto" disabled={loading}>
                              {loading ? (
                                 <>
                                    <Loader2 className="animate-spin" /> Enviando...
                                 </>
                              ) : (
                                 <>
                                    <Send /> Enviar
                                 </>
                              )}
                           </Button> */}
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div >
      </>
   )
}
