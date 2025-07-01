"use client"

import { ArrowLeft, CreditCard, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User, Page } from "@/app/page"

interface BillingPageProps {
  user: User
  onNavigate: (page: Page) => void
}

export function BillingPage({ user, onNavigate }: BillingPageProps) {
  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: 29.0, status: "paid" },
    { id: "INV-002", date: "2023-12-01", amount: 29.0, status: "paid" },
    { id: "INV-003", date: "2023-11-01", amount: 29.0, status: "paid" },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Plano & Cobrança</h1>
          <p className="text-gray-600">Gerencie seu plano e histórico de pagamentos</p>
        </div>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plano Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Plano {user.plan === "pro" ? "Pro" : "Gratuito"}</h3>
              <p className="text-gray-600">{user.plan === "pro" ? "R$ 29,00/mês" : "R$ 0,00/mês"}</p>
              {user.plan === "pro" && (
                <p className="text-sm text-gray-500 mt-1">Próxima cobrança: 15 de fevereiro de 2024</p>
              )}
            </div>
            <div className="text-right">
              <Badge variant={user.plan === "pro" ? "default" : "secondary"}>
                {user.plan === "pro" ? "Ativo" : "Gratuito"}
              </Badge>
              {user.plan === "free" && (
                <Button className="mt-2 block" onClick={() => onNavigate("plans")}>
                  Fazer Upgrade
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      {user.plan === "pro" && (
        <Card>
          <CardHeader>
            <CardTitle>Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">•••• •••• •••• 1234</p>
                <p className="text-sm text-gray-600">Expira em 12/2025</p>
              </div>
              <Button variant="outline" size="sm">
                Alterar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Cobrança</CardTitle>
        </CardHeader>
        <CardContent>
          {user.plan === "free" ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma cobrança ainda</p>
              <p className="text-sm text-gray-500">Faça upgrade para o plano Pro para ver seu histórico</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {invoice.amount.toFixed(2)}</p>
                    <Badge variant="secondary" className="text-xs">
                      Pago
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
