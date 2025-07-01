export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: "free" | "pro"
  reimbursementsUsed: number
  reimbursementsLimit: number
  createdAt: string
  updatedAt: string
}

export interface Reimbursement {
  id: string
  type: string
  patient: string
  value: number
  date: string
  status: string
  plan: string
  documents?: number
  totalDocuments?: number
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface HealthPlan {
  id: string
  name: string
  logo?: string
  requirements: string[]
  documentTypes: string[]
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  url: string
  reimbursementId: string
  uploadedAt: string
}

export interface ReimbursementType {
  id: string
  name: string
  category: string
  requiredDocuments: string[]
  maxValue?: number
}
