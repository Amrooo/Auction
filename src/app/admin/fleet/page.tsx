"use client"

import { useState } from "react"
import {
    Car,
    Search,
    Filter,
    MapPin,
    AlertCircle,
    CheckCircle2,
    Clock,
    MoreVertical,
    BarChart3,
    ArrowUpRight,
    Gavel as GavelIcon
} from "lucide-react"

enum VehicleStatus {
    AVAILABLE = "Available",
    IN_AUCTION = "In Auction",
    SOLD = "Sold",
    MAINTENANCE = "Maintenance",
    IN_TRANSIT = "In Transit"
}

interface FleetVehicle {
    id: string
    vin: string
    make: string
    model: string
    year: number
    status: VehicleStatus
    location: string
    condition: string
    estValue: number
    image: string
}

const mockFleet: FleetVehicle[] = [
    {
        id: "V-9910",
        vin: "WBA738291048XK1",
        make: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2024,
        status: VehicleStatus.IN_AUCTION,
        location: "Dubai Hub (Zone A)",
        condition: "A - Excellent",
        estValue: 920000,
        image: "https://images.unsplash.com/photo-1520031441872-265149aea166?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "V-9911",
        vin: "WP0AA2991NS1038",
        make: "Porsche",
        model: "911 GT3",
        year: 2023,
        status: VehicleStatus.AVAILABLE,
        location: "Abu Dhabi Facility",
        condition: "A - Excellent",
        estValue: 850000,
        image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "V-9912",
        vin: "JTMBH34F89N0291",
        make: "Toyota",
        model: "Land Cruiser",
        year: 2022,
        status: VehicleStatus.MAINTENANCE,
        location: "Service Center 1",
        condition: "C - Requires Repair",
        estValue: 240000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=200&auto=format&fit=crop"
    },
    {
        id: "V-9913",
        vin: "1G1YC2D46L51034",
        make: "Chevrolet",
        model: "Corvette Z06",
        year: 2023,
        status: VehicleStatus.IN_TRANSIT,
        location: "Transit to Dxb",
        condition: "B - Good",
        estValue: 450000,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=200&auto=format&fit=crop"
    }
]

export default function VehicleFleetPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight flex items-center gap-3">
                        <Car className="w-8 h-8 text-indigo-500" />
                        Vehicle Fleet Management
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Track, appraise, and manage the complete motor inventory.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px] shadow-sm hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer">
                        <BarChart3 className="w-4 h-4" /> Generate Report
                    </button>
                    <button className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all cursor-pointer">
                        + Add Vehicle
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Fleet', value: '4,102', num: '+12', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    { label: 'Available for Auction', value: '1,245', num: '+45', color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'In Maintenance', value: '86', num: '-3', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { label: 'Est. Total Value', value: 'AED 84.2M', num: '+1.2%', color: 'text-accent', bg: 'bg-accent/10' },
                ].map((stat, i) => (
                    <div key={i} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 transition-all shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</h3>
                            <div className={`px-2 py-0.5 rounded-md text-[10px] font-black ${stat.bg} ${stat.color} flex items-center gap-0.5`}>
                                <ArrowUpRight className="w-3 h-3" /> {stat.num}
                            </div>
                        </div>
                        <p className="text-3xl font-black text-slate-900 dark:text-white mt-4 tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
                <div className="w-full md:max-w-md relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by VIN, make, model, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-4 py-2.5 w-full text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all font-medium text-slate-900 dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                    <select className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold text-xs outline-none cursor-pointer">
                        <option>Location: All Locations</option>
                        <option>Location: Dubai Hub (Zone A)</option>
                        <option>Location: Abu Dhabi Facility</option>
                    </select>
                </div>
            </div>

            {/* Fleet Grid / Table View Placeholder */}
            {/* The exact same premium, clean table structure utilized in active auctions goes here */}
            {/* You can imagine a similar table or grid using `mockFleet` */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">
                                <th className="px-6 py-4">Vehicle ID & Make</th>
                                <th className="px-6 py-4">Inventory Info</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Est. Value</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {mockFleet.map((vehicle) => (
                                <tr key={vehicle.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <img src={vehicle.image} alt={vehicle.model} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-white/10" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                                                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md tracking-wider">
                                                        {vehicle.id}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">VIN: {vehicle.vin}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {vehicle.location}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                Condition: <span className="text-slate-900 dark:text-white">{vehicle.condition}</span>
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 align-middle text-center border-b border-slate-100 dark:border-white/5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${vehicle.status === VehicleStatus.AVAILABLE ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500 border-green-200 dark:border-green-500/20' :
                                            vehicle.status === VehicleStatus.MAINTENANCE ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-200 dark:border-amber-500/20' :
                                                vehicle.status === VehicleStatus.IN_AUCTION ? 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20' :
                                                    vehicle.status === VehicleStatus.SOLD ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20' :
                                                        'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                                            }`}>
                                            {vehicle.status === VehicleStatus.AVAILABLE && <CheckCircle2 className="w-3 h-3" />}
                                            {vehicle.status === VehicleStatus.MAINTENANCE && <AlertCircle className="w-3 h-3" />}
                                            {vehicle.status === VehicleStatus.IN_TRANSIT && <Clock className="w-3 h-3" />}
                                            {vehicle.status === VehicleStatus.IN_AUCTION && <GavelIcon className="w-3 h-3" />}
                                            {vehicle.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 align-middle text-right border-b border-slate-100 dark:border-white/5">
                                        <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                                            AED {vehicle.estValue.toLocaleString()}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 align-middle border-b border-slate-100 dark:border-white/5">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="text-xs font-bold text-indigo-500 hover:text-indigo-600 uppercase tracking-widest transition-colors py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl">
                                                Manage
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
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing 1-4 of 4,102</span>
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
