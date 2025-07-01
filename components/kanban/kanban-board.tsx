"use client"

import { useState, useEffect, Suspense } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { useReimbursement } from "@/contexts/reimbursement-context"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { KanbanFilters } from "./kanban-filters"
import { MobileKanban } from "./mobile-kanban"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Reimbursement } from "@/types"

const COLUMNS = [
  { id: "iniciar", title: "Iniciar Reembolso", color: "bg-gray-100" },
  { id: "documentos", title: "Adicionando Documentos", color: "bg-yellow-100" },
  { id: "pronto", title: "Documentos Prontos", color: "bg-blue-100" },
  { id: "enviado", title: "Enviado à Seguradora", color: "bg-purple-100" },
  { id: "complementar", title: "Documentação Complementar", color: "bg-orange-100" },
  { id: "aprovado", title: "Aprovado", color: "bg-green-100" },
  { id: "pago", title: "Pago", color: "bg-green-200" },
] as const

export function KanbanBoard() {
  const { reimbursements, updateReimbursementStatus, refreshReimbursements, isLoading } = useReimbursement()
  const [filteredReimbursements, setFilteredReimbursements] = useState<Reimbursement[]>([])
  const [filters, setFilters] = useState({
    search: "",
    plan: "all",
    patient: "all",
  })

  useEffect(() => {
    refreshReimbursements()
  }, [refreshReimbursements])

  useEffect(() => {
    let filtered = reimbursements

    if (filters.search) {
      filtered = filtered.filter(
        (r) =>
          r.type.toLowerCase().includes(filters.search.toLowerCase()) ||
          r.patient.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.plan !== "all") {
      filtered = filtered.filter((r) => r.plan === filters.plan)
    }

    if (filters.patient !== "all") {
      filtered = filtered.filter((r) => r.patient === filters.patient)
    }

    setFilteredReimbursements(filtered)
  }, [reimbursements, filters])

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    try {
      await updateReimbursementStatus(draggableId, destination.droppableId)

      if (destination.droppableId === "pago" && typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Purchase", { value: 0, currency: "BRL" })
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
  }

  const getReimbursementsByStatus = (status: string) => {
    return filteredReimbursements.filter((r) => r.status === status)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Reembolsos</h1>
          <p className="text-gray-600">Acompanhe o status dos seus reembolsos</p>
        </div>
      </div>

      {/* Filtros */}
      <Suspense fallback={<div className="h-20 bg-gray-100 rounded-lg animate-pulse" />}>
        <KanbanFilters filters={filters} onFiltersChange={setFilters} />
      </Suspense>

      {/* Mobile Kanban */}
      <MobileKanban reimbursements={filteredReimbursements} onRefresh={refreshReimbursements} />

      {/* Desktop Kanban */}
      <div className="hidden lg:block">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max" style={{ minWidth: "1400px" }}>
              {COLUMNS.map((column) => {
                const columnReimbursements = getReimbursementsByStatus(column.id)

                return (
                  <Droppable key={column.id} droppableId={column.id}>
                    {(provided, snapshot) => (
                      <KanbanColumn
                        title={column.title}
                        count={columnReimbursements.length}
                        color={column.color}
                        isDraggedOver={snapshot.isDraggingOver}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {columnReimbursements.map((reimbursement, index) => (
                          <Draggable key={reimbursement.id} draggableId={reimbursement.id} index={index}>
                            {(provided, snapshot) => (
                              <KanbanCard
                                reimbursement={reimbursement}
                                isDragging={snapshot.isDragging}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </KanbanColumn>
                    )}
                  </Droppable>
                )
              })}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}
