"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KanbanCard } from "./kanban-card"
import type { Reimbursement } from "@/types"

const COLUMNS = [
  { id: "iniciar", title: "Iniciar", color: "bg-gray-100" },
  { id: "documentos", title: "Documentos", color: "bg-yellow-100" },
  { id: "pronto", title: "Prontos", color: "bg-blue-100" },
  { id: "enviado", title: "Enviados", color: "bg-purple-100" },
  { id: "complementar", title: "Complementar", color: "bg-orange-100" },
  { id: "aprovado", title: "Aprovados", color: "bg-green-100" },
  { id: "pago", title: "Pagos", color: "bg-green-200" },
] as const

interface MobileKanbanProps {
  reimbursements: Reimbursement[]
  onRefresh: () => Promise<void>
}

export function MobileKanban({ reimbursements, onRefresh }: MobileKanbanProps) {
  const [currentColumn, setCurrentColumn] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const minSwipeDistance = 50

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }, [onRefresh])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentColumn < COLUMNS.length - 1) {
      setCurrentColumn((prev) => prev + 1)
    }
    if (isRightSwipe && currentColumn > 0) {
      setCurrentColumn((prev) => prev - 1)
    }
  }

  const getReimbursementsByStatus = (status: string) => {
    return reimbursements.filter((r) => r.status === status)
  }

  const currentColumnData = COLUMNS[currentColumn]
  const columnReimbursements = getReimbursementsByStatus(currentColumnData.id)

  return (
    <div className="lg:hidden">
      {/* Header com navegação */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentColumn((prev) => Math.max(0, prev - 1))}
            disabled={currentColumn === 0}
            className="min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="text-center">
            <h3 className="font-semibold text-sm">{currentColumnData.title}</h3>
            <p className="text-xs text-gray-500">
              {currentColumn + 1} de {COLUMNS.length}
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentColumn((prev) => Math.min(COLUMNS.length - 1, prev + 1))}
            disabled={currentColumn === COLUMNS.length - 1}
            className="min-h-[44px] min-w-[44px]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="min-h-[44px] min-w-[44px] bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Indicadores de página */}
      <div className="flex justify-center gap-1 mb-4">
        {COLUMNS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentColumn(index)}
            className={`w-2 h-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              index === currentColumn ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span className="sr-only">Ir para coluna {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Coluna atual */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="touch-pan-x"
      >
        <Card className={`${currentColumnData.color} border-0`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{currentColumnData.title}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {columnReimbursements.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {columnReimbursements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Nenhum reembolso nesta etapa</p>
              </div>
            ) : (
              columnReimbursements.map((reimbursement) => (
                <KanbanCard key={reimbursement.id} reimbursement={reimbursement} isDragging={false} />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dica de swipe */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">Deslize para navegar entre as colunas</p>
      </div>
    </div>
  )
}
