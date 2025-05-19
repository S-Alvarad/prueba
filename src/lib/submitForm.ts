import { UseFormReturn, FieldValues } from "react-hook-form";
import { toast } from "sonner"

type SubmitFormOptions<T extends FieldValues> = {
   endpoint: string;
   values: T;
   form: UseFormReturn<T>;
   isLastStep: boolean;
   onSubmitDone: () => void;
   resetFormStep: () => void;
   setLoading: (loading: boolean) => void;
};

export async function submitForm<T extends FieldValues>({
   endpoint,
   values,
   form,
   isLastStep,
   onSubmitDone,
   resetFormStep,
   setLoading,
}: SubmitFormOptions<T>) {
   setLoading(true);
   console.log(values);

   try {
      const response = await fetch(`http://localhost:4000/api/${endpoint}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
         toast.error("Error en la solicitud!", {
            description: data.message || "Ocurrió un error inesperado.",
            duration: 5000,
         });
         setLoading(false);
         return;
      }

      setTimeout(() => {
         setLoading(false);
         form.reset();

         toast.success("Datos guardados correctamente!", {
            description: isLastStep ? "Hoja de vida finalizada" : "Continuemos!",
            duration: 2000,
         });

         setTimeout(() => {
            if (isLastStep) {
               resetFormStep();
            } else {
               onSubmitDone();
            }
         }, 2000);
      }, 2000);
   } catch (error: any) {
      console.error("Error al enviar datos:", error);
      toast.error("Error al guardar los datos!", {
         description: error?.message || "Ocurrió un error inesperado.",
         duration: 5000,
      });
      setLoading(false);
   }
}
