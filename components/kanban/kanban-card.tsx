"use client"

import React from "react"
import { Calendar, DollarSign, MoreHorizontal, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Reimbursement } from "@/types"

interface KanbanCardProps {
  reimbursement: Reimbursement
  isDragging: boolean
}

export const KanbanCard = React.memo(function KanbanCard({
  reimbursement,
  isDragging,
  ...props
}: KanbanCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={`bg-white shadow-sm hover:shadow-md transition-all cursor-pointer touch-manipulation ${
        isDragging ? "rotate-2 scale-105 shadow-lg" : ""
      }`}
      {...props}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight pr-2">{reimbursement.type}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 min-h-[44px] min-w-[44px] flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="min-h-[44px]">
                <FileText className="h-4 w-4 mr-2" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem className="min-h-[44px]">Editar</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 min-h-[44px]">Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="h-3 w-3 flex-shrink-0" />
            <span>{new Date(reimbursement.date).toLocaleDateString("pt-BR")}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <DollarSign className="h-3 w-3 flex-shrink-0" />
            <span className="font-medium text-green-600">R$ {reimbursement.value.toFixed(2)}</span>
          </div>

          <div className="text-xs text-gray-600">
            <span className="font-medium">{reimbursement.patient}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Badge variant="outline" className="text-xs">
            {reimbursement.plan}
          </Badge>
          <div className="flex items-center gap-1">
            {Array.from({ length: reimbursement.totalDocuments || 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < (reimbursement.documents || 0) ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
