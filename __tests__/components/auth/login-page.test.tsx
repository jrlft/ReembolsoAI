import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LoginPage } from "@/components/auth/login-page"
import { AuthProvider } from "@/contexts/auth-context"
import jest from "jest"

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock do authAPI
jest.mock("@/lib/api/auth", () => ({
  authAPI: {
    login: jest.fn(),
    register: jest.fn(),
  },
}))

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AuthProvider>{component}</AuthProvider>)
}

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render login form by default", () => {
    renderWithProvider(<LoginPage />)

    expect(screen.getByText("Entrar na sua conta")).toBeInTheDocument()
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument()
    expect(screen.getByLabelText("Senha")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument()
  })

  it("should toggle between login and register forms", () => {
    renderWithProvider(<LoginPage />)

    const toggleButton = screen.getByText("Não tem conta? Cadastre-se")
    fireEvent.click(toggleButton)

    expect(screen.getByText("Criar nova conta")).toBeInTheDocument()
    expect(screen.getByLabelText("Nome completo")).toBeInTheDocument()
  })

  it("should show error message on invalid login", async () => {
    const { authAPI } = require("@/lib/api/auth")
    authAPI.login.mockRejectedValue(new Error("Credenciais inválidas"))

    renderWithProvider(<LoginPage />)

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@test.com" },
    })
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "wrongpassword" },
    })

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }))

    await waitFor(() => {
      expect(screen.getByText("Credenciais inválidas")).toBeInTheDocument()
    })
  })

  it("should toggle password visibility", () => {
    renderWithProvider(<LoginPage />)

    const passwordInput = screen.getByLabelText("Senha")
    const toggleButton = screen.getByRole("button", { name: "" }) // Eye icon button

    expect(passwordInput).toHaveAttribute("type", "password")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "text")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "password")
  })
})
