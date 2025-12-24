import OutlookPage from "@/components/outlook/OutlookPage"

interface OutlookPageProps {
  params: Promise<{ year: string }>
}

export default async function page({ params }: OutlookPageProps) {
  const { year } = await params

  return <OutlookPage year={year} />
}
