import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PersonaSchema, PersonaSchemaType } from '@/schemas/personaSchema'

// 1. Define your form hook.
// export function usePersonaForm(defaultValues? : PersonaSchemaType) {
export function usePersonaForm() {
   return useForm<PersonaSchemaType>({
      mode: "onBlur",
      resolver: zodResolver(PersonaSchema),
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
         direccion_correspondencia: {
            direccion: "",
            barrio: "",
            ciudad: "",
            departamento: "",
         },
         sexo: "",
         tipo_sangre: "",
         personas_a_cargo: "",
         estado_civil: "",
         celular: "",
         telefono: "",
         tiene_hijos: false,
      },
      shouldUnregister: true,
   });
}
