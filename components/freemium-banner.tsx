"use client"

import { Star, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { User } from "@/app/page"

interface FreemiumBannerProps {
  user: User
  onUpgrade?: () => void
}

export function FreemiumBanner({ user, onUpgrade }: FreemiumBannerProps) {
  if (user.plan === "pro") return null

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Star className="h-5 w-5 text-orange-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">
              Plano Gratuito - {user.reimbursementsUsed}/{user.reimbursementsLimit} reembolsos este mês
            </h3>
            <p className="text-sm text-gray-600">Upgrade para Pro: reembolsos ilimitados por R$ 29/mês</p>
          </div>

          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 flex-shrink-0" onClick={onUpgrade}>
            Fazer Upgrade
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
