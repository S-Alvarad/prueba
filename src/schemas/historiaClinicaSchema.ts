import { z } from "zod"

const intervenciones = z.discriminatedUnion("tiene_intervenciones", [
   z.object({
      tiene_intervenciones: z.literal(true),
      intervenciones: z.array(
         z.object({
            tipo: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
            fecha: z.coerce.date({
               required_error: "Este campo es obligatorio."
            }),
         })
      ),
   }),
   z.object({
      tiene_intervenciones: z.literal(false),
   })
]);

const enfermedades = z.discriminatedUnion("tiene_enfermedades", [
   z.object({
      tiene_enfermedades: z.literal(true),
      enfermedades: z.array(
         z.object({
            tipo: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
         })
      ),
   }),
   z.object({
      tiene_enfermedades: z.literal(false),
   })
]);

const medicamentos = z.discriminatedUnion("consume_medicamentos", [
   z.object({
      consume_medicamentos: z.literal(true),
      medicamentos: z.array(
         z.object({
            nombre_medicamento: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
            dosis: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
            frecuencia: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
         })
      ),
   }),
   z.object({
      consume_medicamentos: z.literal(false),
   })
]);

const accidentes = z.discriminatedUnion("tiene_accidentes", [
   z.object({
      tiene_accidentes: z.literal(true),
      accidentes: z.array(
         z.object({
            tipo: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
            gravedad: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
            fecha: z.coerce.date({
               required_error: "Este campo es obligatorio."
            }).or(z.literal("")),
         })
      ),
   }),
   z.object({
      tiene_accidentes: z.literal(false),
   })
]);

const psicoactivos = z.discriminatedUnion("consume_psicoactivos", [
   z.object({
      consume_psicoactivos: z.literal(true),
      psicoactivos: z.array(
         z.object({
            tipo: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
            frecuencia: z.string({
               required_error: "El campo es obligatorio."
            }).min(1, {
               message: "El campo es obligatorio.",
            }).transform(val => val.toUpperCase()),
         })
      ),
   }),
   z.object({
      consume_psicoactivos: z.literal(false),
   })
]);

export const historiaCinicaSchema = z.object({
   habito_fumar: z.coerce.boolean(),
   habito_licor: z.coerce.boolean(),
})
.and(intervenciones)
.and(enfermedades)
.and(medicamentos)
.and(accidentes)
.and(psicoactivos)

export type historiaCinicaSchemaType = z.infer<typeof historiaCinicaSchema>;