import { ModeToggle } from "@/components/mode-toggle";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"

import { PersonaForm } from '@/components/forms/persona/PersonaForm'
import { ConyugeForm } from '@/components/forms/conyuge/ConyugeForm'

export default function LoginPage() {
   return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted md:p-10">
         <div className="fixed right-4 top-4">
            <ModeToggle />
         </div>
         <div className="flex w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex-col gap-6 mx-auto p-2">
            <PersonaForm className="hidden"/>
            <ConyugeForm />
            <Card>
               <CardContent>
                  <Pagination>
                     <PaginationContent>
                        <PaginationItem>
                           <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                           <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                           <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                           <PaginationNext href="#" />
                        </PaginationItem>
                     </PaginationContent>
                  </Pagination>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
