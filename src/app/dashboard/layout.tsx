"use client"

import { Suspense } from "react"
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
        <div 
          className="flex flex-col lg:flex-row gap-8 pt-8"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Dashboard Sidebar: naturally on Right in RTL and on Left in LTR */}
          <Suspense fallback={<div className="w-full lg:w-80 h-96 rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse shrink-0" />}>
            <DashboardSidebar />
          </Suspense>

          {/* Dashboard Content: naturally on Left in RTL and on Right in LTR */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
