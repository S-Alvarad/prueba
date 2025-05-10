import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSchema, FormSchemaType } from '@/schemas/formSchema'

// 1. Define your form hook.
export function useUserForm() {
   return useForm<FormSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(FormSchema),
      defaultValues: {
         tipo_documento: "",
         num_documento: "",
         primer_nombre: "",
         segundo_nombre: "",
         primer_apellido: "",
         segundo_apellido: "",
         fecha_nacimiento: undefined,
         lugar_nacimiento: {
            pais_nacimiento: "",
            departamento_nacimiento: "",
            ciudad_nacimiento: "",
         },
         // experienciaLaboral: false,
      },
      shouldUnregister: true,
   });
}
