"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Gavel,
    Users,
    TrendingUp,
    Settings,
    BrainCircuit as ActiveAI,
    History,
    ShieldCheck,
    Car,
    LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Active Auctions', href: '/admin/auctions', icon: Gavel },
    { name: 'Vehicle Fleet', href: '/admin/fleet', icon: Car },
    { name: 'Bidding Trends', href: '/admin/analytics', icon: TrendingUp },
    { name: 'AI Monitoring', href: '/admin/ai-monitoring', icon: ActiveAI },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Bot Security', href: '/admin/security', icon: ShieldCheck },
    { name: 'History', href: '/admin/history', icon: History },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-72 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-white/5 flex flex-col h-full shadow-sm">
            {/* Header / Logo */}
            <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-white/5 space-x-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                    <ActiveAI className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-slate-900 dark:text-white font-black tracking-tight text-xl leading-none">COMMAND</h1>
                    <span className="text-[10px] text-accent font-bold uppercase tracking-widest leading-none">AI Center</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-8 no-scrollbar">
                <div className="space-y-1.5">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all group relative",
                                    isActive
                                        ? "bg-accent/10 text-accent dark:bg-accent/10 dark:text-accent"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-transform duration-300",
                                    isActive ? "text-accent scale-110" : "group-hover:scale-110"
                                )} />
                                {item.name}
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full shadow-[0_0_12px_rgba(220,38,38,0.5)]" />
                                )}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 mt-auto">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all text-sm font-semibold">
                    <LogOut className="w-5 h-5 opacity-70" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
