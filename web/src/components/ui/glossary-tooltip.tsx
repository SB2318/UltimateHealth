"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

interface GlossaryTooltipProps {
  term: string
  definition: string
  children: React.ReactNode
  className?: string
}

function GlossaryTooltip({ term, definition, children, className }: GlossaryTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpen = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpen(true)
  }

  const handleClose = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 150)
  }

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        data-slot="glossary-tooltip-trigger"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={cn(
          "inline cursor-help rounded-sm underline decoration-dotted",
          "decoration-blue-500 underline-offset-2 text-blue-700",
          "dark:text-blue-400 dark:decoration-blue-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        {children}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          data-slot="glossary-tooltip-content"
          sideOffset={6}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={cn(
            "z-50 w-72 max-h-48 overflow-y-auto rounded-lg",
            "origin-(--radix-popover-content-transform-origin)",
            "bg-popover p-3 text-sm text-popover-foreground",
            "shadow-md ring-1 ring-foreground/10 outline-hidden duration-100",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          )}
          role="dialog"
          aria-label={`Definition of ${term}`}
        >
          <p className="font-semibold text-foreground mb-1">{term}</p>
          <p className="text-muted-foreground leading-relaxed">{definition}</p>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { GlossaryTooltip }
