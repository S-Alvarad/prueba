'use client';

import { useState } from "react";

import { cn } from "@/lib/utils"

import { UsersRound , Loader2, Send, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"

// Hook
import { useConyugeForm } from '@/hooks/useConyugeForm'
// Schema ( z.infer<typeof Schema> )
import { ConyugeSchemaType } from '@/schemas/conyugeSchema'

// Importa aquí las secciones del formulario.
import { DatosBasicos } from '@/components/forms/conyuge/components/DatosBasicos'

function ConyugeForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
   const [loading, setLoading] = useState(false);

   // 1. Define tu formulario.
   const form = useConyugeForm();

   // 2. Define un controlador de envío.
   async function onSubmit(values: ConyugeSchemaType) {
      console.log(values);
   }

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="gap-0 p-0">
            <CardHeader className="text-start flex items-center space-x-3 border-b-[1px] p-6">
               <UsersRound  className="w-[40px] h-[40px] p-2 border rounded-full bg-muted" />
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
                           <CheckCircle className="h-4 w-4" />
                           <AlertTitle>La siguiente información <strong>NO</strong> es obligatoria!</AlertTitle>
                           <AlertDescription className="italic">
                              Puede omitir su diligenciamiento.
                           </AlertDescription>
                        </Alert>
                        <DatosBasicos form={form} />
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
export default ConyugeForm;