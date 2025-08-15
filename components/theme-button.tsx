"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <Button size={'icon'} className="absolute top-6 md:top-1/2 md:-translate-y-1/2 right-0" onClick={() => setTheme(!isDark  ? "dark" : "light")}>
      <Moon className={isDark ? "hidden" : "block text-blue-500"} />
      <Sun className={isDark ? "block" : "hidden"} />
    </Button>
  )
}