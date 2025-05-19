import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConyugeSchema, ConyugeSchemaType } from '@/schemas/conyugeSchema'

// 1. Define your form hook.
export function useConyugeForm() {
   return useForm<ConyugeSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(ConyugeSchema),
      defaultValues: {
         tipo_documento: "",
         num_documento: "",
         primer_nombre: "",
         segundo_nombre: "",
         primer_apellido: "",
         segundo_apellido: "",
         fecha_nacimiento: undefined,
         pais_nacimiento: "",
         departamento_nacimiento: "",
         ciudad_nacimiento: "",
         direccion_residencia: {
            direccion: "",
            barrio: "",
            ciudad: "",
            departamento: "",
         },
         celular: "",
         telefono: "",
         tiene_trabajo: false,
      },
      shouldUnregister: true,
   });
}
