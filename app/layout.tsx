import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ReimbursementProvider } from "@/contexts/reimbursement-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { GoogleAnalytics, FacebookPixel } from "@/components/analytics/tracking"
import { OrganizationStructuredData } from "@/components/seo/structured-data"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://reembolsoai.com"),
  title: {
    default: "ReembolsoAI - Sistema Inteligente de Reembolsos Médicos com IA",
    template: "%s | ReembolsoAI",
  },
  description:
    "Transforme a gestão de reembolsos médicos da sua empresa com IA. Processamento automático, interface mobile-first, aprovações em tempo real. Teste grátis por 14 dias.",
  keywords: [
    "reembolso médico",
    "gestão de reembolsos",
    "inteligência artificial",
    "IA para empresas",
    "sistema de reembolsos",
    "plano de saúde",
    "RH digital",
    "automação empresarial",
    "dashboard reembolsos",
    "mobile first",
  ],
  authors: [{ name: "ReembolsoAI Team" }],
  creator: "ReembolsoAI",
  publisher: "ReembolsoAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://reembolsoai.com",
    siteName: "ReembolsoAI",
    title: "ReembolsoAI - Sistema Inteligente de Reembolsos Médicos com IA",
    description:
      "Transforme a gestão de reembolsos médicos da sua empresa com IA. Processamento automático, interface mobile-first, aprovações em tempo real.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReembolsoAI - Sistema de Reembolsos com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@reembolsoai",
    creator: "@reembolsoai",
    title: "ReembolsoAI - Sistema Inteligente de Reembolsos Médicos com IA",
    description: "Transforme a gestão de reembolsos médicos da sua empresa com IA. Teste grátis por 14 dias.",
    images: ["/twitter-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ReembolsoAI",
  },
  formatDetection: {
    telephone: false,
  },
  category: "business",
  classification: "Business Software",
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",
    "facebook-domain-verification": "YOUR_FACEBOOK_VERIFICATION_CODE",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://reembolsoai.com" />
        <link rel="alternate" hrefLang="pt-BR" href="https://reembolsoai.com" />
        <link rel="alternate" hrefLang="x-default" href="https://reembolsoai.com" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ReembolsoAI" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Security */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <AuthProvider>
              <ReimbursementProvider>
                {children}
                <Toaster />
              </ReimbursementProvider>
            </AuthProvider>
          </ThemeProvider>

          {/* Analytics */}
          <GoogleAnalytics />
          <FacebookPixel />

          {/* Structured Data */}
          <OrganizationStructuredData />

          {/* Facebook Pixel NoScript */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
        </Suspense>
      </body>
    </html>
  )
}
