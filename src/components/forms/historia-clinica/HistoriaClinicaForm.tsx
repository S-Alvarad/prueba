import React from 'react'
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

function HistoriaClinicaForm() {
   return (
      <div className="flex flex-col justify-center items-center gap-6">
         <Card className="w-full max-w-md shadow-lg border-green-500">
            <CardContent className="flex flex-col text-center gap-6 p-6">
               <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                  <h1 className="text-2xl font-semibold text-green-700">¡Hoja de vida registrada con éxito!</h1>
                  <p className="text-sm text-muted-foreground">
                     Gracias por enviar tu información. Puedes continuar completando secciones adicionales si lo deseas.
                  </p>
               </div>
            </CardContent>
         </Card>
      </div>

   )
}

export default HistoriaClinicaForm