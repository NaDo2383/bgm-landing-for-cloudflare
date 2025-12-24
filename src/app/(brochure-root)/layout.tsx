// This is a ROOT layout for everything inside (brochure-root)
// It will NOT inherit src/app/layout.tsx
export const metadata = { title: "Brochure" }

export default function BrochureRootLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
