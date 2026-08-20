"use client"

import { useState } from "react"
import {
    Cpu,
    Search,
    CheckCircle,
    XCircle,
    DollarSign,
    Shield,
    Sliders,
    Eye,
    TrendingUp
} from "lucide-react"

interface ITCVehicle {
    id: string
    make: string
    model: string
    year: number
    inspectedValue: number
    startingBid: number
    status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED" | "OWNERSHIP_TRANSFERRED"
    inspectQuality: string
    inspectEntity: string
}

export default function ITCPortal() {
    const [vehicles, setVehicles] = useState<ITCVehicle[]>([
        { id: "V-9912", make: "Toyota", model: "Land Cruiser", year: 2021, inspectedValue: 195000, startingBid: 185000, status: "PENDING_APPROVAL", inspectQuality: "Grade B (Minor wear)", inspectEntity: "Inspectco UAE" },
        { id: "V-9910", make: "Mercedes-Benz", model: "G63 AMG", year: 2024, inspectedValue: 920000, startingBid: 850000, status: "APPROVED", inspectQuality: "Grade A (Excellent)", inspectEntity: "Inspectco UAE" },
        { id: "V-9911", make: "Porsche", model: "911 GT3", year: 2023, inspectedValue: 850000, startingBid: 800000, status: "OWNERSHIP_TRANSFERRED", inspectQuality: "Grade A (Excellent)", inspectEntity: "Inspectco UAE" },
        { id: "V-9913", make: "Chevrolet", model: "Corvette Z06", year: 2023, inspectedValue: 450000, startingBid: 420000, status: "PENDING_APPROVAL", inspectQuality: "Grade B (Minor wear)", inspectEntity: "Tasjeel Appraisal" }
    ])

    const [logs, setLogs] = useState<string[]>([])

    const approveValuation = (id: string) => {
        setVehicles(prev => prev.map(v => {
            if (v.id === id) {
                setLogs(l => [`[ITC API] Approved starting bid of AED ${v.startingBid.toLocaleString()} for ${v.make} ${v.model} (${v.id}).`, ...l])
                return { ...v, status: "APPROVED" }
            }
            return v
        }))
    }

    const rejectValuation = (id: string) => {
        setVehicles(prev => prev.map(v => {
            if (v.id === id) {
                setLogs(l => [`[ITC API] Rejected valuation for ${v.make} ${v.model} (${v.id}). Re-inspection requested.`, ...l])
                return { ...v, status: "REJECTED" }
            }
            return v
        }))
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 p-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-3">
                        <Cpu className="w-8 h-8 text-purple-500" />
                        Integrated Transport Center Portal (مركز النقل المتكامل)
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        Official regulatory portal. Review appraiser valuations, authorize initial pricing, and execute secure legal ownership transfers.
                    </p>
                </div>
            </div>

            {/* Financial Overview Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Liquidation Revenue", value: "AED 3.8M", color: "text-purple-500", icon: DollarSign },
                    { label: "Pending ITC Approvals", value: `${vehicles.filter(v => v.status === "PENDING_APPROVAL").length} Assets`, color: "text-amber-500", icon: Sliders },
                    { label: "Ownership Transfers Completed", value: `${vehicles.filter(v => v.status === "OWNERSHIP_TRANSFERRED").length} Transfers`, color: "text-green-500", icon: Shield }
                ].map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                        <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex justify-between items-center">
                            <div>
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</span>
                                <p className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-2xl">
                                <Icon className="w-6 h-6" />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Valuation Approvals Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 dark:border-white/5">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Valuation & Appraisals Queue</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                                <th className="px-6 py-4">Vehicle Detail</th>
                                <th className="px-6 py-4">Appraisal Entity</th>
                                <th className="px-6 py-4">Condition & Grade</th>
                                <th className="px-6 py-4 text-right">Starting Bid</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Valuation Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {vehicles.map((v) => (
                                <tr key={v.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{v.year} {v.make} {v.model}</p>
                                            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded mt-1 inline-block">{v.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400">{v.inspectEntity}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{v.inspectQuality}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="space-y-0.5">
                                            <span className="text-sm font-black text-slate-900 dark:text-white">AED {v.startingBid.toLocaleString()}</span>
                                            <span className="text-[9px] block text-slate-400">Inspected: AED {v.inspectedValue.toLocaleString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                                            v.status === "PENDING_APPROVAL" ? "bg-amber-100 text-amber-600 border-amber-200" :
                                            v.status === "APPROVED" ? "bg-green-100 text-green-600 border-green-200" :
                                            v.status === "REJECTED" ? "bg-red-100 text-red-600 border-red-200" :
                                            "bg-purple-100 text-purple-600 border-purple-200"
                                        }`}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            {v.status === "PENDING_APPROVAL" ? (
                                                <>
                                                    <button
                                                        onClick={() => approveValuation(v.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-600 text-white font-black uppercase text-[9px] hover:bg-green-700 active:scale-95 transition-all cursor-pointer"
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => rejectValuation(v.id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 text-white font-black uppercase text-[9px] hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
                                                    >
                                                        <XCircle className="w-3.5 h-3.5" /> Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Processed</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-slate-950 text-slate-200 border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">ITC Audit Logs</h2>
                <div className="font-mono text-xs space-y-2 max-h-[150px] overflow-y-auto no-scrollbar">
                    {logs.length === 0 ? (
                        <p className="text-slate-500 italic">No events logged. Click Approve/Reject above to simulate ITC regulatory decisions.</p>
                    ) : (
                        logs.map((log, idx) => (
                            <div key={idx} className="text-slate-300">{log}</div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
