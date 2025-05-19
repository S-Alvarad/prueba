'use client';

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils"
import { submitForm } from '@/lib/submitForm'

import { UserRound, Loader2, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner";

// Hook
import { usePersonaForm } from '@/hooks/usePersonaForm'
// Schema ( z.infer<typeof Schema> )
import { PersonaSchemaType } from '@/schemas/personaSchema'

// Importa aquí las secciones del formulario.
import { DatosBasicos } from '@/components/forms/persona/components/DatosBasicos'
import { LugarNacimiento } from '@/components/forms/persona/components/LugarNacimiento'
import { DatosSecundarios } from '@/components/forms/persona/components/DatosSecundarios'
import { Direcciones } from '@/components/forms/persona/components/Direcciones'

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
            console.log(form.formState.errors);
            toast.error("Por favor, completa los campos obligatorios.");
         }
      }
   }, [form.formState.errors]);

   // 2. Define un controlador de envío.
   // async function onSubmit(values: PersonaSchemaType) {
   //    setLoading(true);
   //    try {
   //       const response = await fetch("http://localhost:4000/api/persona", {
   //          method: "POST",
   //          headers: {
   //             "Content-Type": "application/json",
   //          },
   //          body: JSON.stringify(values),
   //       });

   //       const data = await response.json();

   //       if (!response.ok) {
   //          toast.info("Error en la solicitud!", {
   //             description: data.message || "Ocurrió un error inesperado.",
   //             duration: 5000,
   //          });
   //          setLoading(false); // ❗️ Ocultamos loader en caso de error
   //          return; // Salimos para NO continuar abajo
   //       }

   //       // Dentro del submit
   //       setTimeout(() => {
   //          setLoading(false);
   //          console.log("Respuesta del servidor:", data);
   //          form.reset();

   //          toast.success("Datos guardados correctamente!", {
   //             description: isLastStep
   //                ? "Hoja de vida finalizada"
   //                : "Continuemos!",
   //             duration: 2000, // puedes acortar la duración
   //          });

   //          // Espera a que el toast se vea, luego cambia el step
   //          setTimeout(() => {
   //             // onSubmitDone(); // Avanza al siguiente paso
   //             if (isLastStep) {
   //                resetFormStep();                     // vuelve a step 1
   //             } else {
   //                onSubmitDone();                      // pasa al step siguiente
   //             }
   //          }, 2000); // misma duración que el toast
   //       }, 2000); // Espera inicial opcional

   //    } catch (error: any) {
   //       console.error("Error al enviar datos:", error);
   //       toast.error("Error al guardar los datos!", {
   //          description: error?.message || "Ocurrió un error inesperado.",
   //          duration: 5000,
   //       });
   //       setLoading(false); // ❗️ También ocultamos loader si entra en catch
   //    }
   // }

   async function onSubmit (values: PersonaSchemaType) {
      setCedula(values.num_documento); // ⬅️ Aquí compartes el dato al componente padre app/page.tsx
      
      setLoading(true);

      try {
         const response = await fetch(`http://localhost:4000/api/persona`, {
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
            setLoading(false);
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
      } catch (error: any) {
         console.error("Error al enviar datos:", error);
         toast.error("Error al guardar los datos!", {
            description: error?.message || "Ocurrió un error inesperado.",
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
                           <Direcciones form={form} tipo="residencia" />
                           <Direcciones form={form} tipo="correspondencia" />
                           <Separator />
                           <Button type="submit" className="w-auto" disabled={loading}>
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

export default PersonaForm;