import { Suspense } from "react"
import DashboardClient from "@/components/dashboard/DashboardClient"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-red-600/30 border-t-red-600 animate-spin mx-auto" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardClient />
    </Suspense>
  )
}
