import { Formulario } from "@/components/formulario/Formulario"
import { ModeToggle } from "@/components/mode-toggle";

export default function LoginPage() {
   return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted md:p-10">
         <div className="fixed right-4 top-4">
            <ModeToggle />
         </div>
         <div className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto p-2">
            <Formulario />
         </div>
      </div>
   )
}
