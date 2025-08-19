"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'; // Hook para redirecciones en Next.js
import { useSearchParams } from 'next/navigation';
import { Loader } from '@/components/loader'
import { Info } from "lucide-react"
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Componente de Shadcn/UI
import { Input } from '@/components/ui/input'; // Componente de Shadcn/UI
import { Button } from '@/components/ui/button'; // Componente de Shadcn/UI

function Error() {
   const [showDialog, setShowDialog] = useState(true);
   const [cedula, setCedula] = useState('');
   const router = useRouter(); // Hook de Next.js para navegación

   const handleRedirect = () => {
      if (cedula.trim()) {
         router.push(`/comprobante?cedula=${cedula}`); // Redirige a la ruta con la cédula
         setShowDialog(false); // Cierra el diálogo
      } else {
         alert('Por favor, ingrese una cédula válida'); // Mensaje si el input está vacío
      }
   };

   return (
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Error!</span>
               </AlertDialogTitle>
               <AlertDialogDescription className="text-primary font-semibold">
                  No se proporcionó una cédula válida.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4">
               <label htmlFor="cedula" className="block text-sm font-medium">
                  Ingrese su cédula:
               </label>
               <Input
                  id="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Ej: 1234567890"
                  className="mt-1"
               />
            </div>
            <AlertDialogFooter>
               <AlertDialogAction onClick={() => setShowDialog(false)}>Entendido</AlertDialogAction>
               <Button onClick={handleRedirect}>Redirigir</Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}

export default function ComprobantePage() {
   const searchParams = useSearchParams();
   const cedula = searchParams.get('cedula');
   const [isValid, setIsValid] = useState<boolean | null>(null);

   useEffect(() => {
      setIsValid(!!cedula);
   }, [cedula]);

   return isValid === null ? (
      <Loader />
   ) : isValid === false ? (
      <Error />
   ) : (
      // <SuccessCard cedula={cedula!} />
      <h1>Hola!</h1>
   );
}