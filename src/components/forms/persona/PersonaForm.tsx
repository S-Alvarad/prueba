'use client';

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils"

import { UserRound, Loader2, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"

// Hook
import { usePersonaForm } from '@/hooks/usePersonaForm'
// Schema ( z.infer<typeof Schema> )
import { PersonaSchemaType } from '@/schemas/personaSchema'

// Importa aquí las secciones del formulario.
import { DatosBasicos } from '@/components/forms/persona/components/DatosBasicos'
import { LugarNacimiento } from '@/components/forms/persona/components/LugarNacimiento'
import { DatosSecundarios } from '@/components/forms/persona/components/DatosSecundarios'
import { Direcciones } from '@/components/forms/persona/components/Direcciones'

type PersonaFormProps = React.ComponentPropsWithoutRef<"div"> & {
   onSubmitDone: () => void;
};

export function PersonaForm({ className, onSubmitDone, ...props }: PersonaFormProps) {
   const [loading, setLoading] = useState(false);

   // 1. Define tu formulario.
   const form = usePersonaForm();

   // 2. Define un controlador de envío.
   async function onSubmit(values: PersonaSchemaType) {
      setLoading(true);
      try {
         console.log(values);

         // Aquí va la lógica real de envío
         // await fetch("/api/personas", { method: "POST", body: JSON.stringify(values) });

         onSubmitDone(); // Avanza si todo salió bien
      } catch (error) {
         console.error("Error al enviar el formulario", error);
      } finally {
         setLoading(false);
      }
   }

   return (
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
   )
}

export default PersonaForm;