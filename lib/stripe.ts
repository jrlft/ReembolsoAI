// TODO: Integração com Stripe para pagamentos
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const createCheckoutSession = async (priceId: string) => {
  /* Implementação real:
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/plans`,
    }),
  })

  const session = await response.json()
  
  const stripe = await stripePromise
  const { error } = await stripe!.redirectToCheckout({
    sessionId: session.id,
  })

  if (error) {
    throw new Error(error.message)
  }
  */

  // Mock implementation
  console.log("Redirecionando para checkout do Stripe:", priceId)

  // Tracking de conversão
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      value: priceId === "price_monthly" ? 29 : 300,
      currency: "BRL",
    })
  }
}

// Preços configurados no Stripe Dashboard
export const STRIPE_PRICES = {
  monthly: "price_1234567890", // R$ 29/mês
  yearly: "price_0987654321", // R$ 300/ano
}
