import { useEffect, useState } from "react";

export function usePersistentCedula() {
   const [cedula, setCedulaState] = useState<string | null>(null);

   // Cargar desde localStorage al montar
   useEffect(() => {
      const saved = localStorage.getItem("cedula");
      if (saved) {
         setCedulaState(saved);
      }
   }, []);

   // Guardar cada vez que cambie
   const setCedula = (newCedula: string | null) => {
      if (newCedula) {
         localStorage.setItem("cedula", newCedula);
      } else {
         localStorage.removeItem("cedula");
      }
      setCedulaState(newCedula);
   };

   return [cedula, setCedula] as const;
}