"use client"

import { X, Home, Clipboard, Plus, Shield, User, Key, CreditCard, HelpCircle, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
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

  const adminItems = [{ id: "admin" as Page, label: "Painel Admin", icon: Settings }]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900">ReembolsoAI</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="min-h-[44px] min-w-[44px]">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* User Section */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
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
                    className="w-full justify-start min-h-[44px]"
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
                    className="w-full justify-start min-h-[44px]"
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
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Administração</h3>
              <nav className="space-y-1">
                {adminItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start min-h-[44px]"
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
            <Button variant="ghost" className="w-full justify-start mb-2 min-h-[44px]">
              <HelpCircle className="h-4 w-4 mr-3" />
              Ajuda
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 min-h-[44px]"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
