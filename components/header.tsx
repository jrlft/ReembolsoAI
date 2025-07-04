"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { NotificationDropdown } from "@/components/ui/notification-dropdown"

interface HeaderProps {
  onMenuClick: () => void
  onTitleClick: () => void
  notificationCount: number
}

export function Header({ onMenuClick, onTitleClick, notificationCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo/Title - Clickable */}
        <button onClick={onTitleClick} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center lg:hidden">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ReembolsoAI</span>
        </button>

        {/* Notifications */}
        <NotificationDropdown count={notificationCount} />
      </div>
    </header>
  )
}
