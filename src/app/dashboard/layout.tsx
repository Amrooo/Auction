"use client"

import { DashboardSidebar } from "@/components/dashboard/Sidebar"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex flex-col lg:flex-row gap-8 pt-8",
          language === 'ar' && "lg:flex-row-reverse"
        )}>
          {/* Dashboard Sidebar */}
          <DashboardSidebar />

          {/* Dashboard Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
