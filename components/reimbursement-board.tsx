"use client"

import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
        <h1 className="text-2xl font-bold">Gestão de Reembolsos</h1>
        <Button onClick={() => onNavigate("new-reimbursement")}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Reembolso
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar reembolsos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger>
                <SelectValue placeholder="Plano de saúde" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os planos</SelectItem>
                <SelectItem value="unimed">Unimed</SelectItem>
                <SelectItem value="bradesco">Bradesco</SelectItem>
                <SelectItem value="amil">Amil</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDependent} onValueChange={setSelectedDependent}>
              <SelectTrigger>
                <SelectValue placeholder="Dependente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Silva</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: "1400px" }}>
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <Card className={`${column.color} border-0`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {column.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getReimbursementsByStatus(column.id).map((reimbursement) => (
                    <ReimbursementCard key={reimbursement.id} reimbursement={reimbursement} />
                  ))}
                  {column.id === "documentos" && <ReimbursementCard reimbursement={reimbursements[0]} />}
                  {column.id === "aprovado" && <ReimbursementCard reimbursement={reimbursements[2]} />}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
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
