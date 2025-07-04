"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { trackEvent, trackConversion } from "@/components/analytics/tracking"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()

  useEffect(() => {
    // Track login page view
    trackEvent("page_view", {
      page_title: "Login",
      page_location: window.location.href,
    })
  }, [])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Track login attempt
    trackEvent("login_attempt", {
      method: "email",
    })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Track successful login
      trackConversion("login")

      router.push("/app")
    }, 1500)
  }

  return (
    <>
      <Head>
        <title>Login - ReembolsoAI | Acesse sua conta</title>
        <meta
          name="description"
          content="Faça login na sua conta ReembolsoAI para gerenciar seus reembolsos médicos com inteligência artificial."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://reembolsoai.com/login" />

        {/* Open Graph */}
        <meta property="og:title" content="Login - ReembolsoAI" />
        <meta property="og:description" content="Acesse sua conta ReembolsoAI" />
        <meta property="og:url" content="https://reembolsoai.com/login" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <Link
              href="/landing"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              aria-label="Voltar para página inicial"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para início
            </Link>

            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg" aria-hidden="true">
                  R
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ReembolsoAI</h1>
            </div>

            <p className="text-gray-600">Entre na sua conta</p>
          </header>

          {/* Login Form */}
          <main>
            <Card>
              <CardHeader>
                <CardTitle>Fazer Login</CardTitle>
                <CardDescription>Entre com suas credenciais para acessar o sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      autoComplete="email"
                      autoFocus
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-500" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                        autoComplete="current-password"
                        aria-describedby={errors.password ? "password-error" : undefined}
                        aria-invalid={!!errors.password}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p id="password-error" className="text-sm text-red-500" role="alert">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                    disabled={isLoading}
                    aria-describedby="login-status"
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </>
  )
}
