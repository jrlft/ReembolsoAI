"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Search, Edit, Trash2, UserCheck, UserX } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User, Page } from "@/app/page"

interface AdminUsersProps {
  user: User
  onNavigate: (page: Page) => void
}

interface SystemUser {
  id: string
  name: string
  email: string
  plan: "free" | "pro"
  status: "active" | "inactive"
  createdAt: string
  lastLogin: string
  reimbursementsCount: number
}

export function AdminUsers({ user, onNavigate }: AdminUsersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("all")

  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      plan: "free",
      status: "active",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20",
      reimbursementsCount: 3,
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      plan: "pro",
      status: "active",
      createdAt: "2024-01-10",
      lastLogin: "2024-01-19",
      reimbursementsCount: 15,
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com",
      plan: "free",
      status: "inactive",
      createdAt: "2024-01-05",
      lastLogin: "2024-01-10",
      reimbursementsCount: 1,
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = selectedPlan === "all" || user.plan === selectedPlan
    return matchesSearch && matchesPlan
  })

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
            <p className="text-gray-600">Cadastre e gerencie usuários do sistema</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="all">Todos os planos</option>
              <option value="free">Gratuito</option>
              <option value="pro">Pro</option>
            </select>
            <div className="text-sm text-gray-600 flex items-center">Total: {filteredUsers.length} usuários</div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((systemUser) => (
          <Card key={systemUser.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                    <AvatarFallback>{systemUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{systemUser.name}</h3>
                      <Badge variant={systemUser.status === "active" ? "default" : "secondary"}>
                        {systemUser.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                      <Badge variant={systemUser.plan === "pro" ? "default" : "outline"}>
                        {systemUser.plan === "pro" ? "Pro" : "Gratuito"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{systemUser.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Cadastrado: {new Date(systemUser.createdAt).toLocaleDateString("pt-BR")}</span>
                      <span>Último login: {new Date(systemUser.lastLogin).toLocaleDateString("pt-BR")}</span>
                      <span>{systemUser.reimbursementsCount} reembolsos</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toggleUserStatus(systemUser.id)}>
                    {systemUser.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
