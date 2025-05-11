"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TodoHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <CheckSquare className="h-6 w-6 text-primary" />
      <h1 className="text-2xl font-bold">TaskMaster</h1>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full ml-2"
      >
        {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
