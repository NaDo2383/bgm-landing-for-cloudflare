import Footer from "@/components/common/Footer"
import Navbar from "@/components/common/Navbar"
import React from "react"

interface LandingPageRootlayoutProps {
  children: React.ReactNode
}

const landingPageRootlayout = ({ children }: LandingPageRootlayoutProps) => {
  return (
    <div className=' overflow-hidden'>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default landingPageRootlayout
