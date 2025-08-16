"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeButton() {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <Button size={'icon'} className="fixed z-5 top-4 md:top-20 right-0 dark:bg-stone-800 dark:hover:bg-stone-700" onClick={() => setTheme(!isDark  ? "dark" : "light")}>
      <Moon className={cn("text-blue-500", isDark ? "hidden" : "block")} />
      <Sun className={cn("text-yellow-300", isDark ? "block" : "hidden")} />
    </Button>
  )
}