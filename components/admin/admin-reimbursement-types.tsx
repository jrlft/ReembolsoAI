"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { User, Page } from "@/app/page"

interface AdminReimbursementTypesProps {
  user: User
  onNavigate: (page: Page) => void
}

interface ReimbursementType {
  id: string
  name: string
  category: string
  subcategory?: string
  description: string
  active: boolean
  requiredDocuments: string[]
}

export function AdminReimbursementTypes({ user, onNavigate }: AdminReimbursementTypesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<ReimbursementType | null>(null)

  const [reimbursementTypes, setReimbursementTypes] = useState<ReimbursementType[]>([
    {
      id: "1",
      name: "Consulta Médica - Consultório",
      category: "Consulta Médica",
      subcategory: "Presencial",
      description: "Consulta médica realizada em consultório físico",
      active: true,
      requiredDocuments: ["Nota Fiscal", "Comprovante de Pagamento"],
    },
    {
      id: "2",
      name: "Consulta Médica - Online",
      category: "Consulta Médica",
      subcategory: "Telemedicina",
      description: "Consulta médica realizada por telemedicina",
      active: true,
      requiredDocuments: ["Nota Fiscal", "Comprovante de Pagamento", "Comprovante de Consulta Online"],
    },
    {
      id: "3",
      name: "Fisioterapia",
      category: "Terapias",
      description: "Sessões de fisioterapia",
      active: true,
      requiredDocuments: ["Nota Fiscal", "Encaminhamento Médico", "Comprovante de Pagamento", "Relatório do Prestador"],
    },
    {
      id: "4",
      name: "Exames Laboratoriais",
      category: "Exames",
      description: "Exames de sangue, urina e outros laboratoriais",
      active: true,
      requiredDocuments: ["Nota Fiscal", "Pedido Médico", "Comprovante de Pagamento"],
    },
  ])

  const categories = ["Consulta Médica", "Exames", "Terapias", "Odontologia", "Psicologia"]

  const filteredTypes = reimbursementTypes.filter((type) => {
    const matchesSearch = type.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || type.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSave = (formData: any) => {
    if (editingType) {
      setReimbursementTypes((prev) =>
        prev.map((type) => (type.id === editingType.id ? { ...type, ...formData } : type)),
      )
    } else {
      const newType: ReimbursementType = {
        id: Date.now().toString(),
        ...formData,
        active: true,
        requiredDocuments: [],
      }
      setReimbursementTypes((prev) => [...prev, newType])
    }
    setIsDialogOpen(false)
    setEditingType(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este tipo de reembolso?")) {
      setReimbursementTypes((prev) => prev.filter((type) => type.id !== id))
    }
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
            <h1 className="text-2xl font-bold">Tipos de Reembolso</h1>
            <p className="text-gray-600">Gerencie os tipos de consulta e exames disponíveis</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingType(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Tipo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingType ? "Editar" : "Novo"} Tipo de Reembolso</DialogTitle>
            </DialogHeader>
            <ReimbursementTypeForm
              type={editingType}
              categories={categories}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false)
                setEditingType(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar tipos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-sm text-gray-600 flex items-center">Total: {filteredTypes.length} tipos</div>
          </div>
        </CardContent>
      </Card>

      {/* Types List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTypes.map((type) => (
          <Card key={type.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{type.category}</Badge>
                    {type.subcategory && <Badge variant="secondary">{type.subcategory}</Badge>}
                  </div>
                </div>
                <Badge variant={type.active ? "default" : "secondary"}>{type.active ? "Ativo" : "Inativo"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{type.description}</p>

              <div>
                <h4 className="text-sm font-medium mb-2">Documentos Obrigatórios:</h4>
                <div className="space-y-1">
                  {type.requiredDocuments.map((doc, index) => (
                    <div key={index} className="text-xs bg-gray-50 px-2 py-1 rounded">
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingType(type)
                    setIsDialogOpen(true)
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(type.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ReimbursementTypeForm({
  type,
  categories,
  onSave,
  onCancel,
}: {
  type: ReimbursementType | null
  categories: string[]
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: type?.name || "",
    category: type?.category || "",
    subcategory: type?.subcategory || "",
    description: type?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do Tipo</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Consulta Médica - Consultório"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subcategory">Subcategoria (Opcional)</Label>
          <Input
            id="subcategory"
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            placeholder="Ex: Presencial, Online"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva este tipo de reembolso..."
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  )
}
