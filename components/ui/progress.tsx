"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full flex-1 transition-all duration-200 ease-in-out"
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
            backgroundColor: 'currentColor'
          }}
        />
      </div>
    )
  }
)

Progress.displayName = "Progress"

export { Progress }
