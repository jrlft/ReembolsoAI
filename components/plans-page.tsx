"use client"

import { ArrowLeft, Check, Star, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User, Page } from "@/app/page"

interface PlansPageProps {
  user: User
  onNavigate: (page: Page) => void
}

export function PlansPage({ user, onNavigate }: PlansPageProps) {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Ideal para uso pessoal básico",
      features: ["1 reembolso por mês", "Suporte por email", "Documentos básicos", "Histórico de 3 meses"],
      limitations: ["Limite de 1 reembolso/mês", "Sem suporte prioritário", "Funcionalidades limitadas"],
      current: user.plan === "free",
      popular: false,
      buttonText: user.plan === "free" ? "Plano Atual" : "Downgrade",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: "R$ 29",
      period: "/mês",
      description: "Para quem precisa de mais flexibilidade",
      features: [
        "Reembolsos ilimitados",
        "Suporte prioritário",
        "Todos os tipos de documento",
        "Histórico completo",
        "Relatórios avançados",
        "Múltiplos dependentes",
        "Notificações em tempo real",
        "Backup automático",
      ],
      limitations: [],
      current: user.plan === "pro",
      popular: true,
      buttonText: user.plan === "pro" ? "Plano Atual" : "Fazer Upgrade",
      buttonVariant: user.plan === "pro" ? ("outline" as const) : ("default" as const),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Planos e Preços</h1>
          <p className="text-gray-600">Escolha o plano ideal para suas necessidades</p>
        </div>
      </div>

      {/* Current Usage */}
      {user.plan === "free" && (
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Uso Atual do Plano Gratuito</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(user.reimbursementsUsed / user.reimbursementsLimit) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {user.reimbursementsUsed}/{user.reimbursementsLimit} reembolsos
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Mais Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <p className="text-gray-600 text-sm">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">✓ Incluído no plano:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-gray-600">Limitações:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-4 h-4 text-center">•</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className="w-full"
                variant={plan.buttonVariant}
                disabled={plan.current}
                onClick={() => {
                  if (!plan.current && plan.name === "Pro") {
                    alert("Redirecionando para pagamento...")
                  }
                }}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Posso cancelar a qualquer momento?</h4>
            <p className="text-sm text-gray-600">
              Sim, você pode cancelar seu plano Pro a qualquer momento. O acesso continuará até o final do período pago.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Como funciona o upgrade?</h4>
            <p className="text-sm text-gray-600">
              O upgrade é imediato. Você terá acesso a todas as funcionalidades Pro assim que o pagamento for
              processado.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Há desconto para pagamento anual?</h4>
            <p className="text-sm text-gray-600">
              Sim! Pagando anualmente você economiza 20% (R$ 278,40 ao invés de R$ 348,00).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
