"use client"

import { useState, Suspense } from "react"
import { Plus, MoreHorizontal, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { Page } from "@/app/page"

interface ReimbursementBoardProps {
  user: any
  onNavigate: (page: Page) => void
}

interface Reimbursement {
  id: string
  type: string
  patient: string
  value: number
  date: string
  status: string
  plan: string
  documents: number
  totalDocuments: number
}

export function ReimbursementBoard({ user, onNavigate }: ReimbursementBoardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [selectedDependent, setSelectedDependent] = useState("all")

  const columns = [
    { id: "iniciando", title: "Iniciando", color: "bg-gray-100", count: 2 },
    { id: "documentos", title: "Documentos", color: "bg-yellow-100", count: 3 },
    { id: "pronto", title: "Pronto", color: "bg-blue-100", count: 1 },
    { id: "enviado", title: "Enviado", color: "bg-purple-100", count: 2 },
    { id: "complementar", title: "Complementar", color: "bg-orange-100", count: 1 },
    { id: "aprovado", title: "Aprovado", color: "bg-green-100", count: 4 },
    { id: "pago", title: "Pago", color: "bg-green-200", count: 8 },
  ]

  const reimbursements: Reimbursement[] = [
    {
      id: "1",
      type: "Consulta Cardiologista",
      patient: "João Silva",
      value: 350,
      date: "2024-01-15",
      status: "documentos",
      plan: "Unimed",
      documents: 2,
      totalDocuments: 3,
    },
    {
      id: "2",
      type: "Exame Sangue",
      patient: "Maria Silva",
      value: 120,
      date: "2024-01-14",
      status: "pronto",
      plan: "Bradesco",
      documents: 3,
      totalDocuments: 3,
    },
    {
      id: "3",
      type: "Fisioterapia",
      patient: "João Silva",
      value: 80,
      date: "2024-01-13",
      status: "aprovado",
      plan: "Unimed",
      documents: 2,
      totalDocuments: 2,
    },
  ]

  const getReimbursementsByStatus = (status: string) => {
    return reimbursements.filter((r) => r.status === status)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Reembolsos</h1>
          <p className="text-gray-600">Acompanhe o status dos seus reembolsos</p>
        </div>
        <Button onClick={() => onNavigate("new-reimbursement")} className="min-h-[44px]">
          <Plus className="h-4 w-4 mr-2" />
          Novo Reembolso
        </Button>
      </div>

      {/* Kanban Board */}
      <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
        <KanbanBoard />
      </Suspense>
    </div>
  )
}

function ReimbursementCard({ reimbursement }: { reimbursement: Reimbursement }) {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-sm leading-tight">{reimbursement.type}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="h-3 w-3" />
            <span>{new Date(reimbursement.date).toLocaleDateString("pt-BR")}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <DollarSign className="h-3 w-3" />
            <span className="font-medium text-green-600">R$ {reimbursement.value.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            {/* Placeholder for User icon and name */}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <Badge variant="outline" className="text-xs">
            {reimbursement.plan}
          </Badge>
          <div className="flex items-center gap-1">
            {Array.from({ length: reimbursement.totalDocuments }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i < reimbursement.documents ? "bg-green-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
