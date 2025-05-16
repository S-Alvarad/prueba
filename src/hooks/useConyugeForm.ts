// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { FormSchema, FormSchemaType } from '@/schemas/conyugeSchema'

// // 1. Define your form hook.
// export function useUserForm() {
//    return useForm<FormSchemaType>({
//       mode: "onBlur",
//       resolver: zodResolver(FormSchema),
//       defaultValues: {
//          tipo_documento: "CC",
//          num_documento: "1143994968",
//          primer_nombre: "steven",
//          segundo_nombre: "",
//          primer_apellido: "alvarado",
//          segundo_apellido: "paez",
//          fecha_nacimiento: new Date(),
//          pais_nacimiento: "colombia",
//          departamento_nacimiento: "",
//          ciudad_nacimiento: "cali",
//          direccion_residencia: {
//             direccion: "Cra. 8 #10-47",
//             barrio: "La Merced",
//             ciudad: "Cali",
//             departamento: "Valle del Cauca",
//          },
//          direccion_correspondencia: {
//             direccion: "",
//             barrio: "",
//             ciudad: "",
//             departamento: "",
//          },
//          sexo: "M",
//          tipo_sangre: "O+",
//          personas_a_cargo: 2,
//          estado_civil: "SOLTERO",
//          celular: "3192976668",
//          telefono: "",
//          tiene_hijos: false,
//       },
//       shouldUnregister: true,
//    });
// }
