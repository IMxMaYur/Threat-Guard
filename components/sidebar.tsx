"use client"

import { Shield, LayoutDashboard, Upload, Cpu, BarChart3, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PageType } from "@/app/page"

interface SidebarProps {
  currentPage: PageType
  onNavigate: (page: PageType) => void
}

const navItems = [
  { id: "dashboard" as PageType, label: "Dashboard Overview", icon: LayoutDashboard },
  { id: "upload" as PageType, label: "Upload Logs", icon: Upload },
  { id: "detection" as PageType, label: "Detection Results", icon: Cpu },
  { id: "reports" as PageType, label: "Visual Reports", icon: BarChart3 },
  { id: "downloads" as PageType, label: "Downloads", icon: Download },
]

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">AI ThreatShield</h1>
            <p className="text-xs text-muted-foreground">Threat Detection</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-muted-foreground text-center">v1.0.0 • AI Detection System</div>
      </div>
    </aside>
  )
}
