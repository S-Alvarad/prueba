"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { cn, handleStepNext } from '@/lib/utils'

import { ModeToggle } from "@/components/mode-toggle";
import { LoaderSkeleton } from "@/components/loader-skeleton"
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from '@/components/ui/button'

const PersonaForm = React.lazy(() => import('@/components/forms/persona/PersonaForm'))
const ConyugeForm = React.lazy(() => import('@/components/forms/conyuge/ConyugeForm'))

export default function LoginPage() {
   const [step, setStep] = useState(1);
   const [delayPassed, setDelayPassed] = useState(false);

   const personaFormRef = useRef<(() => void) | null>(null);
   const conyugeFormRef = useRef<(() => void) | null>(null);

   useEffect(() => {
      setDelayPassed(false);
      const timeout = setTimeout(() => {
         setDelayPassed(true);
      }, 1000);

      return () => clearTimeout(timeout);
   }, [step]);

   const handleNext = () => {
      if (step === 1 && personaFormRef.current) {
         personaFormRef.current();
      } else if (step === 2 && conyugeFormRef.current) {
         conyugeFormRef.current();
      }
   };

   const handlePrevious = () => {
      setStep((prev) => Math.max(1, prev - 1));
   };

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
                           onSubmitDone={() => setStep(2)}
                           setSubmitRef={(fn) => (personaFormRef.current = fn)}
                        />
                     )}
                     {step === 2 && (
                        <ConyugeForm />
                     )}
                  </Suspense>
               )}
            </Suspense>
            <Card>
               <CardContent>
                  <Pagination className="block">
                     <PaginationContent className="justify-between">
                        <PaginationItem>
                           <PaginationPrevious
                              className={cn(buttonVariants({ variant: "outline" }))}
                              onClick={handlePrevious}
                              aria-disabled
                           />
                        </PaginationItem>
                        <PaginationItem>
                           <PaginationNext
                              className={cn(buttonVariants({ variant: "outline" }))}
                              onClick={handleNext}
                           />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
