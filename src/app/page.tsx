"use client"
import React, { Suspense, useState, useEffect } from 'react'

import { ModeToggle } from "@/components/mode-toggle";
import { LoaderSkeleton } from "@/components/loader-skeleton"

const PersonaForm = React.lazy(() => import('@/components/forms/persona/PersonaForm'))
const ConyugeForm = React.lazy(() => import('@/components/forms/conyuge/ConyugeForm'))
const HistoriaClinicaForm = React.lazy(() => import('@/components/forms/historia-clinica/HistoriaClinicaForm'))

import { usePersistentCedula } from '@/hooks/utils/usePersistentCedula'

export default function FomPage() {
   const [step, setStep] = useState(1);
   const [delayPassed, setDelayPassed] = useState(false);
   const [cedula, setCedula] = usePersistentCedula();

   // Leer el step desde localStorage al montar (solo en cliente)
   useEffect(() => {
      if (typeof window !== "undefined") {
         const savedStep = localStorage.getItem("formStep")
         if (savedStep) {
            setStep(parseInt(savedStep, 10))
         }
      }
   }, [])

   useEffect(() => {
      // Guardar step cada vez que cambie
      if (typeof window !== "undefined") {
         localStorage.setItem("formStep", step.toString())
      }
      setDelayPassed(false);
      const timeout = setTimeout(() => {
         setDelayPassed(true);
      }, 1000);

      return () => clearTimeout(timeout);
   }, [step]);

   // Resetear el formulario completamente
   const resetFormStep = () => {
      if (typeof window !== "undefined") {
         localStorage.setItem("formStep", "1");
      }
      setStep(1);
      setCedula(null); // Esto borra de localStorage también
   }

   return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted md:p-10">
         <div className="fixed right-4 top-4">
            <ModeToggle />
         </div>
         <div className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto p-2">
            <Suspense fallback={<LoaderSkeleton />}>
               {!delayPassed ? (
                  <LoaderSkeleton />
               ) : (
                  <Suspense fallback={<LoaderSkeleton />}>
                     {step === 1 && (
                        <PersonaForm
                           onSubmitDone={() => setStep(2)}  // Avanzar al siguiente paso
                           resetFormStep={resetFormStep}   // Llamar cuando se termine todo
                           setCedula={setCedula}
                        />
                     )}
                     {step === 2 && (
                        <ConyugeForm
                           onSubmitDone={() => setStep(3)}  // Avanzar al siguiente paso
                           resetFormStep={resetFormStep}   // Llamar cuando se termine todo
                           isLastStep={true}
                           cedula={cedula}
                        />
                     )}
                     {step === 3 && (
                        <HistoriaClinicaForm />
                     )}
                  </Suspense>
               )}
            </Suspense>
         </div>
      </div>
   )
}
