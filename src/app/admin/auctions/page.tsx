"use client"

import { useState, useEffect } from "react"
import {
    Search,
    Filter,
    MoreVertical,
    PlayCircle,
    PauseCircle,
    XCircle,
    Copy,
    ArrowUpRight,
    Gavel as GavelIcon,
    Inbox,
    Eye,
    X
} from "lucide-react"

enum AuctionStatus {
    LIVE = "Live",
    UPCOMING = "Upcoming",
    PAUSED = "Paused",
    COMPLETED = "Completed"
}

interface AdminAuction {
    id: string
    title: string
    currentBid: number
    startingBid: number
    bidsCount: number
    status: AuctionStatus
    timeLeft: string
    highBidder: string
    thumbnail: string
    category: string
}

interface YardVehicle {
    id: string
    plateNumber: string
    plateCode: string
    make: string
    model: string
    year: number
    daysInYard: number
    status: string
    ownerNotified: boolean
    policeCleared: boolean
    vin: string
    color: string
    reason: string
    estValue: number
    image: string
}

export default function ActiveAuctionsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [auctions, setAuctions] = useState<AdminAuction[]>([
        {
            id: "AUC-2024-991A",
            title: "2024 Mercedes-AMG G63",
            currentBid: 950000,
            startingBid: 800000,
            bidsCount: 45,
            status: AuctionStatus.LIVE,
            timeLeft: "04:22:15",
            highBidder: "usr_9921",
            thumbnail: "https://images.unsplash.com/photo-1520031441872-265149aea166?q=80&w=200&auto=format&fit=crop",
            category: "Motors"
        },
        {
            id: "AUC-2024-882B",
            title: "License Plate '7'",
            currentBid: 2400000,
            startingBid: 1000000,
            bidsCount: 112,
            status: AuctionStatus.LIVE,
            timeLeft: "01:05:00",
            highBidder: "usr_7721",
            thumbnail: "https://images.unsplash.com/photo-1596724361530-b9cc01a3577d?q=80&w=200&auto=format&fit=crop",
            category: "Plates"
        },
        {
            id: "AUC-2024-110C",
            title: "Rolex Daytona Platinum",
            currentBid: 320000,
            startingBid: 250000,
            bidsCount: 18,
            status: AuctionStatus.UPCOMING,
            timeLeft: "2 Days",
            highBidder: "-",
            thumbnail: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=200&auto=format&fit=crop",
            category: "Watches"
        },
        {
            id: "AUC-2024-554D",
            title: "2023 Porsche 911 GT3 RS",
            currentBid: 1100000,
            startingBid: 950000,
            bidsCount: 32,
            status: AuctionStatus.PAUSED,
            timeLeft: "Paused",
            highBidder: "usr_8819",
            thumbnail: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=200&auto=format&fit=crop",
            category: "Motors"
        }
    ])

    const [yardPipeline, setYardPipeline] = useState<YardVehicle[]>([])
    const [selectedVehicle, setSelectedVehicle] = useState<YardVehicle | null>(null)

    // Load transferred vehicles on mount and listen to storage events
    const loadPipeline = () => {
        const stored = localStorage.getItem("safeyard_transferred_vehicles")
        if (stored) {
            setYardPipeline(JSON.parse(stored) as YardVehicle[])
        }
    }

    useEffect(() => {
        loadPipeline()
        window.addEventListener("storage", loadPipeline)
        window.addEventListener("safeyard_transferred_update", loadPipeline)
        return () => {
            window.removeEventListener("storage", loadPipeline)
            window.removeEventListener("safeyard_transferred_update", loadPipeline)
        }
    }, [])

    const activateAuction = (vehicle: YardVehicle) => {
        // Create new auction item
        const newAuc: AdminAuction = {
            id: `AUC-YARD-${vehicle.id}`,
            title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            currentBid: vehicle.estValue * 0.6, // Start at 60% of estimated valuation
            startingBid: vehicle.estValue * 0.6,
            bidsCount: 0,
            status: AuctionStatus.LIVE,
            timeLeft: "23:59:59",
            highBidder: "-",
            thumbnail: vehicle.image,
            category: "Motors"
        }

        // Add to active list
        setAuctions(prev => [newAuc, ...prev])

        // Remove from local pipeline storage
        const updatedPipeline = yardPipeline.filter(p => p.id !== vehicle.id)
        setYardPipeline(updatedPipeline)
        localStorage.setItem("safeyard_transferred_vehicles", JSON.stringify(updatedPipeline))
    }

    const filteredAuctions = auctions.filter(a => {
        const term = searchQuery.toLowerCase()
        return (
            a.title.toLowerCase().includes(term) ||
            a.id.toLowerCase().includes(term) ||
            a.category.toLowerCase().includes(term)
        )
    })

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 p-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-3">
                        <GavelIcon className="w-8 h-8 text-red-500" />
                        Auction Management Center
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        Monitor and control ongoing bidding events in real time.
                    </p>
                </div>
            </div>

            {/* SafeYard Pipeline Receiver Panel */}
            <div className="bg-slate-900 border border-red-900/20 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4 opacity-10">
                    <Inbox className="w-32 h-32 text-red-500" />
                </div>
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                <Inbox className="w-6 h-6 text-red-500" />
                                SafeYard Transfer Pipeline Receiver
                            </h2>
                            <p className="text-xs font-bold text-slate-400">
                                Real-time webhook queue receiving impounded assets with cleared retention limits from SafeYard.
                            </p>
                        </div>
                        <span className="bg-red-500 text-white font-black text-[10px] px-3 py-1 rounded-full animate-pulse uppercase tracking-wider">
                            {yardPipeline.length} Pending Approval
                        </span>
                    </div>

                    {yardPipeline.length === 0 ? (
                        <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-white/10">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">No vehicles currently queued in pipeline</p>
                            <p className="text-[10px] text-slate-600 mt-1">Go to the SafeYard supervisor portal and push vehicles to this dashboard.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {yardPipeline.map((vehicle) => (
                                <div key={vehicle.id} className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-white/10 transition-all">
                                    <div className="flex gap-4">
                                        <img src={vehicle.image} alt={vehicle.model} className="w-20 h-20 rounded-xl object-cover" />
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                                                {vehicle.year} {vehicle.make}
                                                <button
                                                    onClick={() => setSelectedVehicle(vehicle)}
                                                    className="p-0.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </h4>
                                            <p className="text-[10px] font-bold text-blue-400 uppercase">Plate: {vehicle.plateCode} - {vehicle.plateNumber}</p>
                                            <p className="text-[10px] font-bold text-green-400">Valuation: AED {vehicle.estValue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => activateAuction(vehicle)}
                                            className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-wider transition-all active:scale-95 border-none cursor-pointer"
                                        >
                                            Launch Active Auction
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="w-full md:max-w-md relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by lot ID, title, or user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-2.5 w-full text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20 transition-all font-medium text-slate-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Auctions Table Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                                <th className="px-6 py-4">Lot ID</th>
                                <th className="px-6 py-4">Asset Details</th>
                                <th className="px-6 py-4 text-right">Current Bid</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Time Left</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredAuctions.map((auction) => (
                                <tr key={auction.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{auction.id}</span>
                                            <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity border-none bg-transparent">
                                                <Copy className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <img src={auction.thumbnail} alt={auction.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-white/10" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{auction.title}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{auction.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right border-b border-slate-100 dark:border-white/5">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">AED {auction.currentBid.toLocaleString()}</span>
                                            <span className="text-[10px] text-slate-500 font-bold mt-1">
                                                {auction.bidsCount} bids • High: <span className="text-red-500">{auction.highBidder}</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-center border-b border-slate-100 dark:border-white/5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            auction.status === AuctionStatus.LIVE ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 border-green-200 dark:border-green-500/20' :
                                            auction.status === AuctionStatus.PAUSED ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/20' :
                                            auction.status === AuctionStatus.UPCOMING ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' :
                                            'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                                        }`}>
                                            {auction.status === AuctionStatus.LIVE && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                                            {auction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right border-b border-slate-100 dark:border-white/5">
                                        <span className={`text-sm font-black tabular-nums ${auction.timeLeft.includes(':') ? 'text-red-500' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {auction.timeLeft}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center justify-center gap-2">
                                            {auction.status === AuctionStatus.LIVE && (
                                                <button className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-colors border-none bg-transparent cursor-pointer" title="Pause Auction">
                                                    <PauseCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {auction.status === AuctionStatus.PAUSED && (
                                                <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-colors border-none bg-transparent cursor-pointer" title="Resume Auction">
                                                    <PlayCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border-none bg-transparent cursor-pointer" title="Cancel Auction">
                                                <XCircle className="w-4 h-4" />
                                            </button>
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
        </div>
    )
}
