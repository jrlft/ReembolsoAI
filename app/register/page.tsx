"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { trackEvent, trackConversion } from "@/components/analytics/tracking"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    // Track register page view
    trackEvent("page_view", {
      page_title: "Register",
      page_location: window.location.href,
    })
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Nome da empresa é obrigatório"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos de uso"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Track signup attempt
    trackEvent("signup_attempt", {
      method: "email",
    })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Track successful signup
      trackConversion("signup")

      router.push("/app")
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <>
      <Head>
        <title>Cadastro - ReembolsoAI | Crie sua conta gratuita</title>
        <meta
          name="description"
          content="Crie sua conta gratuita no ReembolsoAI e comece a gerenciar reembolsos médicos com inteligência artificial. Teste grátis por 14 dias."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://reembolsoai.com/register" />

        {/* Open Graph */}
        <meta property="og:title" content="Cadastro - ReembolsoAI | Crie sua conta gratuita" />
        <meta property="og:description" content="Crie sua conta gratuita no ReembolsoAI. Teste grátis por 14 dias." />
        <meta property="og:url" content="https://reembolsoai.com/register" />
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

            <p className="text-gray-600">Crie sua conta gratuita</p>
          </header>

          {/* Register Form */}
          <main>
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>Preencha os dados abaixo para começar seu teste gratuito</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                      autoComplete="name"
                      autoFocus
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-500" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      autoComplete="email"
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
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Nome da sua empresa"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className={errors.company ? "border-red-500" : ""}
                      autoComplete="organization"
                      aria-describedby={errors.company ? "company-error" : undefined}
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && (
                      <p id="company-error" className="text-sm text-red-500" role="alert">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                        autoComplete="new-password"
                        aria-describedby={errors.password ? "password-error" : "password-help"}
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
                    {!errors.password && (
                      <p id="password-help" className="text-xs text-gray-500">
                        Mínimo 6 caracteres
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                        autoComplete="new-password"
                        aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                        aria-invalid={!!errors.confirmPassword}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={
                          showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-password-error" className="text-sm text-red-500" role="alert">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                      aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
                      aria-invalid={!!errors.acceptTerms}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      Aceito os{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                        termos de uso
                      </Link>{" "}
                      e{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                        política de privacidade
                      </Link>
                    </Label>
                  </div>
                  {errors.acceptTerms && (
                    <p id="terms-error" className="text-sm text-red-500" role="alert">
                      {errors.acceptTerms}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta gratuita"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Fazer login
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
