export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: "free" | "pro"
  reimbursementsUsed: number
  reimbursementsLimit: number
  hasHealthPlan: boolean
}

export interface HealthPlan {
  id: string
  name: string
  provider: string
  cardNumber: string
  userId: string
}

export interface Dependent {
  id: string
  name: string
  relationship: string
  birthDate: string
  userId: string
}

export interface ReimbursementType {
  id: string
  name: string
  category: string
  subcategory?: string
  description: string
  active: boolean
  requiredDocuments: string[]
}

export interface Reimbursement {
  id: string
  type: string
  patient: string
  date: string
  value: number
  status: "iniciar" | "documentos" | "pronto" | "enviado" | "complementar" | "aprovado" | "reprovado" | "pago"
  plan: string
  documents: Document[]
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  size: number
  uploadedAt: string
}

export interface ReimbursementFormData {
  type: string
  patient: string
  date: string
  value: number
  plan: string
  description?: string
}

export interface APIResponse<T> {
  data: T
  message: string
  success: boolean
}
