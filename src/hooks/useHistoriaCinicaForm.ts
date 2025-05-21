import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { historiaCinicaSchema, historiaCinicaSchemaType } from '@/schemas/historiaClinicaSchema'

// 1. Define your form hook.
export function useHistoriaClinicaForm() {
   return useForm<historiaCinicaSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(historiaCinicaSchema),
      defaultValues: {
         tiene_intervenciones: false,
         tiene_enfermedades: false,
         consume_medicamentos: false,
         tiene_accidentes: false,
         consume_psicoactivos: false,
         // habito_fumar: false,
         // habito_licor: false,
      },
      shouldUnregister: true,
   });
}
