"use client"

import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return isVisible && (
    <Button variant={"default"} size="icon" className="fixed z-5 bottom-4 right-4 size-10 rounded-full" onClick={scrollToTop}>
      <ChevronUp size={120} strokeWidth={3} />
    </Button>
  )
}
