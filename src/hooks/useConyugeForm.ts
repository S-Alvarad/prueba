import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConyugeSchema, ConyugeSchemaType } from '@/schemas/conyugeSchema'

// 1. Define your form hook.
export function useConyugeForm() {
   return useForm<ConyugeSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(ConyugeSchema),
      defaultValues: {
         tipo_documento: "CC",
         num_documento: "1143994968",
         primer_nombre: "juan",
         segundo_nombre: "",
         primer_apellido: "alvarado",
         segundo_apellido: "paez",
         fecha_nacimiento: new Date(),
         pais_nacimiento: "colombia",
         departamento_nacimiento: "",
         ciudad_nacimiento: "cali",
         direccion_residencia: {
            direccion: "Cra. 8 #10-47",
            barrio: "La Merced",
            ciudad: "Cali",
            departamento: "Valle del Cauca",
         },
         celular: "3192976668",
         telefono: "",
         tiene_trabajo: false,
      },
      shouldUnregister: true,
   });
}
