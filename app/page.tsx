"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { ReimbursementBoard } from "@/components/reimbursement-board"
import { FreemiumBanner } from "@/components/freemium-banner"
import { NewReimbursementForm } from "@/components/new-reimbursement-form"
import { PlansPage } from "@/components/plans-page"
import { ProfilePage } from "@/components/profile-page"
import { PasswordPage } from "@/components/password-page"
import { BillingPage } from "@/components/billing-page"
import { HelpPage } from "@/components/help-page"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminUsers } from "@/components/admin/admin-users"
import { AdminDependents } from "@/components/admin/admin-dependents"
import { AdminReimbursementTypes } from "@/components/admin/admin-reimbursement-types"
import { AdminDocumentTypes } from "@/components/admin/admin-document-types"
import { AdminRequirements } from "@/components/admin/admin-requirements"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { LoginPage } from "@/components/auth/login-page"

export type Page =
  | "dashboard"
  | "reimbursements"
  | "new-reimbursement"
  | "plans"
  | "profile"
  | "password"
  | "billing"
  | "help"
  | "upgrade"
  | "admin"
  | "admin-users"
  | "admin-dependents"
  | "admin-reimbursement-types"
  | "admin-document-types"
  | "admin-requirements"

export interface User {
  name: string
  email: string
  avatar: string
  plan: "free" | "pro"
  reimbursementsUsed: number
  reimbursementsLimit: number
}

export default function App() {
  const { user, isLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard user={user} onNavigate={setCurrentPage} />
      case "reimbursements":
        return <ReimbursementBoard user={user} onNavigate={setCurrentPage} />
      case "new-reimbursement":
        return <NewReimbursementForm user={user} onNavigate={setCurrentPage} />
      case "plans":
      case "upgrade":
        return <PlansPage user={user} onNavigate={setCurrentPage} />
      case "profile":
        return <ProfilePage user={user} onNavigate={setCurrentPage} />
      case "password":
        return <PasswordPage user={user} onNavigate={setCurrentPage} />
      case "billing":
        return <BillingPage user={user} onNavigate={setCurrentPage} />
      case "help":
        return <HelpPage user={user} onNavigate={setCurrentPage} />
      case "admin":
        return <AdminDashboard user={user} onNavigate={setCurrentPage} />
      case "admin-users":
        return <AdminUsers user={user} onNavigate={setCurrentPage} />
      case "admin-dependents":
        return <AdminDependents user={user} onNavigate={setCurrentPage} />
      case "admin-reimbursement-types":
        return <AdminReimbursementTypes user={user} onNavigate={setCurrentPage} />
      case "admin-document-types":
        return <AdminDocumentTypes user={user} onNavigate={setCurrentPage} />
      case "admin-requirements":
        return <AdminRequirements user={user} onNavigate={setCurrentPage} />
      default:
        return <Dashboard user={user} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onTitleClick={() => setCurrentPage("dashboard")}
        notificationCount={3}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar user={user} currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page)
          setSidebarOpen(false)
        }}
      />

      <main className="pt-16 px-4 pb-6 max-w-7xl mx-auto lg:ml-80">
        {user.plan === "free" && <FreemiumBanner user={user} onUpgrade={() => setCurrentPage("upgrade")} />}
        {renderPage()}
      </main>
    </div>
  )
}
