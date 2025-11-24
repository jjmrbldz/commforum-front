"use client"

import { useGameMessageListener } from "@/hooks/use-game-message";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  src: string
}

export default function GameIframe({src, className = ""}: Props) {
  useGameMessageListener();

  return (
    <iframe className={cn("w-full h-[calc(100vh-128px)] md:h-[unset] md:aspect-video", className)} src={src} />
  )
}