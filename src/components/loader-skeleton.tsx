import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function LoaderSkeleton() {
   return (
      <Card>
         <CardContent>
            <div className="flex flex-col gap-3 space-y-3">
               <Skeleton className="h-[125px] w-full rounded-xl" />
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
            </div>
         </CardContent>
      </Card>
   )
} 