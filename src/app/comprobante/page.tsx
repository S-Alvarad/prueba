"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useRef, useEffect } from "react"
import { useSearchParams } from 'next/navigation';

import QRCode from "react-qr-code"
import { toPng } from "html-to-image"
import { CheckCircle2, Download, CircleArrowRight } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Error() {
   return (
      <div>
         <h1>Error</h1>
         <p>No se proporcionó una cédula válida.</p>
      </div>
   );
}
function SuccessCard({ cedula }: { cedula: string }) {
   const { theme } = useTheme()
   // const text = "http://192.168.120.79:3000/"
   const text = `http://192.168.120.79:3000/comprobante?cedula=${cedula}`
   const size = 200
   const [bgColor, setBgColor] = useState("#FFFFFF")
   const [fgColor, setFgColor] = useState("#000000")
   const qrRef = useRef<HTMLDivElement>(null)

   // Actualiza los colores según el tema
   useEffect(() => {
      if (theme === "dark") {
         setBgColor("#27272a")
         setFgColor("#FFFFFF")
      } else {
         setBgColor("#f4f4f5")
         setFgColor("#000000")
      }
   }, [theme])

   const downloadCardAsImage = () => {
      const cardElement = qrRef.current
      if (!cardElement) return

      toPng(cardElement, {
         cacheBust: true,
         style: {
            margin: "0 auto",
            display: "block",
            backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
         },
      })
         .then((dataUrl) => {
            const link = document.createElement("a")
            link.download = "registro.png"
            link.href = dataUrl
            link.click()
         })
         .catch((err) => {
            console.error("Error al generar la imagen:", err)
         })
   }

   return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted md:p-10">
         <div className="fixed right-4 top-4">
            <ModeToggle />
         </div>

         <div ref={qrRef} className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto p-2">
            <Card className="w-full max-w-md mx-auto shadow-md">
               <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                     <CheckCircle2 className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Registro completo!</CardTitle>
                  <CardDescription>Por favor conserve el código del registro</CardDescription>
               </CardHeader>
               <CardContent className="grid gap-6">
                  <Alert className="bg-muted text-muted-foreground">
                     <AlertDescription>
                        Tu contenido ya está disponible y es visible para todos. ¡Gracias por tu contribución!
                     </AlertDescription>
                  </Alert>
                  <div className="text-md text-muted-foreground font-semibold">
                     <p>Código: {cedula}</p>
                     <p>Publicado el: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-center p-4 bg-muted rounded-md" ref={qrRef}>
                     {text && <QRCode value={text} size={size} bgColor={bgColor} fgColor={fgColor} level="H" />}
                  </div>
               </CardContent>
               <CardFooter className="flex flex-col gap-2">
                  <Button asChild className="w-full">
                     <Link href="/">
                        <CircleArrowRight className="h-4 w-4" />
                        Volver al inicio
                     </Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={downloadCardAsImage}>
                     <Download className="mr-2 h-4 w-4" />
                     Descargar tarjeta
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </div>
   )
}
export default function ComprobantePage() {
   const searchParams = useSearchParams();
   const cedula = searchParams.get('cedula');
   const [isValid, setIsValid] = useState<boolean | null>(null);

   useEffect(() => {
      setIsValid(!!cedula);
   }, [cedula]);

   return isValid === null ? (
      <div>Cargando...</div>
   ) : isValid === false ? (
      <Error />
   ) : (
      <SuccessCard cedula={cedula!} />
   );
}











// function SuccessCard() {
// const { theme } = useTheme()
// // const text = "http://192.168.120.79:3000/"
// const text = "GAY EL QUE LO LEA"
// const size = 200
// const [bgColor, setBgColor] = useState("#FFFFFF")
// const [fgColor, setFgColor] = useState("#000000")
// const qrRef = useRef<HTMLDivElement>(null)

// // Actualiza los colores según el tema
// useEffect(() => {
//    if (theme === "dark") {
//       setBgColor("#27272a")
//       setFgColor("#FFFFFF")
//    } else {
//       setBgColor("#f4f4f5")
//       setFgColor("#000000")
//    }
// }, [theme])

// const downloadCardAsImage = () => {
//    const cardElement = qrRef.current
//    if (!cardElement) return

//    toPng(cardElement, {
//       cacheBust: true,
//       style: {
//          margin: "0 auto",
//          display: "block",
//          backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
//       },
//    })
//       .then((dataUrl) => {
//          const link = document.createElement("a")
//          link.download = "registro.png"
//          link.href = dataUrl
//          link.click()
//       })
//       .catch((err) => {
//          console.error("Error al generar la imagen:", err)
//       })
// }


// return (
//    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted md:p-10">
//       <div className="fixed right-4 top-4">
//          <ModeToggle />
//       </div>

//       <div ref={qrRef} className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto p-2">
//          <Card className="w-full max-w-md mx-auto shadow-md">
//             <CardHeader className="text-center">
//                <div className="flex justify-center mb-2">
//                   <CheckCircle2 className="h-12 w-12 text-primary" />
//                </div>
//                <CardTitle className="text-xl text-primary">Registro completo!</CardTitle>
//                <CardDescription>Por favor conserve el código del registro</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//                <Alert className="bg-muted text-muted-foreground">
//                   <AlertDescription>
//                      Tu contenido ya está disponible y es visible para todos. ¡Gracias por tu contribución!
//                   </AlertDescription>
//                </Alert>
//                <div className="text-md text-muted-foreground font-semibold">
//                   <p>Código: #622EF143</p>
//                   <p>Publicado el: {new Date().toLocaleDateString()}</p>
//                </div>
//                <div className="flex justify-center p-4 bg-muted rounded-md" ref={qrRef}>
//                   {text && <QRCode value={text} size={size} bgColor={bgColor} fgColor={fgColor} level="H" />}
//                </div>
//             </CardContent>
//             <CardFooter className="flex flex-col gap-2">
//                <Button asChild className="w-full">
//                   <Link href="/">
//                      <CircleArrowRight className="h-4 w-4" />
//                      Volver al inicio
//                   </Link>
//                </Button>
//                <Button variant="outline" className="w-full" onClick={downloadCardAsImage}>
//                   <Download className="mr-2 h-4 w-4" />
//                   Descargar tarjeta
//                </Button>
//             </CardFooter>
//          </Card>
//       </div>
//    </div>
// )
// }