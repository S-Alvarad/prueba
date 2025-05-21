import { z } from "zod"
import { enum_vacunas_covid } from '@/constants/enums'

export const vacunasCovidSchema = z.discriminatedUnion("tiene_vacunas", [
   z.object({
      tiene_vacunas: z.literal(true),
      vacunas: z.array(
         z.object({
            nombre_vacuna: z.enum(
               enum_vacunas_covid.map(option => option.value) as [string, ...string[]], {
               message: "Seleccione una vacuna."
            }).transform(val => val.toUpperCase()),
            dosis_suministradas: z.coerce.number({
               invalid_type_error: "Este campo es obligatorio.",
               message: "Este campo es obligatorio."
            }).refine(val => !isNaN(val) && val > 0, {
               message: "Este campo es obligatorio y mayor a 0.",
            }),
            fecha: z.coerce.date({
               required_error: "Este campo es obligatorio."
            }),
         })
      ),
   }),
   z.object({
      tiene_vacunas: z.literal(false),
   })
]);

// export const vacunasCovidSchema = z.object({
//    ... No hay datos en este esquema
// }).and(vacunas); -> agrega vacunas al esquema principal

export type vacunasCovidSchemaType = z.infer<typeof vacunasCovidSchema>;