"use client"
import Script from "next/script"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function GoogleAnalytics() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

export function FacebookPixel() {
  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}

export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // Google Analytics
    if (window.gtag) {
      window.gtag("event", eventName, parameters)
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq("track", eventName, parameters)
    }
  }
}

export function trackConversion(conversionType: "signup" | "login" | "purchase", value?: number) {
  if (typeof window !== "undefined") {
    const eventData = {
      event_category: "conversion",
      event_label: conversionType,
      value: value || 0,
    }

    // Google Analytics
    if (window.gtag) {
      window.gtag("event", "conversion", eventData)
    }

    // Facebook Pixel
    if (window.fbq) {
      switch (conversionType) {
        case "signup":
          window.fbq("track", "CompleteRegistration")
          break
        case "login":
          window.fbq("track", "Login")
          break
        case "purchase":
          window.fbq("track", "Purchase", { value, currency: "BRL" })
          break
      }
    }
  }
}
