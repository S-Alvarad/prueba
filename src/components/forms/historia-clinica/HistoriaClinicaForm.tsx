'use client';

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils"
import { submitForm } from '@/lib/submitForm'

import { HeartPlus, Loader2, ChevronsRight, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner";

// Hook
import { useHistoriaClinicaForm } from '@/hooks/useHistoriaCinicaForm'
// Schema ( z.infer<typeof Schema> )
import { historiaCinicaSchemaType } from '@/schemas/historiaClinicaSchema'

// Importa aquí las secciones del formulario.
import { Intervenciones } from '@/components/forms/historia-clinica/components/Intervenciones'
import { Enfermedades } from '@/components/forms/historia-clinica/components/Enfermedades'
import { Medicamentos } from '@/components/forms/historia-clinica/components/Medicamentos'
import { Accidentes } from '@/components/forms/historia-clinica/components/Accidentes'
import { Psicoactivos } from '@/components/forms/historia-clinica/components/Psicoactivos'

import { Loader } from '@/components/loader'

type HistoriaClinicaFormProps = React.ComponentPropsWithoutRef<"div"> & {
   onSubmitDone: () => void;
   resetFormStep: () => void;
   isLastStep?: boolean;           // ← añade esta prop
   cedula: string | null;
};

export function HistoriaClinicaForm({ className, onSubmitDone, resetFormStep, isLastStep, cedula, ...props }: HistoriaClinicaFormProps) {
   const [loading, setLoading] = useState(false);

   // 1. Define tu formulario.
   const form = useHistoriaClinicaForm();

   // 🔍 logFormErrorsEffect
   useEffect(() => {
      if (form.formState.errors) {
         const errors = form.formState.errors;
         if (Object.keys(errors).length > 0) {
            console.log("validador:", form.formState.errors);
            toast.error("Por favor, completa los campos obligatorios.");
         }
      }
   }, [form.formState.errors]);

   // 2. Define un controlador de envío.
   async function onSubmit(values: historiaCinicaSchemaType) {
      // Combina los valores del formulario con la cedula que viene del padre
      const payload = {
         ...values,
         num_documento_persona: cedula, // agregamos la cedula al payload
      };
      console.table({ submitFormPayload: payload });

      // Funcion onSubmit reutilizable
      submitForm<historiaCinicaSchemaType>({
         endpoint: "historia_clinica",
         values: payload,  // <-- usa payload en vez de solo values
         form,
         isLastStep: isLastStep ?? false, // ✅ usa false si es undefined
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
                  <HeartPlus className="w-[40px] h-[40px] p-2 border rounded-full bg-muted" />
                  <div>
                     <CardTitle className="text-2xl font-bold">Historia clinica</CardTitle>
                     <CardDescription className="italic text-md text-muted-foreground">
                        Datos clinicos
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
                                 Puede omitir su diligenciamiento dando click en el botón "Continuar" al final.
                              </AlertDescription>
                           </Alert>
                           <FormField
                              control={form.control}
                              name="habito_fumar"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow border-primary/50">
                                       <FormControl className="scale-130">
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             className="dark:data-[state=checked]:bg-emerald-400 dark:data-[state=checked]:border-emerald-400
                                                         data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                          />
                                       </FormControl>
                                       <div className="space-y-1 leading-none">
                                          <span>¿Tiene el hábito de fumar actualmente?</span>
                                       </div>
                                    </FormLabel>
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="habito_licor"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow border-primary/50">
                                       <FormControl className="scale-130">
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             className="dark:data-[state=checked]:bg-emerald-400 dark:data-[state=checked]:border-emerald-400
                                                         data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                          />
                                       </FormControl>
                                       <div className="space-y-1 leading-none">
                                          <span>¿Consume bebidas alcohólicas de forma habitual?</span>
                                       </div>
                                    </FormLabel>
                                 </FormItem>
                              )}
                           />
                           <Separator className="bg-primary" />
                           <Intervenciones form={form} />
                           <Enfermedades form={form} />
                           <Medicamentos form={form} />
                           <Accidentes form={form} />
                           <Psicoactivos form={form} />
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

export default HistoriaClinicaForm;