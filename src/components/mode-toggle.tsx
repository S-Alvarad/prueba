"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
   const { theme, setTheme } = useTheme()
   const [mounted, setMounted] = React.useState(false)

   React.useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null // Evita el error de hidratación

   const isDark = theme === "dark"

   return (
      <Button variant="outline" size="icon" onClick={() => setTheme(isDark ? "light" : "dark")}>
         {isDark ? (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
         ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
         )}
         <span className="sr-only">Toggle theme</span>
      </Button>
   )
}
