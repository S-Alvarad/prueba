import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { vacunasCovidSchema, vacunasCovidSchemaType } from '@/schemas/vacunaCovidSchema'

// 1. Define your form hook.
export function useVacunasCovidForm() {
   return useForm<vacunasCovidSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(vacunasCovidSchema),
      defaultValues: {
         tiene_vacunas: false,
      },
      shouldUnregister: true,
   });
}
