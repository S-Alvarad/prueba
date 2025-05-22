import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar"

export default function SocialProfileCard() {
   return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 md:p-10 bg-slate-950">
         <div className="flex w-full lg:max-w-lg xl:max-w-lg flex-col gap-6 mx-auto p-2">
            <Card className="relative grid grid-rows-[0.75fr_1fr] p-0 gap-0 h-[500px]"> {/* Ajusta h-[600px] según tu diseño */}
               <CardHeader className="rounded-t-xl" style={{ backgroundColor: "#7144f6" }}>
               <Avatar className="absolute left-6 top-1/2 transform -translate-y-1/2 w-28 h-28 border-4 border-slate-950 hidden">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-28 h-28" />
                  <AvatarFallback className="w-28 h-28 text-xl">PR</AvatarFallback>
               </Avatar>
               </CardHeader>
               <CardContent className="rounded-b-xl bg-slate-950 text-slate-50">
                  <p>Card Content</p>
               </CardContent>
            </Card>

         </div>
      </div>
   );
}
