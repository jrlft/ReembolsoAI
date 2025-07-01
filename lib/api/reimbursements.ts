import { supabaseClient } from "@/lib/supabase/client"
import { uploadDocument } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Reimbursement = Database["public"]["Tables"]["reimbursements"]["Row"]
type ReimbursementInsert = Database["public"]["Tables"]["reimbursements"]["Insert"]

export const reimbursementAPI = {
  async getAll(): Promise<Reimbursement[]> {
    const { data, error } = await supabaseClient
      .from("reimbursements")
      .select(`*`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao carregar reembolsos:", error)
      return []
    }

    return data || []
  },

  async create(formData: Omit<ReimbursementInsert, "user_id">): Promise<Reimbursement> {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const { data, error } = await supabaseClient
      .from("reimbursements")
      .insert({
        ...formData,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Erro ao criar reembolso: ${error.message}`)
    }

    return data
  },

  async updateStatus(id: string, status: string): Promise<void> {
    const { error } = await supabaseClient.from("reimbursements").update({ status }).eq("id", id)

    if (error) {
      throw new Error(`Erro ao atualizar status: ${error.message}`)
    }
  },

  async uploadDocument(reimbursementId: string, file: File, documentType: string): Promise<void> {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    try {
      // Upload do arquivo
      const filePath = await uploadDocument(user.id, reimbursementId, file, documentType)

      // Salvar referência no banco
      const { error } = await supabaseClient.from("documents").insert({
        reimbursement_id: reimbursementId,
        name: file.name,
        type: documentType,
        url: filePath,
        size: file.size,
      })

      if (error) {
        throw new Error(`Erro ao salvar documento: ${error.message}`)
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Erro ao fazer upload")
    }
  },

  async sendByEmail(reimbursementId: string): Promise<void> {
    // Simular envio por email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(`Email enviado para reembolso ${reimbursementId}`)
  },

  async downloadZip(reimbursementId: string): Promise<Blob> {
    // Simular geração de ZIP
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return new Blob(["Mock ZIP content"], { type: "application/zip" })
  },
}
