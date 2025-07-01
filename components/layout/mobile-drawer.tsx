"use client"

import { X, CreditCard, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types"
import type { Page } from "@/components/main-app"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  user: User
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function MobileDrawer({ isOpen, onClose, user, currentPage, onNavigate }: MobileDrawerProps) {
  const menuItems = [
    { id: "plans" as Page, label: "Planos", icon: CreditCard },
    { id: "dependents" as Page, label: "Dependentes", icon: Users },
    { id: "reimbursements" as Page, label: "Reembolsos", icon: FileText },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 id="drawer-title" className="text-lg font-semibold">
              Menu
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar menu">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`Avatar de ${user.name}`} />
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
                onClick={() => onNavigate("plans")}
              >
                Upgrade para Pro
              </Button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2" role="navigation">
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
        </div>
      </div>
    </>
  )
}
