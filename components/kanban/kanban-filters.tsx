"use client"

import React from "react"
import { Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KanbanFiltersProps {
  filters: {
    search: string
    plan: string
    patient: string
  }
  onFiltersChange: (filters: any) => void
}

export const KanbanFilters = React.memo(function KanbanFilters({ filters, onFiltersChange }: KanbanFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar reembolsos..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10 min-h-[44px]"
            />
          </div>
          <Select value={filters.plan} onValueChange={(value) => onFiltersChange({ ...filters, plan: value })}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Plano de saúde" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os planos</SelectItem>
              <SelectItem value="unimed">Unimed</SelectItem>
              <SelectItem value="bradesco">Bradesco</SelectItem>
              <SelectItem value="amil">Amil</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.patient} onValueChange={(value) => onFiltersChange({ ...filters, patient: value })}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Dependente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="joao">João Silva</SelectItem>
              <SelectItem value="maria">Maria Silva</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="min-h-[44px] bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})
