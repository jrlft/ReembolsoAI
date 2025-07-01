"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Reimbursement } from "@/types"

interface ReimbursementContextType {
  reimbursements: Reimbursement[]
  isLoading: boolean
  error: string | null
  refreshReimbursements: () => Promise<void>
  updateReimbursementStatus: (id: string, status: string) => Promise<void>
  addReimbursement: (reimbursement: Omit<Reimbursement, "id">) => Promise<void>
  deleteReimbursement: (id: string) => Promise<void>
}

const ReimbursementContext = createContext<ReimbursementContextType | undefined>(undefined)

// Mock data para preview
const mockReimbursements: Reimbursement[] = [
  {
    id: "1",
    type: "Consulta Cardiologista",
    patient: "João Silva",
    value: 350,
    date: "2024-01-15",
    status: "documentos",
    plan: "Unimed",
    documents: 2,
    totalDocuments: 3,
  },
  {
    id: "2",
    type: "Exame de Sangue",
    patient: "Maria Silva",
    value: 120,
    date: "2024-01-14",
    status: "pronto",
    plan: "Bradesco",
    documents: 3,
    totalDocuments: 3,
  },
  {
    id: "3",
    type: "Fisioterapia",
    patient: "João Silva",
    value: 80,
    date: "2024-01-13",
    status: "aprovado",
    plan: "Unimed",
    documents: 2,
    totalDocuments: 2,
  },
  {
    id: "4",
    type: "Consulta Dermatologista",
    patient: "Ana Silva",
    value: 200,
    date: "2024-01-12",
    status: "pago",
    plan: "Amil",
    documents: 3,
    totalDocuments: 3,
  },
  {
    id: "5",
    type: "Exame de Vista",
    patient: "Pedro Silva",
    value: 150,
    date: "2024-01-11",
    status: "enviado",
    plan: "Unimed",
    documents: 2,
    totalDocuments: 2,
  },
]

export function ReimbursementProvider({ children }: { children: React.ReactNode }) {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshReimbursements = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Em produção, aqui seria uma chamada real para a API
      setReimbursements(mockReimbursements)
    } catch (err) {
      setError("Erro ao carregar reembolsos")
      console.error("Erro ao carregar reembolsos:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateReimbursementStatus = useCallback(async (id: string, status: string) => {
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 500))

      setReimbursements((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (err) {
      setError("Erro ao atualizar status")
      console.error("Erro ao atualizar status:", err)
      throw err
    }
  }, [])

  const addReimbursement = useCallback(async (reimbursement: Omit<Reimbursement, "id">) => {
    try {
      const newReimbursement: Reimbursement = {
        ...reimbursement,
        id: Date.now().toString(),
      }

      setReimbursements((prev) => [...prev, newReimbursement])
    } catch (err) {
      setError("Erro ao adicionar reembolso")
      console.error("Erro ao adicionar reembolso:", err)
      throw err
    }
  }, [])

  const deleteReimbursement = useCallback(async (id: string) => {
    try {
      setReimbursements((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      setError("Erro ao excluir reembolso")
      console.error("Erro ao excluir reembolso:", err)
      throw err
    }
  }, [])

  useEffect(() => {
    refreshReimbursements()
  }, [refreshReimbursements])

  const value: ReimbursementContextType = {
    reimbursements,
    isLoading,
    error,
    refreshReimbursements,
    updateReimbursementStatus,
    addReimbursement,
    deleteReimbursement,
  }

  return <ReimbursementContext.Provider value={value}>{children}</ReimbursementContext.Provider>
}

export function useReimbursement() {
  const context = useContext(ReimbursementContext)
  if (context === undefined) {
    throw new Error("useReimbursement must be used within a ReimbursementProvider")
  }
  return context
}
