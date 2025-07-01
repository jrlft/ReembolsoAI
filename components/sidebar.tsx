"use client"

import { X, Home, Clipboard, Plus, Shield, User, Key, CreditCard, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Page } from "@/app/page"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  user: any
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Sidebar({ isOpen, onClose, user, currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: Home },
    { id: "reimbursements" as Page, label: "Reembolsos", icon: Clipboard },
    { id: "new-reimbursement" as Page, label: "Novo Reembolso", icon: Plus },
    { id: "plans" as Page, label: "Planos", icon: Shield },
  ]

  const accountItems = [
    { id: "profile" as Page, label: "Meus Dados", icon: User },
    { id: "password" as Page, label: "Alterar Senha", icon: Key },
    { id: "billing" as Page, label: "Plano & Cobrança", icon: CreditCard },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <Badge variant={user.plan === "pro" ? "default" : "secondary"}>
                {user.plan === "pro" ? "Pro" : "Gratuito"}
              </Badge>
            </div>

            {user.plan === "free" && (
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => onNavigate("upgrade")}
              >
                Upgrade para Pro
              </Button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navegação Principal</h3>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onNavigate(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>

            <Separator />

            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Conta</h3>
              <nav className="space-y-1">
                {accountItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onNavigate(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start mb-2">
              <HelpCircle className="h-4 w-4 mr-3" />
              Ajuda
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
