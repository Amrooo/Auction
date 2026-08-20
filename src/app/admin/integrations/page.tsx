"use client"

import { useState } from "react"
import {
    Activity,
    ShieldCheck,
    Truck,
    HardDrive,
    Coins,
    UserCheck,
    Cpu,
    RefreshCw,
    Play,
    CheckCircle,
    AlertTriangle,
    FileText
} from "lucide-react"

interface LogMessage {
    timestamp: string
    system: string
    message: string
    type: "info" | "success" | "warning" | "error"
}

export default function IntegrationsDashboard() {
    const [systems, setSystems] = useState([
        { id: "safeyard", name: "1. SafeYard System", status: "CONNECTED", detail: "Impound logs & vehicle holds API", lastSync: "2 mins ago", color: "border-blue-500 text-blue-500 bg-blue-500/10", icon: HardDrive },
        { id: "itc", name: "2. Transport Center", status: "CONNECTED", detail: "Valuation approval & plate registration API", lastSync: "5 mins ago", color: "border-purple-500 text-purple-500 bg-purple-500/10", icon: Cpu },
        { id: "auction_hub", name: "3. Saaed Auction Hub", status: "ONLINE", detail: "Core orchestration & catalog API", lastSync: "Active now", color: "border-red-500 text-red-500 bg-red-500/10", icon: Activity },
        { id: "inspectco", name: "4. Inspection & Valuation", status: "LISTENING", detail: "360 media & engine audio intake", lastSync: "10 mins ago", color: "border-emerald-500 text-emerald-500 bg-emerald-500/10", icon: FileText },
        { id: "uaepass", name: "5. UAE PASS Identity", status: "CONNECTED", detail: "OAuth2 KYC validation client", lastSync: "1 min ago", color: "border-amber-500 text-amber-500 bg-amber-500/10", icon: UserCheck },
        { id: "payments", name: "6. Payment & E-Wallet", status: "CONNECTED", detail: "Card pre-auth hold & wallet settlement", lastSync: "Active now", color: "border-teal-500 text-teal-500 bg-teal-500/10", icon: Coins },
        { id: "logistics", name: "7. Towing & Logistics", status: "LISTENING", detail: "Saaed Flatbed Dispatch & OTP Gatepass", lastSync: "15 mins ago", color: "border-indigo-500 text-indigo-500 bg-indigo-500/10", icon: Truck }
    ])

    const [logs, setLogs] = useState<LogMessage[]>([
        { timestamp: "11:45:02", system: "SafeYard System", message: "Incoming webhook: Syncing 5 eligible impounded vehicles (6+ months threshold reached)", type: "info" },
        { timestamp: "11:44:18", system: "UAE PASS Identity", message: "KYC validated for emiratesId: 784-1992-XXXXXXX-X (Amro Al-Rashed)", type: "success" },
        { timestamp: "11:42:30", system: "Transport Center", message: "Ownership transfer executed successfully for license code: DXB-M99", type: "success" },
        { timestamp: "11:40:05", system: "Logistics & Towing", message: "Gatepass OTP code sent to winner mobile +97150XXXXXXX", type: "info" }
    ])

    const [isLoading, setIsLoading] = useState<string | null>(null)

    const triggerSync = (systemId: string) => {
        setIsLoading(systemId)
        setTimeout(() => {
            const now = new Date().toLocaleTimeString()
            let newLog: LogMessage = { timestamp: now, system: "", message: "", type: "success" }

            switch (systemId) {
                case "safeyard":
                    newLog = { timestamp: now, system: "SafeYard System", message: "SafeYard Sync Triggered: 3 new scrap-classified vehicles imported.", type: "success" }
                    break
                case "itc":
                    newLog = { timestamp: now, system: "Transport Center", message: "Valuation approved for Mercedes-Benz V-9912 (Initial Bid: AED 95,000).", type: "success" }
                    break
                case "inspectco":
                    newLog = { timestamp: now, system: "Inspection Entity", message: "Inspection report uploaded: 360 photo, condition score B, engine audio uploaded.", type: "info" }
                    break
                case "uaepass":
                    newLog = { timestamp: now, system: "UAE PASS Identity", message: "Simulated UAE PASS Authorization Callback processed successfully.", type: "success" }
                    break
                case "payments":
                    newLog = { timestamp: now, system: "Payment & Wallet", message: "Deposit Pre-authorization hold of AED 5,000 processed for User #1209.", type: "success" }
                    break
                case "logistics":
                    newLog = { timestamp: now, system: "Towing & Logistics", message: "Saaed Flatbed recovery truck dispatched for pickup at Yard Zone 4.", type: "warning" }
                    break
                default:
                    newLog = { timestamp: now, system: "Saaed Hub", message: "Global connection check complete. All systems healthy.", type: "success" }
            }

            setLogs(prev => [newLog, ...prev])
            setSystems(prev => prev.map(sys => {
                if (sys.id === systemId) {
                    return { ...sys, lastSync: "Just now" }
                }
                return sys
            }))
            setIsLoading(null)
        }, 1200)
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-3">
                        <Activity className="w-8 h-8 text-red-500" />
                        Saaed 7-Systems Integration Hub
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Monitor real-time messaging, test webhooks, and trigger simulated actions across interconnected systems.</p>
                </div>
                <button
                    onClick={() => triggerSync("global")}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                    <RefreshCw className="w-4 h-4 animate-spin-slow" /> Reset Hub Connections
                </button>
            </div>

            {/* Hub Map / Panels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {systems.map((sys) => {
                    const Icon = sys.icon
                    return (
                        <div key={sys.id} className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 transition-all hover:border-slate-300 dark:hover:border-white/10 shadow-sm flex flex-col justify-between h-[220px] overflow-hidden">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black tracking-widest border ${sys.color}`}>
                                        {sys.status}
                                    </span>
                                </div>
                                <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug">{sys.name}</h3>
                                <p className="text-xs text-slate-500 mt-1">{sys.detail}</p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sync: {sys.lastSync}</span>
                                {sys.id !== "auction_hub" && (
                                    <button
                                        onClick={() => triggerSync(sys.id)}
                                        disabled={isLoading !== null}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest text-[9px] hover:bg-red-700 disabled:opacity-50 active:scale-95 transition-all cursor-pointer"
                                    >
                                        {isLoading === sys.id ? (
                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <>
                                                <Play className="w-3 h-3" /> Simulate
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Logs Terminal Panel */}
            <div className="bg-slate-950 text-slate-200 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Integration Webhook Logs & API Events</h2>
                    </div>
                    <button
                        onClick={() => setLogs([])}
                        className="text-[9px] font-black uppercase text-slate-500 hover:text-white tracking-widest"
                    >
                        Clear Console
                    </button>
                </div>
                <div className="p-6 font-mono text-xs space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                    {logs.length === 0 ? (
                        <p className="text-slate-500 italic text-center py-8">No events logged. Trigger simulations above to trace active API webhooks.</p>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className="flex gap-4 items-start leading-relaxed animate-fade-in-up">
                                <span className="text-slate-500 shrink-0 select-none">[{log.timestamp}]</span>
                                <span className={`font-black shrink-0 ${log.type === "success" ? "text-green-400" : log.type === "warning" ? "text-yellow-400" : log.type === "error" ? "text-red-400" : "text-blue-400"}`}>
                                    [{log.system}]
                                </span>
                                <span className="text-slate-300">{log.message}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
