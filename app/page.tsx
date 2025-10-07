"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { DashboardOverview } from "@/components/pages/dashboard-overview"
import { UploadPage } from "@/components/pages/upload-page"
import { FeatureExtraction } from "@/components/pages/feature-extraction"
import { DetectionPage } from "@/components/pages/detection-page"
import { ReportsPage } from "@/components/pages/reports-page"
import { DownloadsPage } from "@/components/pages/downloads-page"

export type PageType = "dashboard" | "upload" | "extraction" | "detection" | "reports" | "downloads"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />
      case "upload":
        return <UploadPage onNext={() => setCurrentPage("extraction")} />
      case "extraction":
        return <FeatureExtraction onNext={() => setCurrentPage("detection")} />
      case "detection":
        return <DetectionPage onNext={() => setCurrentPage("reports")} />
      case "reports":
        return <ReportsPage />
      case "downloads":
        return <DownloadsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>
    </div>
  )
}
