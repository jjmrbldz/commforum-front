import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ 
  className, 
  type, 
  icon, 
  iconPos = 'left',
  ...props }: 
  React.ComponentProps<"input"> & {
    icon?: React.ReactNode;
    iconPos?: "left" | "right";
  }) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-7 w-full min-w-0 border bg-transparent px-3 py-1 text-xs shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-xs file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-xs",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          icon && (iconPos === "left" ? "pl-7" : "pr-7"),
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
