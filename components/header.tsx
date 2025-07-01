"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "@/components/ui/notification-dropdown"

interface HeaderProps {
  onMenuClick: () => void
  onTitleClick: () => void
  notificationCount: number
}

export function Header({ onMenuClick, onTitleClick, notificationCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden min-h-[44px] min-w-[44px]">
            <Menu className="h-6 w-6" />
          </Button>

          <button
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity min-h-[44px]"
            onClick={onTitleClick}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">ReembolsoAI</h1>
          </button>
        </div>

        <NotificationDropdown notificationCount={notificationCount} />
      </div>
    </header>
  )
}
