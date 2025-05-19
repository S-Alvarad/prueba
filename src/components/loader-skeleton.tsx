import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export function LoaderSkeleton() {
   return (
      <Card className="gap-0 p-0">
         <CardHeader className="text-start flex items-center gap-6 space-y-4 border-b-[1px] p-6">
            <Skeleton className="w-11 h-10 rounded-full bg-muted m-0" />
            <div className="grid grid-cols-1 gap-3 w-full">
               <Skeleton className="h-5 w-[50%]" />
               <Skeleton className="h-3 w-[30%]" />
            </div>
         </CardHeader>
         <CardContent className="p-6">
            <div className="flex flex-col gap-3 space-y-3">
               <Skeleton className="h-[100px] w-full rounded-xl" />
               <div className="grid grid-cols-2 gap-3 space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
               </div>
               <div className="grid grid-cols-1 gap-3 space-y-2">
                  <Skeleton className="h-10 w-full" />
               </div>
               <Button type="button" className="w-auto" disabled={true}>
                  <Loader2 className="animate-spin" /> Cargando...
               </Button>
            </div>
         </CardContent>
      </Card>
   )
} 