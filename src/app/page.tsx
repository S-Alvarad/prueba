"use client"

import React, { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ModeToggle } from "@/components/mode-toggle";
import { LoaderSkeleton } from "@/components/loader-skeleton"

const PersonaForm = React.lazy(() => import('@/components/forms/persona/PersonaForm'))
const ConyugeForm = React.lazy(() => import('@/components/forms/conyuge/ConyugeForm'))
const HistoriaClinicaForm = React.lazy(() => import('@/components/forms/historia-clinica/HistoriaClinicaForm'))
const VacunaCovidForm = React.lazy(() => import('@/components/forms/vacuna-covid/VacunaCovidForm'))

import { usePersistentCedula } from '@/hooks/utils/usePersistentCedula'

export default function FormPage() {
   const [step, setStep] = useState(1);
   const [delayPassed, setDelayPassed] = useState(false);
   const [cedula, setCedula] = usePersistentCedula();
   const router = useRouter();

   // Leer el step desde localStorage al montar (solo en cliente)
   useEffect(() => {
      if (typeof window !== "undefined") {
         const savedStep = localStorage.getItem("step")
         if (savedStep) {
            setStep(parseInt(savedStep, 10))
         }
      }
   }, [])

   useEffect(() => {
      // Guardar step cada vez que cambie
      if (typeof window !== "undefined") {
         localStorage.setItem("step", step.toString())
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
         const cedula = localStorage.getItem("cedula"); // Obtiene la cédula guardada

         // Luego limpia el estado y localStorage
         localStorage.setItem("step", "1");
         localStorage.removeItem("cedula");

         setCedula(null); // Esto borra de localStorage también
         setStep(1); // Reinicia el formulario al paso 1

         // Redirige usando la cédula obtenida
         router.push(`/comprobante?cedula=${cedula}`);
      }
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
                           resetFormStep={resetFormStep}    // Llamar cuando se termine todo
                           setCedula={setCedula}
                        />
                     )}
                     {step === 2 && (
                        <ConyugeForm
                           onSubmitDone={() => setStep(3)}  // Avanzar al siguiente paso
                           resetFormStep={resetFormStep}    // Llamar cuando se termine todo
                           cedula={cedula}
                        />
                     )}
                     {step === 3 && (
                        <HistoriaClinicaForm
                           onSubmitDone={() => setStep(4)}  // Avanzar al siguiente paso
                           resetFormStep={resetFormStep}    // Llamar cuando se termine todo
                           // isLastStep={true}                // Llamar cuando se termine todo
                           cedula={cedula}
                        />
                     )}
                     {step === 4 && (
                        <VacunaCovidForm
                           onSubmitDone={() => setStep(5)}  // Avanzar al siguiente paso
                           resetFormStep={resetFormStep}    // Llamar cuando se termine todo
                           isLastStep={true}                // Llamar cuando se termine todo
                           cedula={cedula}
                        />
                     )}
                     {/* EstiloDeVidaForm */}
                     {/* ConocimientoForm */}
                     {/* ExperienciaLaboralForm */}
                     {/* SituacionGeneralForm */}
                     {/* EducacionBasicaForm -> vuela */}
                     {/* EducacionSuperiorForm */}
                     {/* ReferenciaFamiliarForm */}
                  </Suspense>
               )}
            </Suspense>
         </div>
      </div>
   )
}
