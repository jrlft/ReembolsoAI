"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Shield, Smartphone, Zap, Menu, X } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import { trackEvent } from "@/components/analytics/tracking"
import { StructuredData, SoftwareApplicationStructuredData } from "@/components/seo/structured-data"

// Hook para detectar quando elemento entra na viewport
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasIntersected])

  return { ref, isIntersecting, hasIntersected }
}

// Componente para animações de entrada
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}) {
  const { ref, hasIntersected } = useIntersectionObserver()

  const getTransformClass = () => {
    if (hasIntersected) return "opacity-100 translate-x-0 translate-y-0 scale-100"

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-8"
      case "down":
        return "opacity-0 -translate-y-8"
      case "left":
        return "opacity-0 translate-x-8"
      case "right":
        return "opacity-0 -translate-x-8"
      case "fade":
        return "opacity-0 scale-95"
      default:
        return "opacity-0 translate-y-8"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getTransformClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Componente para contador animado
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const { hasIntersected } = useIntersectionObserver()

  useEffect(() => {
    if (!hasIntersected) return

    let startTime: number
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasIntersected, end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Track landing page view
    trackEvent("page_view", {
      page_title: "Landing Page",
      page_location: window.location.href,
    })

    // Parallax scroll effect
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [])

  const handleCTAClick = (source: string) => {
    trackEvent("cta_click", {
      source,
      page: "landing",
    })
  }

  const features = [
    {
      icon: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Mobile-First",
      description: "Interface otimizada para dispositivos móveis com experiência fluida",
    },
    {
      icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "IA Integrada",
      description: "Processamento inteligente de documentos e aprovação automática",
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "100% Seguro",
      description: "Criptografia de ponta a ponta e conformidade com LGPD",
    },
  ]

  const benefits = [
    "Redução de 80% no tempo de processamento",
    "Interface mobile-first otimizada",
    "IA para análise automática de documentos",
    "Dashboard em tempo real",
    "Integração com planos de saúde",
    "Relatórios detalhados e analytics",
  ]

  return (
    <>
      <Head>
        <title>ReembolsoAI - Sistema Inteligente de Reembolsos Médicos com IA</title>
        <meta
          name="description"
          content="Transforme a gestão de reembolsos médicos da sua empresa com IA. Processamento automático, interface mobile-first, aprovações em tempo real. Teste grátis por 14 dias."
        />
        <meta
          name="keywords"
          content="reembolso médico, gestão de reembolsos, inteligência artificial, IA para empresas, sistema de reembolsos, plano de saúde, RH digital"
        />
        <link rel="canonical" href="https://reembolsoai.com/landing" />

        {/* Open Graph */}
        <meta property="og:title" content="ReembolsoAI - Sistema Inteligente de Reembolsos Médicos com IA" />
        <meta
          property="og:description"
          content="Transforme a gestão de reembolsos médicos da sua empresa com IA. Processamento automático, interface mobile-first, aprovações em tempo real."
        />
        <meta property="og:image" content="https://reembolsoai.com/og-landing.png" />
        <meta property="og:url" content="https://reembolsoai.com/landing" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReembolsoAI - Sistema Inteligente de Reembolsos Médicos com IA" />
        <meta
          name="twitter:description"
          content="Transforme a gestão de reembolsos médicos da sua empresa com IA. Teste grátis por 14 dias."
        />
        <meta name="twitter:image" content="https://reembolsoai.com/twitter-landing.png" />
      </Head>

      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* Header - Mobile First */}
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 safe-area-inset-top transition-all duration-300">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-transform hover:scale-105">
                  <span className="text-white font-bold text-sm sm:text-lg">R</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900">ReembolsoAI</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden sm:flex items-center space-x-4" role="navigation" aria-label="Navegação principal">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="min-h-[44px] transition-all hover:scale-105"
                    onClick={() => handleCTAClick("header_login")}
                  >
                    Acessar Sistema
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[44px] transition-all hover:scale-105 hover:shadow-lg"
                    onClick={() => handleCTAClick("header_register")}
                  >
                    Teste Agora!
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden min-h-[44px] min-w-[44px] transition-all hover:scale-105"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Mobile Menu */}
            <nav
              className={`sm:hidden border-t border-gray-100 transition-all duration-300 overflow-hidden ${
                mobileMenuOpen ? "max-h-40 py-4" : "max-h-0 py-0"
              }`}
              role="navigation"
              aria-label="Menu mobile"
            >
              <div className="space-y-3">
                <Link href="/login" className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start min-h-[44px] transition-all hover:scale-105"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleCTAClick("mobile_login")
                    }}
                  >
                    Acessar Sistema
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[44px] transition-all hover:scale-105"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleCTAClick("mobile_register")
                    }}
                  >
                    Teste Agora!
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section - Mobile First com Parallax */}
        <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 safe-area-inset-top relative overflow-hidden">
          {/* Background com Parallax */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <AnimatedSection direction="fade" delay={200}>
                  <Badge
                    variant="secondary"
                    className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm animate-pulse"
                  >
                    🚀 Nova versão com IA disponível
                  </Badge>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={400}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                    Reembolsos
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                      {" "}
                      Inteligentes
                    </span>
                  </h1>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={600}>
                  <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Transforme a gestão de reembolsos médicos da sua empresa com IA. Processamento automático, interface
                    mobile-first e aprovações em tempo real.
                  </p>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={800}>
                  <div className="flex justify-center lg:justify-start mb-8 sm:mb-12">
                    <Link href="/register" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[52px] transition-all hover:scale-105 hover:shadow-xl"
                        onClick={() => handleCTAClick("hero_register")}
                      >
                        Começar Gratuitamente
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="fade" delay={1000}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500">
                    <div className="flex items-center animate-fade-in">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Teste grátis por 14 dias</span>
                    </div>
                    <div className="flex items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Sem cartão de crédito</span>
                    </div>
                    <div className="flex items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Suporte 24/7</span>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Right Column - Dashboard Preview */}
              <div className="order-1 lg:order-2">
                <AnimatedSection direction="right" delay={600}>
                  <div className="relative">
                    {/* Browser Frame */}
                    <div className="bg-gray-100 rounded-t-xl p-3 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="flex-1 bg-white rounded px-3 py-1 ml-4">
                          <span className="text-xs text-gray-500">reembolsoai.com/dashboard</span>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Image */}
                    <div className="relative overflow-hidden rounded-b-xl shadow-2xl">
                      <img
                        src="/dashboard-preview.png"
                        alt="Dashboard do ReembolsoAI mostrando interface de reembolsos com estatísticas e ações rápidas"
                        className="w-full h-auto transition-transform hover:scale-105 duration-700"
                        loading="lazy"
                        width="800"
                        height="600"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none"></div>

                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg animate-pulse">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-700">Sistema Online</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20 blur-xl"></div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview - Mobile First */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Tecnologia que Funciona
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
                Desenvolvido com as mais modernas tecnologias para oferecer a melhor experiência
              </p>
            </AnimatedSection>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 200} direction="up">
                  <Card
                    className={`transition-all duration-500 hover:shadow-lg cursor-pointer touch-manipulation hover:scale-105 ${
                      activeFeature === index ? "ring-2 ring-blue-500 shadow-lg scale-105" : ""
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white transition-transform hover:rotate-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section - Mobile First */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
              <AnimatedSection className="order-2 lg:order-1" direction="left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Por que escolher o ReembolsoAI?
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Nossa plataforma oferece tudo que você precisa para modernizar a gestão de reembolsos da sua empresa.
                </p>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {benefits.map((benefit, index) => (
                    <AnimatedSection key={index} delay={index * 100} direction="left">
                      <div className="flex items-start space-x-3 group">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{benefit}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                <AnimatedSection delay={800} direction="left">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[48px] transition-all hover:scale-105 hover:shadow-xl"
                      onClick={() => handleCTAClick("benefits_register")}
                    >
                      Começar Agora
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </AnimatedSection>
              </AnimatedSection>

              <AnimatedSection className="order-1 lg:order-2" direction="right">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white transition-all hover:scale-105 hover:shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                        <AnimatedCounter end={80} suffix="%" />
                      </div>
                      <div className="text-blue-100 text-sm sm:text-base">Redução no tempo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
                      <div className="text-blue-100 text-sm sm:text-base">Disponibilidade</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                        <AnimatedCounter end={99} suffix=".9%" />
                      </div>
                      <div className="text-blue-100 text-sm sm:text-base">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                        <AnimatedCounter end={500} suffix="+" />
                      </div>
                      <div className="text-blue-100 text-sm sm:text-base">Empresas</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Pricing - Mobile First */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Planos que se adaptam ao seu negócio
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-2">
                Comece gratuitamente e escale conforme sua necessidade
              </p>
            </AnimatedSection>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <AnimatedSection direction="left" delay={200}>
                <Card className="relative transition-all hover:scale-105 hover:shadow-xl h-full">
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Gratuito</h3>
                      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">R$ 0</div>
                      <div className="text-gray-500">Para sempre</div>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">1 reembolso por mês</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Dashboard básico</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Suporte por email</span>
                      </li>
                    </ul>

                    <Link href="/register" className="block mt-auto">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent min-h-[48px] transition-all hover:scale-105"
                        onClick={() => handleCTAClick("pricing_free")}
                      >
                        Começar Gratuitamente
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={400}>
                <Card className="relative border-2 border-blue-500 transition-all hover:scale-105 hover:shadow-2xl h-full">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs sm:text-sm animate-pulse">
                      Mais Popular
                    </Badge>
                  </div>
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">R$ 29</div>
                      <div className="text-gray-500">por mês</div>
                    </div>

                    <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Reembolsos ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">IA para análise automática</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Relatórios avançados</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Suporte prioritário</span>
                      </li>
                    </ul>

                    <Link href="/register" className="block mt-auto">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[48px] transition-all hover:scale-105 hover:shadow-xl"
                        onClick={() => handleCTAClick("pricing_pro")}
                      >
                        Começar Teste Gratuito
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Final - Mobile First */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-1"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pronto para revolucionar seus reembolsos?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed px-2">
                Junte-se a centenas de empresas que já transformaram seus processos
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center px-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] transition-all hover:scale-105 hover:shadow-xl"
                    onClick={() => handleCTAClick("final_cta_register")}
                  >
                    Teste Gratuitamente
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-blue-600 bg-transparent min-h-[48px] transition-all hover:scale-105"
                  onClick={() => trackEvent("contact_request", { source: "final_cta" })}
                >
                  Falar com Especialista
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer - Mobile First */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12 safe-area-inset-bottom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="md:col-span-2 lg:col-span-1">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                      <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <span className="text-base sm:text-lg font-bold">ReembolsoAI</span>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Transformando a gestão de reembolsos com inteligência artificial.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Produto</h4>
                  <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                    <li>
                      <a
                        href="#features"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Funcionalidades
                      </a>
                    </li>
                    <li>
                      <a
                        href="#pricing"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Preços
                      </a>
                    </li>
                    <li>
                      <a
                        href="/api-docs"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        API
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Empresa</h4>
                  <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                    <li>
                      <a
                        href="/about"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Sobre
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blog"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="/careers"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Carreiras
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Suporte</h4>
                  <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                    <li>
                      <a
                        href="/help"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Central de Ajuda
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Contato
                      </a>
                    </li>
                    <li>
                      <a
                        href="/status"
                        className="hover:text-white transition-colors touch-manipulation hover:translate-x-1 inline-block"
                      >
                        Status
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
                <p>&copy; 2024 ReembolsoAI. Todos os direitos reservados.</p>
              </div>
            </AnimatedSection>
          </div>
        </footer>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
            opacity: 0;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </div>

      {/* Structured Data */}
      <SoftwareApplicationStructuredData />

      <StructuredData
        type="WebPage"
        data={{
          name: "ReembolsoAI - Sistema Inteligente de Reembolsos Médicos",
          description:
            "Transforme a gestão de reembolsos médicos da sua empresa com IA. Processamento automático, interface mobile-first, aprovações em tempo real.",
          url: "https://reembolsoai.com/landing",
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "ReembolsoAI",
          },
        }}
      />
    </>
  )
}
