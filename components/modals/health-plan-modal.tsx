"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface HealthPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function HealthPlanModal({ isOpen, onClose, onSuccess }: HealthPlanModalProps) {
  const [formData, setFormData] = useState({
    provider: "",
    planName: "",
    cardNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const healthPlanProviders = [
    "Unimed",
    "Bradesco Saúde",
    "Amil",
    "SulAmérica",
    "NotreDame Intermédica",
    "Hapvida",
    "Outros",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Salvar plano de saúde no backend
      // await healthPlanAPI.create(formData)

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSuccess()
    } catch (error) {
      console.error("Erro ao cadastrar plano:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastre um plano primeiro</DialogTitle>
        </DialogHeader>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Para criar um reembolso, você precisa ter pelo menos um plano de saúde cadastrado.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="provider">Operadora</Label>
            <Select value={formData.provider} onValueChange={(value) => setFormData({ ...formData, provider: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a operadora" />
              </SelectTrigger>
              <SelectContent>
                {healthPlanProviders.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="planName">Nome do Plano</Label>
            <Input
              id="planName"
              value={formData.planName}
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              placeholder="Ex: Unimed Nacional"
              required
            />
          </div>

          <div>
            <Label htmlFor="cardNumber">Número da Carteirinha</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              placeholder="Número da carteirinha"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Salvando..." : "Salvar Plano"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
