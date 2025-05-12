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
         direccion_residencia: {
            barrio: "",
            direccion: "",
            ciudad: "",
            departamento: "",
         },
         // direccion_correspondencia: {
         //    barrio: "",
         //    direccion: "",
         //    ciudad: "",
         //    departamento: "",
         // },
         // datos_secundarios: {
         //    sexo: "",
         //    tipo_sangre: "",
         //    personas_a_cargo: 0,
         //    estado_civil: "",
         //    celular1: "",
         //    telefono_fijo: "",
         // }
         // experienciaLaboral: false,
      },
      shouldUnregister: true,
   });
}
