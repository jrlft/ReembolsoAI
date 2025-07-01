"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { reimbursementAPI } from "@/lib/api/reimbursements"
import type { Database } from "@/lib/supabase/types"

type Reimbursement = Database["public"]["Tables"]["reimbursements"]["Row"]
type ReimbursementFormData = Omit<Database["public"]["Tables"]["reimbursements"]["Insert"], "user_id" | "id">

interface ReimbursementContextType {
  reimbursements: Reimbursement[]
  isLoading: boolean
  createReimbursement: (data: ReimbursementFormData) => Promise<void>
  updateReimbursementStatus: (id: string, status: string) => Promise<void>
  uploadDocument: (reimbursementId: string, file: File, type: string) => Promise<void>
  sendByEmail: (reimbursementId: string) => Promise<void>
  downloadZip: (reimbursementId: string) => Promise<void>
  refreshReimbursements: () => Promise<void>
}

const ReimbursementContext = createContext<ReimbursementContextType | undefined>(undefined)

export function ReimbursementProvider({ children }: { children: ReactNode }) {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const createReimbursement = async (data: ReimbursementFormData) => {
    try {
      setIsLoading(true)
      const newReimbursement = await reimbursementAPI.create(data)
      setReimbursements((prev) => [newReimbursement, ...prev])

      // Tracking de conversão
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "InitiateCheckout")
      }
    } catch (error) {
      throw new Error("Erro ao criar reembolso")
    } finally {
      setIsLoading(false)
    }
  }

  const updateReimbursementStatus = async (id: string, status: string) => {
    try {
      await reimbursementAPI.updateStatus(id, status)
      setReimbursements((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (error) {
      throw new Error("Erro ao atualizar status")
    }
  }

  const uploadDocument = async (reimbursementId: string, file: File, type: string) => {
    try {
      await reimbursementAPI.uploadDocument(reimbursementId, file, type)
    } catch (error) {
      throw new Error("Erro ao fazer upload do documento")
    }
  }

  const sendByEmail = async (reimbursementId: string) => {
    try {
      await reimbursementAPI.sendByEmail(reimbursementId)
    } catch (error) {
      throw new Error("Erro ao enviar por email")
    }
  }

  const downloadZip = async (reimbursementId: string) => {
    try {
      const zipBlob = await reimbursementAPI.downloadZip(reimbursementId)

      // Download automático
      const url = window.URL.createObjectURL(zipBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `reembolso_${reimbursementId}.zip`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      throw new Error("Erro ao baixar arquivos")
    }
  }

  const refreshReimbursements = async () => {
    try {
      setIsLoading(true)
      const data = await reimbursementAPI.getAll()
      setReimbursements(data)
    } catch (error) {
      console.error("Erro ao carregar reembolsos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ReimbursementContext.Provider
      value={{
        reimbursements,
        isLoading,
        createReimbursement,
        updateReimbursementStatus,
        uploadDocument,
        sendByEmail,
        downloadZip,
        refreshReimbursements,
      }}
    >
      {children}
    </ReimbursementContext.Provider>
  )
}

export function useReimbursement() {
  const context = useContext(ReimbursementContext)
  if (context === undefined) {
    throw new Error("useReimbursement must be used within a ReimbursementProvider")
  }
  return context
}
