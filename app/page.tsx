"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { trackEvent } from "@/components/analytics/tracking"

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

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Track homepage visit
    trackEvent("page_view", {
      page_title: "Home - Redirect",
      page_location: window.location.href,
    })

    // Redirect to landing page
    router.replace("/landing")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-lg">R</span>
        </div>
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    </div>
  )
}
