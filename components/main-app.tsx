"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/layout/header"
import { MobileDrawer } from "@/components/layout/mobile-drawer"
import { DesktopSidebar } from "@/components/layout/desktop-sidebar"
import { Dashboard } from "@/components/dashboard/dashboard"
import { KanbanBoard } from "@/components/kanban/kanban-board"
import { NewReimbursementWizard } from "@/components/reimbursement/new-reimbursement-wizard"
import { PlansPage } from "@/components/plans/plans-page"
import { DependentsPage } from "@/components/dependents/dependents-page"
import { HealthPlanModal } from "@/components/modals/health-plan-modal"
import { FreemiumBanner } from "@/components/ui/freemium-banner"

export type Page = "dashboard" | "reimbursements" | "new-reimbursement" | "plans" | "dependents"

export function MainApp() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showHealthPlanModal, setShowHealthPlanModal] = useState(false)

  // Verificar se usuário tem plano cadastrado
  useEffect(() => {
    if (user && !user.hasHealthPlan && currentPage === "new-reimbursement") {
      setShowHealthPlanModal(true)
      setCurrentPage("dashboard")
    }
  }, [user, currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />
      case "reimbursements":
        return <KanbanBoard />
      case "new-reimbursement":
        return <NewReimbursementWizard onNavigate={setCurrentPage} />
      case "plans":
        return <PlansPage />
      case "dependents":
        return <DependentsPage />
      default:
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header fixo */}
      <Header
        onMenuClick={() => setDrawerOpen(true)}
        onTitleClick={() => setCurrentPage("dashboard")}
        notificationCount={3}
      />

      {/* Sidebar Desktop */}
      <DesktopSidebar user={user} currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Drawer Mobile */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page)
          setDrawerOpen(false)
        }}
      />

      {/* Conteúdo Principal */}
      <main className="pt-16 px-4 pb-6 max-w-7xl mx-auto lg:ml-80">
        {/* Banner Freemium */}
        {user.plan === "free" && <FreemiumBanner user={user} onUpgrade={() => setCurrentPage("plans")} />}

        {renderPage()}
      </main>

      {/* Modal de Plano de Saúde */}
      <HealthPlanModal
        isOpen={showHealthPlanModal}
        onClose={() => setShowHealthPlanModal(false)}
        onSuccess={() => {
          setShowHealthPlanModal(false)
          setCurrentPage("new-reimbursement")
        }}
      />
    </div>
  )
}
