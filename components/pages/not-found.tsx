'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted px-4 text-center">
      <h1 className="absolute inset-0 text-[30vw] font-bold text-muted-foreground opacity-10 select-none pointer-events-none">
        404
      </h1>

      <div className="z-10">
        <p className="text-2xl sm:text-3xl font-medium text-foreground mb-6">
          So sorry,<br />
          we couldn’t find what you were looking for...
        </p>

        <Button
          onClick={() => router.push('/')}
          className=""
        >
          Back to the homepage
          <ArrowRight className="" />
        </Button>
      </div>
    </div>
  )
}
