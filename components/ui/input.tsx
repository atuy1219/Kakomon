import * as React from "react"

import { cn } from "@/lib/utils"

// al25133/kakomon/Kakomon-5b576818e89f5e0049ab3ff32aa56ea8dec4e81a/components/ui/input.tsx
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        "border-input h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        
        /* 変更点: 枠線を下線のみにし、背景色を薄くつける */
        "bg-muted/50 border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-primary",

        className
      )}
      {...props}
    />
  )
}

export { Input }
