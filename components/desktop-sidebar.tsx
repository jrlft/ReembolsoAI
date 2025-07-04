"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  Plus,
  CreditCard,
  UserIcon,
  Lock,
  Receipt,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react"
import type { Page } from "@/app/app/page"

interface SidebarUser {
  name: string
  email: string
  avatar: string
  plan: "free" | "pro"
  reimbursementsUsed: number
  reimbursementsLimit: number
}

interface DesktopSidebarProps {
  user: SidebarUser
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function DesktopSidebar({ user, currentPage, onNavigate }: DesktopSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reimbursements", label: "Reembolsos", icon: FileText },
    { id: "new-reimbursement", label: "Novo Reembolso", icon: Plus },
    { id: "plans", label: "Planos", icon: CreditCard },
  ]

  const accountItems = [
    { id: "profile", label: "Meus Dados", icon: UserIcon },
    { id: "password", label: "Alterar Senha", icon: Lock },
    { id: "billing", label: "Plano & Cobrança", icon: Receipt },
  ]

  const adminItems = user.plan === "pro" ? [{ id: "admin", label: "Painel Admin", icon: Settings }] : []

  const supportItems = [{ id: "help", label: "Ajuda", icon: HelpCircle }]

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200 lg:pt-16 lg:z-40">
      <div className="flex flex-col flex-1 min-h-0">
        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Badge variant={user.plan === "pro" ? "default" : "secondary"}>
              {user.plan === "pro" ? "Pro" : "Gratuito"}
            </Badge>
            {user.plan === "free" && (
              <Button
                size="sm"
                onClick={() => onNavigate("plans")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Upgrade para Pro
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          {/* Main Navigation */}
          <div>
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navegação Principal</h3>
            <div className="mt-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start h-11 ${
                      isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : ""
                    }`}
                    onClick={() => onNavigate(item.id as Page)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conta</h3>
            <div className="mt-3 space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start h-11 ${
                      isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : ""
                    }`}
                    onClick={() => onNavigate(item.id as Page)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Admin */}
          {adminItems.length > 0 && (
            <div>
              <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Administração</h3>
              <div className="mt-3 space-y-1">
                {adminItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPage === item.id
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start h-11 ${
                        isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : ""
                      }`}
                      onClick={() => onNavigate(item.id as Page)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Support */}
          <div>
            <div className="mt-3 space-y-1">
              {supportItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start h-11 ${
                      isActive ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" : ""
                    }`}
                    onClick={() => onNavigate(item.id as Page)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}
