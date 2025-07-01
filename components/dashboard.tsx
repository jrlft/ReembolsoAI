"use client"

import { FileText, Clock, CheckCircle, XCircle, DollarSign, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { User, Page } from "@/app/page"

interface DashboardProps {
  user: User
  onNavigate: (page: Page) => void
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const stats = [
    {
      title: "Pendentes",
      value: "3",
      subtitle: "Em andamento",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
      iconColor: "text-yellow-600",
    },
    {
      title: "Aprovados",
      value: "12",
      subtitle: "Este mês",
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
      iconColor: "text-green-600",
    },
    {
      title: "Reprovados",
      value: "1",
      subtitle: "Requer atenção",
      icon: XCircle,
      color: "bg-red-100 text-red-800",
      iconColor: "text-red-600",
    },
    {
      title: "Total Pago",
      value: "R$ 2.450",
      subtitle: "Reembolsado",
      icon: DollarSign,
      color: "bg-blue-100 text-blue-800",
      iconColor: "text-blue-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* CTA Principal */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Inicie seu pedido de reembolso aqui</h2>
              <p className="text-blue-100 mb-4">Organize seus documentos e acelere seu reembolso</p>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => onNavigate("new-reimbursement")}
              >
                Começar Agora
              </Button>
            </div>
            <div className="hidden sm:block">
              <FileText className="h-16 w-16 text-blue-200" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
            onClick={() => onNavigate("reimbursements")}
          >
            <Clock className="h-6 w-6" />
            <span>Ver Pendentes</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
            onClick={() => onNavigate("new-reimbursement")}
          >
            <Plus className="h-6 w-6" />
            <span>Novo Reembolso</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
