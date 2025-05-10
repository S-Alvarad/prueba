import { z } from "zod"
import { enum_tipo_documento } from '@/constants/enums'

const tieneHijosSchema = z.discriminatedUnion("tieneHijos", [
   z.object({
      tieneHijos: z.literal(true),
      numero_hijos: z.coerce.number({
         invalid_type_error: "Este campo es obligatorio."
      }),
   }),
   z.object({
      tieneHijos: z.literal(false),
   })
])

const LugarNacimientoSchema = z.object({
   pais_nacimiento: z.string().optional(),
   departamento_nacimiento: z.string().optional(),
   ciudad_nacimiento: z.string().optional(),
});

const DireccionesSchema = z.object({
   barrio: z.string().optional(),
   direccion: z.string().optional(),
   ciudad: z.string().optional(),
   departamento: z.string().optional(),
});

const DatosSecundariosSchema = z.object({
   sexo: z.enum(["M", "F"], {
      required_error: "Seleccione un sexo.",
   }),
   tipo_sangre: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      required_error: "Seleccione un tipo de sangre.",
   }),
   personas_a_cargo: z.coerce.number().optional(),
   estado_civil: z.enum(["Soltero", "Casado", "Divorciado", "Viudo"], {
      required_error: "Seleccione un estado civil.",
   }),
   celular1: z
      .string()
      .min(1, { message: "Este campo es obligatorio" })
      .length(10, { message: "Debe tener 10 dígitos" }) // Exactamente 10 dígitos
      .regex(/^\d+$/, { message: "Debe contener solo números" }),
   telefono_fijo: z
      .string()
      .regex(/^\d+$/, { message: "Debe contener solo números" })
      .min(7, { message: "Debe tener al menos 7 dígitos" })
      .max(10, { message: "Debe tener máximo 10 dígitos" })
      .or(z.literal(""))
      .optional(),
}).and(tieneHijosSchema);

export const FormSchema = z.object({
   tipo_documento: z.enum(
      enum_tipo_documento.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione un tipo de documento."
   }),
   num_documento: z.string().min(7, {
      message: "La cedula debe tener minimo 7 digitos.",
   }).max(10, {
      message: "La cedula debe tener máximo 10 caracteres.",
   }),
   primer_nombre: z.string().min(1, {
      message: "El nombre es obligatorio.",
   }),
   segundo_nombre: z.string().optional(),
   primer_apellido: z.string().min(1, {
      message: "El apellido es obligatorio.",
   }),
   segundo_apellido: z.string().optional(),
   fecha_nacimiento: z.date({
      required_error: "Este campo es obligatorio."
   }),
   lugar_nacimiento: LugarNacimientoSchema.optional(),
   direccion_residencia: DireccionesSchema.optional(),
   direccion_correspondencia: DireccionesSchema.optional(),
   datos_secundarios: DatosSecundariosSchema.optional(),
})



export type FormSchemaType = z.infer<typeof FormSchema>;