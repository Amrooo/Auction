import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 selection:bg-accent/30 selection:text-accent">
            <div className="flex h-screen overflow-hidden relative z-10">
                <AdminSidebar />
                <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-white/50 dark:bg-transparent">
                    <AdminHeader />
                    <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-6 lg:p-10 no-scrollbar">
                        {children}
                    </main>
                </div>
            </div>
            {/* Background Decorative Blur - Lighter and subtler */}
            <div className="fixed -top-32 -right-32 w-[500px] h-[500px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed -bottom-32 -left-32 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
    )
}
