import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UseFormReturn, FieldValues } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

type HandleStepNextProps<T extends FieldValues> = {
   form: UseFormReturn<T>;
   setFormData: React.Dispatch<React.SetStateAction<T>>;
   setStep: React.Dispatch<React.SetStateAction<number>>;
};

export async function handleStepNext<T extends FieldValues>({
   form,
   setFormData,
   setStep,
}: HandleStepNextProps<T>) {
   const isValid = await form.trigger(); // valida campos visibles

   if (isValid) {
      const currentStepData = form.getValues();

      // Guarda los datos validados en el objeto acumulador
      setFormData((prev) => {
         const newFormData = {
            ...prev,
            ...currentStepData,
         };
         console.log("📦 Objeto acumulado después del paso:", newFormData); // ✅ LOG para seguimiento
         return newFormData;
      });

      // Avanza al siguiente paso
      setStep((prev) => prev + 1);
   } else {
      console.log("Hay errores en el formulario. Revisa los campos resaltados.");
      // Aquí puedes poner un toast de error si lo estás usando
   }
}
