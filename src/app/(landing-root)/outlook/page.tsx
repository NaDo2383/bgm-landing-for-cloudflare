import { redirect } from "next/navigation"

export default function OutlookPage() {
  const date = new Date()

  redirect(`/outlook/${date.getFullYear()}`)
}
