"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type UserProfile = Database["public"]["Tables"]["users"]["Row"]

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão atual
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setIsLoading(false)
      }
    })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabaseClient.from("users").select("*").eq("id", userId).single()

      if (error && error.message !== "No rows returned") {
        throw error
      }

      setUser(data)
    } catch (error) {
      console.error("Erro ao buscar perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Tracking de conversão
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "CompleteRegistration")
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true)

      // Criar usuário no Supabase Auth
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Criar perfil do usuário
        const { error: profileError } = await supabaseClient.from("users").insert({
          id: data.user.id,
          name,
          email,
          plan: "free",
          reimbursements_used: 0,
          reimbursements_limit: 1,
          has_health_plan: false,
        })

        if (profileError) throw profileError

        // Tracking de conversão
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead")
        }
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
