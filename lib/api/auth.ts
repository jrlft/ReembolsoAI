import type { User } from "@/types"

// TODO: Integração com FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

interface LoginResponse {
  token: string
  user: User
}

interface RegisterResponse {
  token: string
  user: User
}

export const authAPI = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Mock implementation - substituir por chamada real
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@test.com" && password === "123456") {
          resolve({
            token: "mock-jwt-token",
            user: {
              id: "1",
              name: "João Silva",
              email: email,
              plan: "free",
              reimbursementsUsed: 1,
              reimbursementsLimit: 1,
              hasHealthPlan: true,
            },
          })
        } else {
          reject(new Error("Credenciais inválidas"))
        }
      }, 1000)
    })

    /* Implementação real:
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Credenciais inválidas")
    }

    const data: APIResponse<LoginResponse> = await response.json()
    return data.data
    */
  },

  async register(email: string, password: string, name: string): Promise<RegisterResponse> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "mock-jwt-token",
          user: {
            id: "1",
            name: name,
            email: email,
            plan: "free",
            reimbursementsUsed: 0,
            reimbursementsLimit: 1,
            hasHealthPlan: false,
          },
        })
      }, 1000)
    })

    /* Implementação real:
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })

    if (!response.ok) {
      throw new Error("Erro ao criar conta")
    }

    const data: APIResponse<RegisterResponse> = await response.json()
    return data.data
    */
  },

  async validateToken(token: string): Promise<User> {
    /* Implementação real:
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Token inválido")
    }

    const data: APIResponse<User> = await response.json()
    return data.data
    */

    // Mock implementation
    return Promise.resolve({
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      plan: "free",
      reimbursementsUsed: 1,
      reimbursementsLimit: 1,
      hasHealthPlan: true,
    })
  },

  async refreshToken(token: string): Promise<string> {
    /* Implementação real:
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erro ao renovar token")
    }

    const data: APIResponse<{ token: string }> = await response.json()
    return data.data.token
    */

    return Promise.resolve("new-mock-jwt-token")
  },
}
