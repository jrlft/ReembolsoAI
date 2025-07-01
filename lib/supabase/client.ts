import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Better environment detection
const isV0Preview =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("v0.dev") ||
    window.location.hostname.includes("localhost") ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL)

// Use proper URL format for mock
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY2siLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA2ODQwMCwiZXhwIjoxOTYxNjQ0NDAwfQ.mock-key"

// Only create real Supabase client if we have valid environment variables
let supabase: any = null

try {
  if (!isV0Preview && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
} catch (error) {
  console.warn("Supabase client creation failed, using mock client")
}

// Mock data for the preview
const mockUser = {
  id: "mock-user-id",
  name: "João Silva",
  email: "joao@email.com",
  avatar_url: null,
  plan: "free" as const,
  reimbursements_used: 1,
  reimbursements_limit: 1,
  has_health_plan: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const mockReimbursements = [
  {
    id: "1",
    user_id: "mock-user-id",
    type: "Consulta Médica - Consultório",
    patient: "João Silva",
    value: 350,
    date: "2024-01-15",
    status: "documentos" as const,
    plan: "Unimed",
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "mock-user-id",
    type: "Fisioterapia",
    patient: "Maria Silva",
    value: 120,
    date: "2024-01-14",
    status: "aprovado" as const,
    plan: "Bradesco",
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "mock-user-id",
    type: "Exames Laboratoriais",
    patient: "João Silva",
    value: 80,
    date: "2024-01-13",
    status: "pago" as const,
    plan: "Unimed",
    description: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Mock Supabase client for preview/development
const mockSupabase = {
  auth: {
    getSession: () =>
      Promise.resolve({
        data: {
          session: {
            user: { id: mockUser.id, email: mockUser.email },
          },
        },
      }),
    onAuthStateChange: (callback: any) => {
      // Simular login automático no preview
      setTimeout(() => {
        callback("SIGNED_IN", { user: { id: mockUser.id, email: mockUser.email } })
      }, 100)
      return { data: { subscription: { unsubscribe: () => {} } } }
    },
    signInWithPassword: ({ email, password }: any) => {
      if (email && password) {
        return Promise.resolve({ data: { user: { id: mockUser.id, email } }, error: null })
      }
      return Promise.resolve({ data: { user: null }, error: { message: "Credenciais inválidas" } })
    },
    signUp: ({ email, password }: any) => {
      return Promise.resolve({
        data: { user: { id: "new-user-id", email } },
        error: null,
      })
    },
    signOut: () => Promise.resolve({ error: null }),
    getUser: () =>
      Promise.resolve({
        data: { user: { id: mockUser.id, email: mockUser.email } },
      }),
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => {
          if (table === "users") {
            return Promise.resolve({ data: mockUser, error: null })
          }
          return Promise.resolve({ data: null, error: null })
        },
        order: (column: string, options?: any) => {
          if (table === "reimbursements") {
            return Promise.resolve({ data: mockReimbursements, error: null })
          }
          return Promise.resolve({ data: [], error: null })
        },
      }),
      order: (column: string, options?: any) => {
        if (table === "reimbursements") {
          return Promise.resolve({ data: mockReimbursements, error: null })
        }
        return Promise.resolve({ data: [], error: null })
      },
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => {
          if (table === "users") {
            return Promise.resolve({ data: { ...mockUser, ...data }, error: null })
          }
          if (table === "reimbursements") {
            const newReimbursement = {
              id: Date.now().toString(),
              user_id: mockUser.id,
              ...data,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
            return Promise.resolve({ data: newReimbursement, error: null })
          }
          return Promise.resolve({ data: { id: Date.now().toString(), ...data }, error: null })
        },
      }),
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ error: null }),
    }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) =>
        Promise.resolve({
          data: { path },
          error: null,
        }),
      download: (path: string) =>
        Promise.resolve({
          data: new Blob(["mock content"]),
          error: null,
        }),
      createSignedUrl: (path: string, expiresIn: number) =>
        Promise.resolve({
          data: { signedUrl: `https://mock-url.com/${path}` },
          error: null,
        }),
    }),
  },
  functions: {
    invoke: (functionName: string, options: any) =>
      Promise.resolve({
        data: { success: true },
        error: null,
      }),
  },
}

// Export the appropriate client
export const supabaseClient = isV0Preview || !supabase ? mockSupabase : supabase

// Função para upload de arquivos com compressão
export async function uploadDocument(
  userId: string,
  reimbursementId: string,
  file: File,
  documentType: string,
): Promise<string> {
  // Se estiver no preview, simular upload
  if (isV0Preview || !supabase) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return `mock-path/${userId}/${reimbursementId}/${documentType}_${Date.now()}.jpg`
  }

  // Comprimir arquivo se necessário
  const compressedFile = await compressFile(file, 900)

  // Gerar nome único
  const fileName = `${documentType}_${reimbursementId}_${Date.now()}.${file.name.split(".").pop()}`
  const filePath = `${userId}/${reimbursementId}/${fileName}`

  const { data, error } = await supabase.storage.from("reimbursement-documents").upload(filePath, compressedFile)

  if (error) {
    throw new Error(`Erro ao fazer upload: ${error.message}`)
  }

  return data.path
}

// Função para baixar arquivo
export async function downloadDocument(path: string): Promise<Blob> {
  if (isV0Preview || !supabase) {
    return new Blob(["mock file content"], { type: "application/pdf" })
  }

  const { data, error } = await supabase.storage.from("reimbursement-documents").download(path)

  if (error) {
    throw new Error(`Erro ao baixar arquivo: ${error.message}`)
  }

  return data
}

// Função para obter URL pública temporária
export async function getDocumentUrl(path: string): Promise<string> {
  if (isV0Preview || !supabase) {
    return `https://mock-url.com/${path}`
  }

  const { data, error } = await supabase.storage.from("reimbursement-documents").createSignedUrl(path, 3600)

  if (error) {
    throw new Error(`Erro ao gerar URL: ${error.message}`)
  }

  return data.signedUrl
}

// Função auxiliar para compressão
async function compressFile(file: File, maxSizeKB: number): Promise<File> {
  if (file.size <= maxSizeKB * 1024) {
    return file
  }

  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      // Calcular dimensões mantendo proporção
      const maxWidth = 1920
      const maxHeight = 1080
      let { width, height } = img

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          }
        },
        file.type,
        0.8,
      )
    }

    img.src = URL.createObjectURL(file)
  })
}
