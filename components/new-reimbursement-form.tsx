"use client"

import { useState } from "react"
import { ArrowLeft, Upload, Camera, FileText, UserIcon, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { Page } from "@/app/page"

interface NewReimbursementFormProps {
  user: any
  onNavigate: (page: Page) => void
}

export function NewReimbursementForm({ user, onNavigate }: NewReimbursementFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: "",
    patient: "",
    date: "",
    value: "",
    plan: "",
    description: "",
    documents: [] as string[],
  })

  const steps = [
    { number: 1, title: "Informações Básicas", icon: UserIcon },
    { number: 2, title: "Documentos", icon: FileText },
    { number: 3, title: "Revisão", icon: Calendar },
  ]

  const consultationTypes = [
    "Consulta Médica - Consultório",
    "Consulta Médica - Online",
    "Exames Laboratoriais",
    "Fisioterapia",
    "Psicologia",
    "Odontologia",
    "Outros",
  ]

  const healthPlans = ["Unimed", "Bradesco Saúde", "Amil", "SulAmérica", "Outros"]

  const getRequiredDocuments = (type: string) => {
    switch (type) {
      case "Consulta Médica - Consultório":
      case "Consulta Médica - Online":
        return ["Nota Fiscal", "Comprovante de Pagamento"]
      case "Fisioterapia":
        return [
          "Nota Fiscal",
          "Encaminhamento Médico (válido até 4 meses)",
          "Comprovante de Pagamento",
          "Relatório do Prestador",
        ]
      case "Exames Laboratoriais":
        return ["Nota Fiscal", "Pedido Médico", "Comprovante de Pagamento"]
      default:
        return ["Nota Fiscal", "Comprovante de Pagamento"]
    }
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Simular envio
    alert("Reembolso criado com sucesso!")
    onNavigate("reimbursements")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Novo Reembolso</h1>
          <p className="text-gray-600">Preencha as informações para solicitar seu reembolso</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= stepItem.number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <stepItem.icon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${step >= stepItem.number ? "text-blue-600" : "text-gray-500"}`}>
                    {stepItem.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${step > stepItem.number ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Informações do Reembolso"}
            {step === 2 && "Documentos Necessários"}
            {step === 3 && "Revisão e Confirmação"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo de Consulta/Exame</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="patient">Paciente</Label>
                  <Select
                    value={formData.patient}
                    onValueChange={(value) => setFormData({ ...formData, patient: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva (Titular)</SelectItem>
                      <SelectItem value="maria">Maria Silva (Dependente)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data da Consulta</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="value">Valor Pago (R$)</Label>
                  <Input
                    type="number"
                    placeholder="0,00"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="plan">Plano de Saúde</Label>
                <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {healthPlans.map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Textarea
                  placeholder="Descreva detalhes adicionais sobre o procedimento..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Adicione seus documentos</h3>
                <p className="text-gray-600 mb-6">Você pode fotografar ou fazer upload dos documentos necessários</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Fotografar Documento</h4>
                    <p className="text-sm text-gray-600">Use a câmera do seu dispositivo</p>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Fazer Upload</h4>
                    <p className="text-sm text-gray-600">Selecione arquivos do dispositivo</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Documentos Necessários para {formData.type || "este tipo"}:</h4>
                <div className="space-y-2">
                  {getRequiredDocuments(formData.type).map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-sm">{doc}</span>
                      <Badge variant="secondary" className="ml-auto">
                        Obrigatório
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Revise suas informações</h3>
                <p className="text-gray-600">Confirme se todos os dados estão corretos antes de enviar</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-600">Tipo:</span>
                    <p className="font-medium">{formData.type || "Não informado"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Paciente:</span>
                    <p className="font-medium">{formData.patient || "Não informado"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Data:</span>
                    <p className="font-medium">{formData.date || "Não informado"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Valor:</span>
                    <p className="font-medium text-green-600">R$ {formData.value || "0,00"}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Status dos Documentos</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">3 documentos adicionados</Badge>
                    <span className="text-sm text-green-600">✓ Pronto para envio</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
          Anterior
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => onNavigate("dashboard")}>
            Cancelar
          </Button>
          {step < 3 ? (
            <Button onClick={handleNext}>Próximo</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Enviar Reembolso
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
