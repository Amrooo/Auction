"use client"

import { useState } from "react"
import {
    Search,
    Filter,
    MoreVertical,
    PlayCircle,
    PauseCircle,
    XCircle,
    Copy,
    ArrowUpRight,
    Gavel as GavelIcon
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

const mockAuctions: AdminAuction[] = [
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
]

export default function ActiveAuctionsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-3">
                        <GavelIcon className="w-8 h-8 text-indigo-500" />
                        Auction Management
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Monitor and control ongoing bidding events in real time.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all cursor-pointer">
                        + Create Auction
                    </button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="w-full md:max-w-md relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by lot ID, title, or user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-2.5 w-full text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-medium text-slate-900 dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" /> Filter Status
                    </button>
                    <select className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold text-xs outline-none cursor-pointer">
                        <option>Sort by: Ending Soonest</option>
                        <option>Sort by: Highest Bid</option>
                        <option>Sort by: Most Bids</option>
                    </select>
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
                            {mockAuctions.map((auction) => (
                                <tr key={auction.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{auction.id}</span>
                                            <button className="text-slate-400 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                                {auction.bidsCount} bids • High: <span className="text-indigo-500">{auction.highBidder}</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-center border-b border-slate-100 dark:border-white/5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${auction.status === AuctionStatus.LIVE ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 border-green-200 dark:border-green-500/20' :
                                            auction.status === AuctionStatus.PAUSED ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/20' :
                                                auction.status === AuctionStatus.UPCOMING ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20' :
                                                    'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                                            }`}>
                                            {auction.status === AuctionStatus.LIVE && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                                            {auction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle text-right border-b border-slate-100 dark:border-white/5">
                                        <span className={`text-sm font-black tabular-nums ${auction.timeLeft.includes(':') ? 'text-accent' : 'text-slate-600 dark:text-slate-400'
                                            }`}>
                                            {auction.timeLeft}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center justify-center gap-2">
                                            {auction.status === AuctionStatus.LIVE && (
                                                <button className="p-2 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-colors" title="Pause Auction">
                                                    <PauseCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            {auction.status === AuctionStatus.PAUSED && (
                                                <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-xl transition-colors" title="Resume Auction">
                                                    <PlayCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 text-accent hover:bg-accent/5 rounded-xl transition-colors" title="Cancel Auction">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-slate-950/20">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing 1-4 of 124</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed">PREV</button>
                        <button className="px-3 py-1.5 text-xs font-black text-slate-900 dark:text-white bg-white dark:bg-slate-800 rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">2</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">3</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors">NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    )
} 
