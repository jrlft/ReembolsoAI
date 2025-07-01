"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { Dashboard } from "@/components/dashboard"
import { ReimbursementBoard } from "@/components/reimbursement-board"
import { NewReimbursementForm } from "@/components/new-reimbursement-form"
import { PlansPage } from "@/components/plans-page"
import { ProfilePage } from "@/components/profile-page"
import { PasswordPage } from "@/components/password-page"
import { BillingPage } from "@/components/billing-page"
import { HelpPage } from "@/components/help-page"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { LoginPage } from "@/components/auth/login-page"
import { MobileDrawer } from "@/components/layout/mobile-drawer"
import { AuthProvider } from "@/contexts/auth-context"
import { ReimbursementProvider } from "@/contexts/reimbursement-context"

export type Page =
  | "dashboard"
  | "reimbursements"
  | "new-reimbursement"
  | "plans"
  | "profile"
  | "password"
  | "billing"
  | "help"
  | "admin"
  | "upgrade"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock user data
  const user = {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "free" as const,
    role: "user" as const,
  }

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  const handleTitleClick = () => {
    setCurrentPage("dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "reimbursements":
        return <ReimbursementBoard />
      case "new-reimbursement":
        return <NewReimbursementForm />
      case "plans":
      case "upgrade":
        return <PlansPage />
      case "profile":
        return <ProfilePage />
      case "password":
        return <PasswordPage />
      case "billing":
        return <BillingPage />
      case "help":
        return <HelpPage />
      case "admin":
        return <AdminDashboard />
      default:
        return <Dashboard />
    }
  }

  return (
    <AuthProvider>
      <ReimbursementProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onMenuClick={() => setIsMobileMenuOpen(true)} onTitleClick={handleTitleClick} notificationCount={3} />

          <DesktopSidebar user={user} currentPage={currentPage} onNavigate={handleNavigate} />

          <MobileDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            user={user}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />

          <main className="lg:pl-80 pt-16">
            <div className="p-4 lg:p-8">{renderPage()}</div>
          </main>
        </div>
      </ReimbursementProvider>
    </AuthProvider>
  )
}
