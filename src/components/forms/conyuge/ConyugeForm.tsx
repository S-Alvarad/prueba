'use client';

import { useState } from "react";

import { cn } from "@/lib/utils"

import { UserRound, Loader2, Send, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"

// Hook
import { usePersonaForm } from '@/hooks/usePersonaForm'
// Schema ( z.infer<typeof Schema> )
import { PersonaSchemaType } from '@/schemas/personaSchema'

// Importa aquí las secciones del formulario de persona.


export function ConyugeForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
   const [loading, setLoading] = useState(false);

   // 1. Define tu formulario.
   const form = usePersonaForm();

   // 2. Define un controlador de envío.
   async function onSubmit(values: PersonaSchemaType) {
      console.log(values);
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
                        <Alert variant="emerald">
                           <CheckCircle className="h-4 w-4" />
                           <AlertTitle>Los siguientes campos no son obligatorios</AlertTitle>
                           <AlertDescription className="italic">
                              Puedes omitir esta informacion.
                           </AlertDescription>
                        </Alert>

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