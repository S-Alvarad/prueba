import { z } from "zod"
import { enum_tipo_documento, enum_sexo, enum_tipo_rh, enum_estado_civil } from '@/constants/enums'

const tieneHijosSchema = z.discriminatedUnion("tiene_hijos", [
   z.object({
      tiene_hijos: z.literal(true),
      numero_hijos: z.string({
         invalid_type_error: "Este campo es obligatorio.",
         message: "Este campo es obligatorio."
      }),
   }),
   z.object({
      tiene_hijos: z.literal(false),
   })
])

const LugarNacimientoSchema = z.object({
   pais_nacimiento: z.string({ required_error: "El campo es obligatorio." }).transform(val => val.toUpperCase()).optional(),
   departamento_nacimiento: z.string({ required_error: "El campo es obligatorio." }).transform(val => val.toUpperCase()).optional(),
   ciudad_nacimiento: z.string({ required_error: "El campo es obligatorio." }).transform(val => val.toUpperCase()).optional(),
});

const DireccionesSchema = z.object({
   departamento: z.string({ required_error: "El campo es obligatorio." }).min(1, { message: "El departamento es obligatorio." }).transform(val => val.toUpperCase()),
   ciudad: z.string({ required_error: "El campo es obligatorio." }).min(1, { message: "La ciudad es obligatoria." }).transform(val => val.toUpperCase()),
   barrio: z.string({ required_error: "El campo es obligatorio." }).min(1, { message: "El barrio es obligatorio." }).transform(val => val.toUpperCase()),
   direccion: z.string({ required_error: "El campo es obligatorio." }).min(1, { message: "La direccion es obligatoria." }).transform(val => val.toUpperCase()),
}).optional();

const DatosSecundariosSchema = z.object({
   sexo: z.enum(
      enum_sexo.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione un sexo."
   }),
   tipo_sangre: z.enum(
      enum_tipo_rh.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione tipo de RH."
   }),
   estado_civil: z.enum(
      enum_estado_civil.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione un estado civil."
   }),
   personas_a_cargo: z.string().optional(),
   celular: z.string()
      .min(1, { message: "Este campo es obligatorio" })
      .length(10, { message: "Debe tener 10 dígitos" }) // Exactamente 10 dígitos
      .regex(/^\d+$/, { message: "Debe contener solo números" }),
   telefono: z.string()
      .regex(/^\d+$/, { message: "Debe contener solo números" })
      .min(7, { message: "Debe tener al menos 7 dígitos" })
      .max(10, { message: "Debe tener máximo 10 dígitos" })
      .or(z.literal(""))
      .optional(),
});

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
   }).transform(val => val.toUpperCase()),
   segundo_nombre: z.string().transform(val => val.toUpperCase()).optional(),
   primer_apellido: z.string().min(1, {
      message: "El apellido es obligatorio.",
   }).transform(val => val.toUpperCase()),
   segundo_apellido: z.string().transform(val => val.toUpperCase()).optional(),
   fecha_nacimiento: z.date({
      required_error: "Este campo es obligatorio."
   }),
   // lugar_nacimiento: LugarNacimientoSchema.optional(),
   direccion_residencia: DireccionesSchema.optional(),
   direccion_correspondencia: DireccionesSchema.optional(),
   // datos_secundarios: DatosSecundariosSchema.optional(),
})
   .and(LugarNacimientoSchema)
   // DireccionesSchema
   .and(DatosSecundariosSchema)
   .and(tieneHijosSchema);



export type FormSchemaType = z.infer<typeof FormSchema>;