import { z } from "zod"
import { enum_tipo_documento } from '@/constants/enums'

const EmpresaSchema = z.object({
   // nombre_empresa: z.string().min(1, {
   //    message: "Campo obligatorio.",
   // })
   nombre_empresa: z.string({
      required_error: "Campo obligatorio.",
   }).min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   direccion_empresa: z.string({
      required_error: "Campo obligatorio.",
   }).min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   tipo_de_empresa: z.string({
      required_error: "Campo obligatorio.",
   }).min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   // telefono_empresa: z.string({
   //    required_error: "Campo obligatorio.",
   // }).min(1, {
   //    message: "Campo obligatorio.",
   // }).transform(val => val.toUpperCase()),
   telefono_empresa: z.string()
         .min(7, { message: "Debe tener al menos 7 dígitos" })
         .max(10, { message: "Debe tener máximo 10 dígitos" }),
   ciudad_empresa: z.string({
      required_error: "Campo obligatorio.",
   }).min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
});
const DireccionResidenciaSchema = z.object({
   barrio: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "El barrio es obligatorio."
   }).transform(val => val.toUpperCase()).or(z.literal("")).optional(),
   departamento: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "El departamento es obligatorio."
   }).transform(val => val.toUpperCase()).or(z.literal("")).optional(),
   ciudad: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "La ciudad es obligatoria."
   }).transform(val => val.toUpperCase()).or(z.literal("")).optional(),
   direccion: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "La direccion es obligatoria."
   }).transform(val => val.toUpperCase()).or(z.literal("")).optional(),
})
const LugarNacimientoSchema = z.object({
   pais_nacimiento: z.string({
      required_error: "El campo es obligatorio."
   }).transform(val => val.toUpperCase()).or(z.literal("")).optional(),
   departamento_nacimiento: z.string().transform(val => val.toUpperCase()).or(z.literal("")).optional(),
   ciudad_nacimiento: z.string({
      required_error: "El campo es obligatorio."
   }).transform(val => val.toUpperCase()).or(z.literal("")).optional(),
});
const tieneTrabajo = z.discriminatedUnion("tiene_trabajo", [
   z.object({
      tiene_trabajo: z.literal(true),
      empresa: EmpresaSchema,
   }),
   z.object({
      tiene_trabajo: z.literal(false),
   })
])

export const ConyugeSchema = z.object({
   tipo_documento: z.enum(
      enum_tipo_documento.map(option => option.value) as [string, ...string[]], {
      message: "Seleccione un tipo de documento."
   }).optional().or(z.literal("")),
   num_documento: z.string().min(7, {
      message: "La cedula debe tener minimo 7 digitos.",
   }).max(10, {
      message: "La cedula debe tener máximo 10 caracteres.",
   }).optional().or(z.literal("")),
   primer_nombre: z.string().transform(val => val.toUpperCase()).optional(),
   segundo_nombre: z.string().transform(val => val.toUpperCase()).optional(),
   primer_apellido: z.string().transform(val => val.toUpperCase()).optional(),
   segundo_apellido: z.string().transform(val => val.toUpperCase()).optional(),
   fecha_nacimiento: z.coerce.date().optional(),
   direccion_residencia: DireccionResidenciaSchema,
   celular: z.union([
      z.literal(""), // permite vacío
      z.string()
         .min(7, { message: "Debe tener al menos 7 dígitos" })
         .max(10, { message: "Debe tener máximo 10 dígitos" }),
   ]).optional(), // también permite undefined
   telefono: z.union([
      z.literal(""), // permite vacío
      z.string()
         .min(7, { message: "Debe tener al menos 7 dígitos" })
         .max(10, { message: "Debe tener máximo 10 dígitos" }),
   ]).optional(), // también permite undefined
})
   .and(LugarNacimientoSchema)
   .and(tieneTrabajo)

export type ConyugeSchemaType = z.infer<typeof ConyugeSchema>;