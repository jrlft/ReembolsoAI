"use client"

import { ArrowLeft, Users, FileText, Settings, Shield, BarChart3, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { User, Page } from "@/app/page"

interface AdminDashboardProps {
  user: User
  onNavigate: (page: Page) => void
}

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const adminStats = [
    {
      title: "Usuários Ativos",
      value: "1,234",
      subtitle: "Este mês",
      icon: Users,
      color: "bg-blue-100 text-blue-800",
      iconColor: "text-blue-600",
    },
    {
      title: "Reembolsos Processados",
      value: "5,678",
      subtitle: "Este mês",
      icon: FileText,
      color: "bg-green-100 text-green-800",
      iconColor: "text-green-600",
    },
    {
      title: "Tipos de Consulta",
      value: "24",
      subtitle: "Configurados",
      icon: Settings,
      color: "bg-purple-100 text-purple-800",
      iconColor: "text-purple-600",
    },
    {
      title: "Tempo Médio",
      value: "7 dias",
      subtitle: "Processamento",
      icon: Clock,
      color: "bg-orange-100 text-orange-800",
      iconColor: "text-orange-600",
    },
  ]

  const adminActions = [
    {
      title: "Gerenciar Usuários",
      description: "Cadastrar e editar usuários do sistema",
      icon: Users,
      action: () => onNavigate("admin-users"),
    },
    {
      title: "Gerenciar Dependentes",
      description: "Configurar dependentes dos usuários",
      icon: Shield,
      action: () => onNavigate("admin-dependents"),
    },
    {
      title: "Tipos de Reembolso",
      description: "Configurar tipos de consulta e exames",
      icon: FileText,
      action: () => onNavigate("admin-reimbursement-types"),
    },
    {
      title: "Tipos de Documentos",
      description: "Gerenciar documentos disponíveis",
      icon: Settings,
      action: () => onNavigate("admin-document-types"),
    },
    {
      title: "Requisitos por Tipo",
      description: "Configurar documentos obrigatórios",
      icon: BarChart3,
      action: () => onNavigate("admin-requirements"),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie configurações do sistema</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
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

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Administrativas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={action.action}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <action.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
