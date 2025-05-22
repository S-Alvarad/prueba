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
         tipo_documento: "CC",                  // Cédula de Ciudadanía
         num_documento: "1234567890",
         primer_nombre: "Juan",
         segundo_nombre: "Carlos",
         primer_apellido: "Pérez",
         segundo_apellido: "Gómez",
         fecha_nacimiento: new Date("1990-05-21"),
         pais_nacimiento: "COLOMBIA",
         departamento_nacimiento: "VALLE DEL CAUCA",
         ciudad_nacimiento: "CALI",
         direccion_residencia: {
            direccion: "Cra. 8 #10-47",
            barrio: "La Merced",
            ciudad: "Cali",
            departamento: "Valle del Cauca",
         },
         direccion_correspondencia: {
            direccion: "Cra. 8 #10-47",
            barrio: "La Merced",
            ciudad: "Cali",
            departamento: "Valle del Cauca",
         },
         sexo: "M",                           // M = Masculino, F = Femenino (según tus opciones)
         tipo_sangre: "O+",                   // Ejemplo tipo de sangre
         personas_a_cargo: "2",
         estado_civil: "SOLTERO",
         celular: "3101234567",
         telefono: "2223344",
         tiene_hijos: false,
      },
      shouldUnregister: true,
   });
}
