import { cookies } from "next/headers"

export const locales = ["en", "mn"] as const
export type Locale = (typeof locales)[number]

const defaultLocale: Locale = "en"

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value
  return locales.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : defaultLocale
}

export async function getMessages(locale: Locale) {
  try {
    return (await import(`../locales/${locale}.json`)).default
  } catch {
    return (await import(`../locales/${defaultLocale}.json`)).default
  }
}
