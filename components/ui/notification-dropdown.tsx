"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, XCircle } from "lucide-react"

interface NotificationDropdownProps {
  count: number
}

export function NotificationDropdown({ count }: NotificationDropdownProps) {
  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Reembolso Aprovado",
      message: "Seu reembolso de R$ 150,00 foi aprovado",
      time: "2 min atrás",
      read: false,
    },
    {
      id: 2,
      type: "pending",
      title: "Documento Pendente",
      message: "Adicione o comprovante para finalizar",
      time: "1 hora atrás",
      read: false,
    },
    {
      id: 3,
      type: "error",
      title: "Reembolso Rejeitado",
      message: "Documento ilegível, envie novamente",
      time: "2 horas atrás",
      read: false,
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {count}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notificações
          <Badge variant="secondary">{count} novas</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
            {getIcon(notification.type)}
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-xs text-gray-500">{notification.message}</p>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>
            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700">
          Ver todas as notificações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
