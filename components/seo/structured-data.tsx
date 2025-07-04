import Script from "next/script"

interface StructuredDataProps {
  type: "WebSite" | "Organization" | "SoftwareApplication" | "WebPage"
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: "ReembolsoAI",
        description: "Sistema inteligente de gestão de reembolsos médicos com IA",
        url: "https://reembolsoai.com",
        logo: "https://reembolsoai.com/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-11-99999-9999",
          contactType: "customer service",
          availableLanguage: "Portuguese",
        },
        sameAs: [
          "https://www.linkedin.com/company/reembolsoai",
          "https://twitter.com/reembolsoai",
          "https://www.facebook.com/reembolsoai",
        ],
      }}
    />
  )
}

export function SoftwareApplicationStructuredData() {
  return (
    <StructuredData
      type="SoftwareApplication"
      data={{
        name: "ReembolsoAI",
        description: "Sistema inteligente de gestão de reembolsos médicos com IA",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
          priceValidUntil: "2025-12-31",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "150",
        },
      }}
    />
  )
}
