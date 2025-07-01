"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface KanbanColumnProps {
  title: string
  count: number
  color: string
  isDraggedOver: boolean
  children: React.ReactNode
}

export const KanbanColumn = React.memo(
  React.forwardRef<HTMLDivElement, KanbanColumnProps & React.HTMLAttributes<HTMLDivElement>>(function KanbanColumn(
    { title, count, color, isDraggedOver, children, ...props },
    ref,
  ) {
    return (
      <div ref={ref} className="flex-shrink-0 w-80" {...props}>
        <Card className={`${color} border-0 ${isDraggedOver ? "ring-2 ring-blue-500" : ""} transition-all`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {count}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 min-h-[200px]">{children}</CardContent>
        </Card>
      </div>
    )
  }),
)
