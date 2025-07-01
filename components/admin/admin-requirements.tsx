"use client"

import { useState } from "react"
import { ArrowLeft, Save, Plus, X, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { User, Page } from "@/app/page"

interface AdminRequirementsProps {
  user: User
  onNavigate: (page: Page) => void
}

interface DocumentRequirement {
  id: string
  name: string
  required: boolean
  adminRequired: boolean
  userCanDisable: boolean
  validityPeriod?: number
  validityUnit?: "days" | "months"
  description?: string
}

interface ReimbursementTypeRequirements {
  typeId: string
  typeName: string
  category: string
  documents: DocumentRequirement[]
}

export function AdminRequirements({ user, onNavigate }: AdminRequirementsProps) {
  const [selectedType, setSelectedType] = useState<string>("")
  const [hasChanges, setHasChanges] = useState(false)

  const [requirements, setRequirements] = useState<ReimbursementTypeRequirements[]>([
    {
      typeId: "1",
      typeName: "Consulta Médica - Consultório",
      category: "Consulta Médica",
      documents: [
        {
          id: "1",
          name: "Nota Fiscal",
          required: true,
          adminRequired: true,
          userCanDisable: false,
          description: "Comprovante fiscal do pagamento",
        },
        {
          id: "2",
          name: "Comprovante de Pagamento",
          required: true,
          adminRequired: true,
          userCanDisable: false,
          description: "Recibo ou comprovante bancário",
        },
        {
          id: "3",
          name: "Carteirinha do Plano",
          required: false,
          adminRequired: false,
          userCanDisable: true,
          description: "Frente e verso da carteirinha",
        },
      ],
    },
    {
      typeId: "3",
      typeName: "Fisioterapia",
      category: "Terapias",
      documents: [
        {
          id: "1",
          name: "Nota Fiscal",
          required: true,
          adminRequired: true,
          userCanDisable: false,
          description: "Comprovante fiscal do pagamento",
        },
        {
          id: "4",
          name: "Encaminhamento Médico",
          required: true,
          adminRequired: true,
          userCanDisable: false,
          validityPeriod: 4,
          validityUnit: "months",
          description: "Prescrição médica para fisioterapia",
        },
        {
          id: "2",
          name: "Comprovante de Pagamento",
          required: true,
          adminRequired: true,
          userCanDisable: false,
          description: "Recibo ou comprovante bancário",
        },
        {
          id: "5",
          name: "Relatório do Prestador",
          required: true,
          adminRequired: true,
          userCanDisable: true,
          description: "Relatório das sessões realizadas",
        },
      ],
    },
  ])

  const availableDocuments = [
    "Nota Fiscal",
    "Comprovante de Pagamento",
    "Carteirinha do Plano",
    "Encaminhamento Médico",
    "Relatório do Prestador",
    "Pedido Médico",
    "Comprovante de Consulta Online",
    "Relatório Médico",
    "Receituário",
    "Atestado Médico",
  ]

  const selectedRequirement = requirements.find((req) => req.typeId === selectedType)

  const updateDocumentRequirement = (docId: string, field: string, value: any) => {
    setRequirements((prev) =>
      prev.map((req) =>
        req.typeId === selectedType
          ? {
              ...req,
              documents: req.documents.map((doc) => (doc.id === docId ? { ...doc, [field]: value } : doc)),
            }
          : req,
      ),
    )
    setHasChanges(true)
  }

  const addDocument = (documentName: string) => {
    if (!selectedRequirement) return

    const newDoc: DocumentRequirement = {
      id: Date.now().toString(),
      name: documentName,
      required: false,
      adminRequired: false,
      userCanDisable: true,
    }

    setRequirements((prev) =>
      prev.map((req) => (req.typeId === selectedType ? { ...req, documents: [...req.documents, newDoc] } : req)),
    )
    setHasChanges(true)
  }

  const removeDocument = (docId: string) => {
    setRequirements((prev) =>
      prev.map((req) =>
        req.typeId === selectedType ? { ...req, documents: req.documents.filter((doc) => doc.id !== docId) } : req,
      ),
    )
    setHasChanges(true)
  }

  const saveChanges = () => {
    // Aqui salvaria no backend
    setHasChanges(false)
    alert("Configurações salvas com sucesso!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("admin")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Requisitos por Tipo</h1>
            <p className="text-gray-600">Configure documentos obrigatórios para cada tipo de reembolso</p>
          </div>
        </div>
        {hasChanges && (
          <Button onClick={saveChanges}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        )}
      </div>

      {hasChanges && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Você tem alterações não salvas. Lembre-se de salvar antes de sair.</AlertDescription>
        </Alert>
      )}

      {/* Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Tipo de Reembolso</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha um tipo de reembolso para configurar" />
            </SelectTrigger>
            <SelectContent>
              {requirements.map((req) => (
                <SelectItem key={req.typeId} value={req.typeId}>
                  {req.typeName} ({req.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Requirements Configuration */}
      {selectedRequirement && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedRequirement.typeName}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Configure os documentos obrigatórios</p>
              </div>
              <Badge variant="outline">{selectedRequirement.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Documents List */}
            <div className="space-y-4">
              {selectedRequirement.documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{doc.name}</h4>
                        {doc.adminRequired && <Badge variant="destructive">Obrigatório</Badge>}
                        {doc.userCanDisable && <Badge variant="secondary">Usuário pode desmarcar</Badge>}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeDocument(doc.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {doc.description && <p className="text-sm text-gray-600">{doc.description}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`admin-${doc.id}`}
                          checked={doc.adminRequired}
                          onCheckedChange={(checked) => updateDocumentRequirement(doc.id, "adminRequired", checked)}
                        />
                        <Label htmlFor={`admin-${doc.id}`} className="text-sm">
                          Obrigatório (Admin)
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`user-${doc.id}`}
                          checked={doc.userCanDisable}
                          onCheckedChange={(checked) => updateDocumentRequirement(doc.id, "userCanDisable", checked)}
                        />
                        <Label htmlFor={`user-${doc.id}`} className="text-sm">
                          Usuário pode desmarcar
                        </Label>
                      </div>

                      {doc.validityPeriod && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={doc.validityPeriod}
                            onChange={(e) =>
                              updateDocumentRequirement(doc.id, "validityPeriod", Number.parseInt(e.target.value))
                            }
                            className="w-20"
                          />
                          <Select
                            value={doc.validityUnit}
                            onValueChange={(value) => updateDocumentRequirement(doc.id, "validityUnit", value)}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="days">dias</SelectItem>
                              <SelectItem value="months">meses</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Add Document */}
            <Card className="border-dashed">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Adicionar Documento</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableDocuments
                    .filter((doc) => !selectedRequirement.documents.some((d) => d.name === doc))
                    .map((doc) => (
                      <Button key={doc} variant="outline" size="sm" onClick={() => addDocument(doc)}>
                        <Plus className="h-3 w-3 mr-1" />
                        {doc}
                      </Button>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Legenda:</h4>
              <ul className="text-sm space-y-1">
                <li>
                  <Badge variant="destructive" className="mr-2">
                    Obrigatório
                  </Badge>
                  Documento sempre necessário, usuário não pode desmarcar
                </li>
                <li>
                  <Badge variant="secondary" className="mr-2">
                    Usuário pode desmarcar
                  </Badge>
                  Usuário pode escolher se quer enviar este documento
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
