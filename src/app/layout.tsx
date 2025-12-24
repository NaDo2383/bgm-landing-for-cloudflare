import type { Metadata } from "next"
import { Geist, Geist_Mono, Roboto } from "next/font/google"
import "./globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

import {
  bgmXwideMedium,
  bgmFreigeist,
  bgmFreigeistLight,
  bgmFreigeistBlack,
  bgmFreigeistXwideLight,
  normsPro,
  benzinExtraBold,
  benzinMedium,
} from "./fonts"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://balancedgrowth.mn"),
  title: {
    default: "Balanced Growth Management",
    template: "%s · BGM",
  },
  description: "Balanced growth funds, insights, and tools.",
  applicationName: "BGM",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      mn: "/mn",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "BGM",
    title: "Balanced Growth Management",
    description: "Balanced growth funds, insights, and tools.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgm",
    creator: "@bgm",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png" }, // optional, for older browsers
    ],
  },
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={[
        inter.variable,
        roboto.variable,
        bgmXwideMedium.variable,
        bgmFreigeist.variable,
        bgmFreigeistLight.variable,
        bgmFreigeistBlack.variable,
        bgmFreigeistXwideLight.variable,
        normsPro.variable,
        benzinExtraBold.variable,
        benzinMedium.variable,
      ].join(" ")}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
