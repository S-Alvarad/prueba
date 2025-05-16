import { z } from "zod"
import { enum_tipo_documento } from '@/constants/enums'

const EmpresaSchema = z.object({
   nombre_empresa: z.string().min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   direccion_empresa: z.string().min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   tipo_de_empresa: z.string().min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   telefono_empresa: z.string().min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
   ciudad_empresa: z.string().min(1, {
      message: "Campo obligatorio.",
   }).transform(val => val.toUpperCase()),
});
const DireccionResidenciaSchema = z.object({
   barrio: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "El barrio es obligatorio."
   }).transform(val => val.toUpperCase()),
   departamento: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "El departamento es obligatorio."
   }).transform(val => val.toUpperCase()),
   ciudad: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "La ciudad es obligatoria."
   }).transform(val => val.toUpperCase()),
   direccion: z.string({
      required_error: "El campo es obligatorio."
   }).min(1, {
      message: "La direccion es obligatoria."
   }).transform(val => val.toUpperCase()),
})
const LugarNacimientoSchema = z.object({
   pais_nacimiento: z.string({
      required_error: "El campo es obligatorio."
   }).transform(val => val.toUpperCase()).optional(),
   departamento_nacimiento: z.string().transform(val => val.toUpperCase()).optional(),
   ciudad_nacimiento: z.string({
      required_error: "El campo es obligatorio."
   }).transform(val => val.toUpperCase()).optional(),
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
   fecha_nacimiento: z.coerce.date({
      required_error: "Este campo es obligatorio."
   }),
   direccion_residencia: DireccionResidenciaSchema,
   telefono: z.string()
      .regex(/^\d+$/, { message: "Debe contener solo números" })
      .min(7, { message: "Debe tener al menos 7 dígitos" })
      .max(10, { message: "Debe tener máximo 10 dígitos" })
      .or(z.literal(""))
      .optional(),
   celular: z.string()
      .min(1, { message: "Este campo es obligatorio" })
      .length(10, { message: "Debe tener 10 dígitos" }) // Exactamente 10 dígitos
      .regex(/^\d+$/, { message: "Debe contener solo números" }),
})
   .and(LugarNacimientoSchema)
   .and(tieneTrabajo)

export type FormSchemaType = z.infer<typeof FormSchema>;