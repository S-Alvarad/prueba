'use client';

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils"
import { submitForm } from '@/lib/submitForm'

import { UsersRound, Loader2, Send, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Hook
import { useConyugeForm } from '@/hooks/useConyugeForm'
// Schema ( z.infer<typeof Schema> )
import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

// Importa aquí las secciones del formulario.
import { DatosBasicos } from '@/components/forms/conyuge/components/DatosBasicos'
import { Direcciones } from '@/components/forms/conyuge/components/Direcciones'
import { DatosSecundarios } from '@/components/forms/conyuge/components/DatosSecundarios'
import { LugarNacimiento } from '@/components/forms/conyuge/components/LugarNacimiento'

import { Loader } from '@/components/loader'

type ConyugeFormProps = React.ComponentPropsWithoutRef<"div"> & {
   onSubmitDone: () => void;
   resetFormStep: () => void;
   isLastStep?: boolean;           // ← añade esta prop
   cedula: string | null;
};

function ConyugeForm({ className, onSubmitDone, resetFormStep, isLastStep, cedula, ...props }: ConyugeFormProps) {
   const [loading, setLoading] = useState(false);

   // 1. Define tu formulario.
   const form = useConyugeForm();

   // 🔍 logFormErrorsEffect
   useEffect(() => {
      if (form.formState.errors) {
         console.log(form.formState.errors);
      }
   }, [form.formState.errors]);

   // 2. Define un controlador de envío.
   // async function onSubmit(values: ConyugeSchemaType) {
   //    console.log(values);
   // }

   const onSubmit = (values: ConyugeSchemaType) => {
      // Combina los valores del formulario con la cedula que viene del padre
      const payload = {
         ...values,
         num_documento_persona: cedula, // agregamos la cedula al payload
      };

      // Funcion onSubmit reutilizable
      submitForm<ConyugeSchemaType>({
         endpoint: "conyuge",
         values: payload,  // <-- usa payload en vez de solo values
         form,
         isLastStep: false,
         onSubmitDone,
         resetFormStep,
         setLoading
      });
   };

   return (
      <>
         {loading && <Loader />}
         <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="gap-0 p-0">
               <CardHeader className="text-start flex items-center space-x-3 border-b-[1px] p-6">
                  <UsersRound className="w-[40px] h-[40px] p-2 border rounded-full bg-muted" />
                  <div>
                     <CardTitle className="text-2xl font-bold">Información del conyuge</CardTitle>
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
                           <Alert variant="emerald">
                              <Info className="h-4 w-4" />
                              <AlertTitle>La siguiente información <strong>NO</strong> es obligatoria!</AlertTitle>
                              <AlertDescription className="italic">
                                 Puede omitir su diligenciamiento.
                              </AlertDescription>
                           </Alert>
                           <DatosBasicos form={form} />
                           <Direcciones form={form} />
                           <DatosSecundarios form={form} />
                           <LugarNacimiento form={form} />
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
export default ConyugeForm;