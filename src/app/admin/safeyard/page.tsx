"use client"

import { useState, useEffect } from "react"
import {
    HardDrive,
    Search,
    Clock,
    AlertTriangle,
    CheckCircle,
    Trash2,
    Send,
    Eye,
    X,
    FolderCheck,
    Lock
} from "lucide-react"

interface YardVehicle {
    id: string
    plateNumber: string
    plateCode: string
    make: string
    model: string
    year: number
    daysInYard: number
    status: "IMPOUNDED" | "ELIGIBLE" | "TRANSFERRED" | "SCRAP_FORCED"
    ownerNotified: boolean
    policeCleared: boolean
    vin: string
    color: string
    reason: string
    estValue: number
    image: string
}

export default function SafeYardPortal() {
    const [vehicles, setVehicles] = useState<YardVehicle[]>([
        { id: "SY-101", plateNumber: "54291", plateCode: "A", make: "Toyota", model: "Land Cruiser", year: 2021, daysInYard: 185, status: "ELIGIBLE", ownerNotified: true, policeCleared: true, vin: "JTMBH34F89N0291", color: "White", reason: "Expired Registration & Abandoned", estValue: 185000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop" },
        { id: "SY-102", plateNumber: "88210", plateCode: "K", make: "Nissan", model: "Patrol", year: 2018, daysInYard: 210, status: "ELIGIBLE", ownerNotified: true, policeCleared: true, vin: "1G1YC2D46L51034", color: "Black", reason: "Judicial Confiscation Order", estValue: 42000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop" },
        { id: "SY-103", plateNumber: "10982", plateCode: "DXB", make: "Chevrolet", model: "Tahoe", year: 2020, daysInYard: 45, status: "IMPOUNDED", ownerNotified: false, policeCleared: false, vin: "WBA738291048XK1", color: "Gray", reason: "Unpaid Parking Fines (DXB Municipality)", estValue: 95000, image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=800&auto=format&fit=crop" },
        { id: "SY-104", plateNumber: "33091", plateCode: "SHJ", make: "Lexus", model: "RX350", year: 2019, daysInYard: 95, status: "ELIGIBLE", ownerNotified: true, policeCleared: false, vin: "WP0AA2991NS1038", color: "Silver", reason: "Involved in Roadside Accident", estValue: 78000, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop" },
        { id: "SY-105", plateNumber: "22871", plateCode: "AD", make: "BMW", model: "X5", year: 2017, daysInYard: 310, status: "TRANSFERRED", ownerNotified: true, policeCleared: true, vin: "WBA738291048XK2", color: "Blue", reason: "Abandoned at International Airport", estValue: 65000, image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop" }
    ])

    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [notificationLog, setNotificationLog] = useState<string[]>([])
    const [selectedVehicle, setSelectedVehicle] = useState<YardVehicle | null>(null)

    // Load custom transfers on mount
    useEffect(() => {
        const stored = localStorage.getItem("safeyard_transferred_vehicles")
        if (stored) {
            const parsed = JSON.parse(stored) as YardVehicle[]
            const ids = parsed.map(p => p.id)
            setVehicles(prev => prev.map(v => {
                if (ids.includes(v.id)) {
                    return { ...v, status: "TRANSFERRED" }
                }
                return v
            }))
        }
    }, [])

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    const toggleSelectAll = () => {
        const eligible = vehicles.filter(v => v.status === "ELIGIBLE" && v.policeCleared)
        if (selectedIds.length === eligible.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(eligible.map(e => e.id))
        }
    }

    const markAsScrap = (id: string) => {
        setVehicles(prev => prev.map(v => {
            if (v.id === id) {
                setNotificationLog(log => [`[YARD] Vehicle ${v.make} ${v.model} (${v.id}) forced directly to Scrap category.`, ...log])
                return { ...v, status: "SCRAP_FORCED", policeCleared: true }
            }
            return v
        }))
    }

    const transferSingle = (id: string) => {
        const target = vehicles.find(v => v.id === id)
        if (!target) return

        // Save to localStorage
        const stored = JSON.parse(localStorage.getItem("safeyard_transferred_vehicles") || "[]") as YardVehicle[]
        if (!stored.some(s => s.id === id)) {
            const updated = [...stored, { ...target, status: "TRANSFERRED" }]
            localStorage.setItem("safeyard_transferred_vehicles", JSON.stringify(updated))
        }

        setVehicles(prev => prev.map(v => {
            if (v.id === id) {
                setNotificationLog(log => [`[API HUB] Dispatched ${v.make} ${v.model} (${v.id}) to Auction Admin.`, ...log])
                return { ...v, status: "TRANSFERRED" }
            }
            return v
        }))
        window.dispatchEvent(new Event("safeyard_transferred_update"))
    }

    const bulkTransfer = () => {
        const targets = vehicles.filter(v => selectedIds.includes(v.id))
        if (targets.length === 0) return

        const stored = JSON.parse(localStorage.getItem("safeyard_transferred_vehicles") || "[]") as YardVehicle[]
        const newlyTransferred = [...stored]

        targets.forEach(target => {
            if (!newlyTransferred.some(s => s.id === target.id)) {
                newlyTransferred.push({ ...target, status: "TRANSFERRED" })
            }
        })
        localStorage.setItem("safeyard_transferred_vehicles", JSON.stringify(newlyTransferred))

        setVehicles(prev => prev.map(v => {
            if (selectedIds.includes(v.id)) {
                return { ...v, status: "TRANSFERRED" }
            }
            return v
        }))

        setNotificationLog(log => [`[BULK API] Pushed ${targets.length} checked vehicles to Auction Hub.`, ...log])
        setSelectedIds([])
        window.dispatchEvent(new Event("safeyard_transferred_update"))
    }

    const bulkScrap = () => {
        setVehicles(prev => prev.map(v => {
            if (selectedIds.includes(v.id)) {
                return { ...v, status: "SCRAP_FORCED", policeCleared: true }
            }
            return v
        }))
        setNotificationLog(log => [`[BULK YARD] Forced ${selectedIds.length} checked vehicles to Scrap Pool.`, ...log])
        setSelectedIds([])
    }

    const triggerPoliceClearance = (id: string) => {
        setVehicles(prev => prev.map(v => {
            if (v.id === id) {
                setNotificationLog(log => [`[POLICE] Clearance request approved for ${v.id}. No judicial claims.`, ...log])
                return { ...v, policeCleared: true }
            }
            return v
        }))
    }

    const filteredVehicles = vehicles.filter(v => {
        const term = searchQuery.toLowerCase()
        return (
            v.make.toLowerCase().includes(term) ||
            v.model.toLowerCase().includes(term) ||
            v.plateNumber.toLowerCase().includes(term) ||
            v.id.toLowerCase().includes(term)
        )
    })

    const eligibleToSelect = vehicles.filter(v => v.status === "ELIGIBLE" && v.policeCleared)

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 p-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-3">
                        <HardDrive className="w-8 h-8 text-red-500" />
                        SafeYard Management Portal (منظومة الساحات)
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        Initial intake portal for impounded vehicles. Vehicles exceeding 60-day limits are processed here for auctioning.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Impounded in Yard", value: "1,842 Vehicles", sub: "Capacity: 85%", color: "text-red-500" },
                    { label: "Eligible for Liquidation", value: `${vehicles.filter(v => v.daysInYard >= 60 && v.status !== "TRANSFERRED").length} Vehicles`, sub: "Passed retention threshold", color: "text-amber-500" },
                    { label: "Scrap & Salvage Pool", value: `${vehicles.filter(v => v.status === "SCRAP_FORCED").length} Forced`, sub: "Direct destruction classification", color: "text-red-500" }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</span>
                        <p className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.value}</p>
                        <span className="text-xs text-slate-400 mt-1 block">{stat.sub}</span>
                    </div>
                ))}
            </div>

            {/* Controls Bar & Bulk Actions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="w-full md:max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search yard inventory by plate number, make, ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-2.5 w-full text-sm outline-none text-slate-900 dark:text-white"
                    />
                </div>

                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-3 w-full md:w-auto animate-fade-in-up">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{selectedIds.length} Selected</span>
                        <button
                            onClick={bulkTransfer}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] tracking-wider transition-all active:scale-95 cursor-pointer border-none"
                        >
                            <Send className="w-3.5 h-3.5" /> Push Checked to Auction
                        </button>
                        <button
                            onClick={bulkScrap}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[10px] tracking-wider transition-all active:scale-95 cursor-pointer border-none"
                        >
                            <Trash2 className="w-3.5 h-3.5" /> Force Checked to Scrap
                        </button>
                    </div>
                )}
            </div>

            {/* Inventory List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                                <th className="px-6 py-4 text-center w-12">
                                    <input
                                        type="checkbox"
                                        onChange={toggleSelectAll}
                                        checked={selectedIds.length === eligibleToSelect.length && eligibleToSelect.length > 0}
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-4">Vehicle ID & Plate</th>
                                <th className="px-6 py-4">Yard Duration</th>
                                <th className="px-6 py-4">Legal Actions</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Simulate Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredVehicles.map((vehicle) => (
                                <tr key={vehicle.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            disabled={vehicle.status !== "ELIGIBLE" || !vehicle.policeCleared}
                                            checked={selectedIds.includes(vehicle.id)}
                                            onChange={() => toggleSelect(vehicle.id)}
                                            className="w-4 h-4 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                {vehicle.year} {vehicle.make} {vehicle.model}
                                                <button
                                                    onClick={() => setSelectedVehicle(vehicle)}
                                                    className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </p>
                                            <div className="flex gap-2 items-center mt-1">
                                                <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">{vehicle.id}</span>
                                                <span className="text-[10px] font-bold text-blue-500 uppercase">Plate: {vehicle.plateCode}-{vehicle.plateNumber}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-slate-400" />
                                            <div>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{vehicle.daysInYard} Days</span>
                                                <span className="text-[9px] block text-slate-500 font-medium">Threshold: {vehicle.daysInYard >= 60 ? "Exceeded (Ready)" : "Pending"}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-[10px] font-bold">
                                                {vehicle.ownerNotified ? (
                                                    <span className="text-green-500 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> SMS Warning Sent</span>
                                                ) : (
                                                    <span className="text-amber-500 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Warning Missing</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold">
                                                {vehicle.policeCleared ? (
                                                    <span className="text-green-500 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Police Cleared</span>
                                                ) : (
                                                    <button
                                                        onClick={() => triggerPoliceClearance(vehicle.id)}
                                                        className="text-blue-500 underline hover:text-blue-600 transition-all cursor-pointer"
                                                    >
                                                        Request Clearance
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                                            vehicle.status === "IMPOUNDED" ? "bg-blue-100 text-blue-600 border-blue-200" :
                                            vehicle.status === "ELIGIBLE" ? "bg-amber-100 text-amber-600 border-amber-200" :
                                            vehicle.status === "TRANSFERRED" ? "bg-green-100 text-green-600 border-green-200" :
                                            "bg-red-100 text-red-600 border-red-200"
                                        }`}>
                                            {vehicle.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            {vehicle.status !== "TRANSFERRED" && (
                                                <>
                                                    <button
                                                        onClick={() => transferSingle(vehicle.id)}
                                                        disabled={!vehicle.policeCleared}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-600 disabled:bg-slate-350 text-white font-black uppercase text-[9px] hover:bg-green-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 border-none"
                                                    >
                                                        <Send className="w-3 h-3" /> Push to Auction
                                                    </button>
                                                    {vehicle.status !== "SCRAP_FORCED" && (
                                                        <button
                                                            onClick={() => markAsScrap(vehicle.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-600 text-white font-black uppercase text-[9px] hover:bg-red-700 active:scale-95 transition-all cursor-pointer border-none"
                                                        >
                                                            <Trash2 className="w-3 h-3" /> Force Scrap
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vehicle Details Modal */}
            {selectedVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedVehicle(null)} />
                    <div className="bg-white dark:bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 max-w-2xl w-full relative z-10 shadow-2xl animate-fade-in-up">
                        <button onClick={() => setSelectedVehicle(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer border-none bg-transparent">
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="flex flex-col md:flex-row gap-6">
                            <img src={selectedVehicle.image} alt={selectedVehicle.model} className="w-full md:w-56 h-48 rounded-2xl object-cover border border-slate-200 dark:border-white/5" />
                            <div className="space-y-4 flex-1">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</h3>
                                    <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded mt-1.5 inline-block">VIN: {selectedVehicle.vin}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <span className="text-slate-400 block uppercase font-black text-[9px] tracking-wider">Plate Details</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">{selectedVehicle.plateCode} - {selectedVehicle.plateNumber}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block uppercase font-black text-[9px] tracking-wider">Intake Color</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block">{selectedVehicle.color}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block uppercase font-black text-[9px] tracking-wider">Yard Stay</span>
                                        <span className="font-bold text-red-500 mt-1 block">{selectedVehicle.daysInYard} Days</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block uppercase font-black text-[9px] tracking-wider">Est. Valuation</span>
                                        <span className="font-bold text-green-500 mt-1 block">AED {selectedVehicle.estValue.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-slate-400 block uppercase font-black text-[9px] tracking-wider">Impound Infraction Reason</span>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 leading-relaxed">{selectedVehicle.reason}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification logs */}
            <div className="bg-slate-950 text-slate-200 border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">SafeYard Integration Logs (API Webhooks)</h2>
                <div className="font-mono text-xs space-y-2 max-h-[150px] overflow-y-auto no-scrollbar">
                    {notificationLog.length === 0 ? (
                        <p className="text-slate-500 italic">No events generated. Click actions above to test SafeYard-to-Auction Hub transfer payload webhooks.</p>
                    ) : (
                        notificationLog.map((log, idx) => (
                            <div key={idx} className="text-slate-300">{log}</div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
