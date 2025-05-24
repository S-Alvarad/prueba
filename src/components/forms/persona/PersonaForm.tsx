'use client';

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils"

import { UserRound, Loader2, ChevronsRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";

// Hook
import { usePersonaForm } from '@/hooks/usePersonaForm'
// Schema ( z.infer<typeof Schema> )
import { PersonaSchemaType } from '@/schemas/personaSchema'

// Importa aquí las secciones del formulario.
import { DatosBasicos } from '@/components/forms/persona/components/DatosBasicos'
import { LugarNacimiento } from '@/components/forms/persona/components/LugarNacimiento'
import { DatosSecundarios } from '@/components/forms/persona/components/DatosSecundarios'
import { DireccionResidencia } from '@/components/forms/persona/components/DireccionResidencia'
import { DireccionCorrespondencia } from '@/components/forms/persona/components/DireccionCorrespondencia'

import { Loader } from '@/components/loader'

type PersonaFormProps = React.ComponentPropsWithoutRef<"div"> & {
   onSubmitDone: () => void;
   resetFormStep: () => void;
   isLastStep?: boolean;           // ← añade esta prop
   setCedula: (cedula: string) => void;
};

export function PersonaForm({ className, onSubmitDone, resetFormStep, isLastStep, setCedula, ...props }: PersonaFormProps) {
   const [loading, setLoading] = useState(false);

   // 1. Define tu formulario.
   const form = usePersonaForm();

   // 🔍 logFormErrorsEffect
   useEffect(() => {
      if (form.formState.errors) {
         const errors = form.formState.errors;
         if (Object.keys(errors).length > 0) {
            console.table({ errores: form.formState.errors });
            toast.error("Por favor, completa los campos obligatorios.");
         }
      }
   }, [form.formState.errors]);

   // 2. Define un controlador de envío.
   async function onSubmit(values: PersonaSchemaType) {
      setCedula(values.num_documento); // ⬅️ Aquí compartes el dato al componente padre app/page.tsx

      setLoading(true);

      try {
         const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

         // const response = await fetch(`http://192.168.120.79:4000/api/persona`, {
         const response = await fetch(`${API_BASE_URL}/api/persona`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         });

         const data = await response.json();
         console.log(data);

         if (!response.ok) {
            toast.error("Error en la solicitud!", {
               description: data.message || "Ocurrió un error inesperado.",
               duration: 5000,
            });
            setLoading(false);
            return;
         }

         setTimeout(() => {
            form.reset();

            toast.success("Datos guardados correctamente!", {
               description: isLastStep ? "Hoja de vida finalizada" : "Continuemos!",
               duration: 2000,
            });

            setTimeout(() => {
               if (isLastStep) {
                  resetFormStep();
               } else {
                  onSubmitDone();
               }
            }, 2000);
         }, 2000);
      } catch (error: unknown) {
         console.error("Error al enviar datos:", error);
         const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
         toast.error("Error al guardar los datos!", {
            description: errorMessage,
            duration: 5000,
         });
         setLoading(false);
      }
   };

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
                           {/* Secciones */}
                           <DatosBasicos form={form} />
                           <LugarNacimiento form={form} />
                           <DatosSecundarios form={form} />
                           <DireccionResidencia form={form} />
                           <DireccionCorrespondencia form={form} />
                           <Separator />
                           <Button type="submit" className="w-auto" disabled={loading}>
                              {loading ? (
                                 <>
                                    <Loader2 className="animate-spin" /> Enviando...
                                 </>
                              ) : (
                                 <>
                                    <ChevronsRight /> Continuar
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

export default PersonaForm;