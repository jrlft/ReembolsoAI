"use client"

import { Bell, Check, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NotificationDropdownProps {
  notificationCount: number
}

export function NotificationDropdown({ notificationCount }: NotificationDropdownProps) {
  const notifications = [
    {
      id: 1,
      type: "approval",
      title: "Reembolso aprovado",
      message: "Seu reembolso de R$ 150,00 foi aprovado",
      time: "2 min atrás",
      read: false,
      icon: Check,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "pending",
      title: "Aguardando documentos",
      message: "Reembolso #1234 precisa de documentos adicionais",
      time: "1 hora atrás",
      read: false,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      id: 3,
      type: "rejected",
      title: "Reembolso rejeitado",
      message: "Reembolso #1235 foi rejeitado. Verifique os detalhes",
      time: "3 horas atrás",
      read: false,
      icon: AlertCircle,
      color: "text-red-600",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative min-h-[44px] min-w-[44px]">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {notificationCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
              Marcar todas como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length > 0 ? (
          <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3 cursor-pointer">
                <div className={`mt-1 ${notification.color}`}>
                  <notification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                  </div>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">Nenhuma notificação</div>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            Ver todas as notificações
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
