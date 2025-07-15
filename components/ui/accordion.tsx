"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, ChevronRight, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-slate-200 last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  isDefaultOpen,
  isIconHidden,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  isDefaultOpen?: boolean;
  isIconHidden?: boolean;
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-2 text-left text-sm font-medium transition-all outline-none hover:text-red-500 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          // "[&[data-state=open]>svg]:rotate-180",
          !isDefaultOpen && "[&[data-state=open]>svg:nth-of-type(1)]:hidden",
          !isDefaultOpen && "[&[data-state=open]>svg:nth-of-type(2)]:block [&[data-state=open]>svg:nth-of-type(2)]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {!isDefaultOpen && !isIconHidden ? (
          <>
            <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
            <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 hidden" />
          </>
        ) : (!isIconHidden &&          
          <ChevronRight className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
