export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          avatar_url: string | null
          plan: "free" | "pro"
          reimbursements_used: number
          reimbursements_limit: number
          has_health_plan: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          avatar_url?: string | null
          plan?: "free" | "pro"
          reimbursements_used?: number
          reimbursements_limit?: number
          has_health_plan?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar_url?: string | null
          plan?: "free" | "pro"
          reimbursements_used?: number
          reimbursements_limit?: number
          has_health_plan?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      health_plans: {
        Row: {
          id: string
          user_id: string
          provider: string
          plan_name: string
          card_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          plan_name: string
          card_number: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          plan_name?: string
          card_number?: string
          created_at?: string
          updated_at?: string
        }
      }
      dependents: {
        Row: {
          id: string
          user_id: string
          name: string
          relationship: string
          birth_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          relationship: string
          birth_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          relationship?: string
          birth_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      reimbursement_types: {
        Row: {
          id: string
          name: string
          category: string
          subcategory: string | null
          description: string | null
          active: boolean
          required_documents: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          subcategory?: string | null
          description?: string | null
          active?: boolean
          required_documents?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          subcategory?: string | null
          description?: string | null
          active?: boolean
          required_documents?: Json
          created_at?: string
          updated_at?: string
        }
      }
      reimbursements: {
        Row: {
          id: string
          user_id: string
          type: string
          patient: string
          date: string
          value: number
          status: "iniciar" | "documentos" | "pronto" | "enviado" | "complementar" | "aprovado" | "reprovado" | "pago"
          plan: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          patient: string
          date: string
          value: number
          status?: "iniciar" | "documentos" | "pronto" | "enviado" | "complementar" | "aprovado" | "reprovado" | "pago"
          plan: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          patient?: string
          date?: string
          value?: number
          status?: "iniciar" | "documentos" | "pronto" | "enviado" | "complementar" | "aprovado" | "reprovado" | "pago"
          plan?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          reimbursement_id: string
          name: string
          type: string
          url: string
          size: number
          uploaded_at: string
        }
        Insert: {
          id?: string
          reimbursement_id: string
          name: string
          type: string
          url: string
          size: number
          uploaded_at?: string
        }
        Update: {
          id?: string
          reimbursement_id?: string
          name?: string
          type?: string
          url?: string
          size?: number
          uploaded_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
