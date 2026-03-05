"use client"

import { Button } from "@/components/ui/button"
import { Clock, Heart, Share2, ShieldCheck, Zap, ArrowRight, LineChart as ChartIcon, X, CheckCircle, Gavel, Wallet } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { AuthModal } from "@/components/auth/AuthModal"

const data = [
    { time: '10:00', bid: 850000 },
    { time: '11:00', bid: 865000 },
    { time: '12:00', bid: 880000 },
    { time: '13:00', bid: 890000 },
    { time: '14:00', bid: 920000 },
    { time: '15:00', bid: 950000 },
]

// Suppress Recharts warning about defaultProps in development
const originalConsoleError = console.error;
console.error = (...args) => {
    if (typeof args[0] === 'string' && /defaultProps/.test(args[0])) {
        return;
    }
    originalConsoleError(...args);
};

const images = [
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2670&auto=format&fit=crop", // Front 3/4 (G-Wagon)
    "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop", // Side Profile (Dark SUV)
    "https://images.unsplash.com/photo-1553440638-dffe3a137aa8?q=80&w=2670&auto=format&fit=crop", // Interior (Luxury)
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2664&auto=format&fit=crop", // Wheel Detail
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop", // Side/Rear (White Sport)
    "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2670&auto=format&fit=crop", // Dashboard
]

export default function AuctionDetailPage() {
    const [activeImage, setActiveImage] = useState(0)

    // Action Modals
    const [isBidOpen, setIsBidOpen] = useState(false)
    const [isBuyNowOpen, setIsBuyNowOpen] = useState(false)

    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [authTab, setAuthTab] = useState<"login" | "signup">("login")
    const [pendingAction, setPendingAction] = useState<"bid" | "buy" | null>(null)

    const [bidAmount, setBidAmount] = useState(960000)
    const [showSuccess, setShowSuccess] = useState(false)

    // Handlers
    const handleAction = (action: "bid" | "buy") => {
        if (!isLoggedIn) {
            setAuthTab("login")
            setPendingAction(action)
            setIsAuthModalOpen(true)
        } else {
            if (action === "bid") setIsBidOpen(true)
            if (action === "buy") setIsBuyNowOpen(true)
        }
    }

    const handleAuthComplete = () => {
        setIsLoggedIn(true)
        setIsAuthModalOpen(false)

        // Resume pending action
        if (pendingAction === "bid") setIsBidOpen(true)
        if (pendingAction === "buy") setIsBuyNowOpen(true)
        setPendingAction(null)
    }

    const handleBidSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsBidOpen(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const handleBuyNowSubmit = () => {
        setIsBuyNowOpen(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 relative">
            {/* Global Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => handleAuthComplete()} // For demo, closing/submitting logs you in
                defaultTab={authTab}
            />

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold text-lg">Action Successful!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals Overlay */}
            <AnimatePresence>
                {(isBidOpen || isBuyNowOpen) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => { setIsBidOpen(false); setIsBuyNowOpen(false) }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden"
                        >
                            <button onClick={() => { setIsBidOpen(false); setIsBuyNowOpen(false) }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                                <X className="w-6 h-6" />
                            </button>

                            {isBidOpen && (
                                <form onSubmit={handleBidSubmit}>
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-900 dark:text-white">
                                        <Gavel className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Place Your Bid</h2>
                                    <p className="text-slate-500 mb-6">Current Highest: <span className="font-bold text-slate-900 dark:text-white">AED 950,000</span></p>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Your Max Bid (AED)</label>
                                            <input
                                                type="number"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(Number(e.target.value))}
                                                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-lg font-bold"
                                            />
                                            <p className="text-xs text-slate-400 mt-2 ml-1">Minimum bid increment: AED 5,000</p>
                                        </div>
                                        <Button size="lg" className="w-full h-12 rounded-xl text-lg mt-4 cursor-pointer">Confirm Bid</Button>
                                    </div>
                                </form>
                            )}

                            {isBuyNowOpen && (
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                        <Wallet className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Buy It Now</h2>
                                    <p className="text-slate-500 mb-6">You are about to purchase this vehicle for:</p>

                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl mb-8 text-center border border-slate-100 dark:border-slate-700">
                                        <span className="text-3xl font-bold text-slate-900 dark:text-white">AED 1,200,000</span>
                                        <p className="text-sm text-slate-400 mt-1">+ 5% Buyers Premium</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" size="lg" className="rounded-xl h-12 cursor-pointer" onClick={() => setIsBuyNowOpen(false)}>Cancel</Button>
                                        <Button size="lg" className="rounded-xl h-12 bg-emerald-600 hover:bg-emerald-700 text-white border-0 cursor-pointer" onClick={handleBuyNowSubmit}>Confirm Purchase</Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 relative group shadow-2xl border border-white/10"
                    >
                        <img
                            src={images[activeImage]}
                            alt="Mercedes G63"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors border border-white/20 cursor-pointer">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors border border-white/20 cursor-pointer">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-6 gap-3">
                        {images.map((img, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveImage(i)}
                                className={cn(
                                    "aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer transition-all border-2",
                                    activeImage === i ? "border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-slate-950" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Info & Bidding */}
                <div className="space-y-8 flex flex-col justify-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                Premium Lot
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                                <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">2024 Mercedes-AMG G63</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Grand Edition • 1 of 1000 • 0km Mileage</p>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                        {/* Gradient Glow */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

                        <div className="flex flex-col sm:flex-row justify-between items-end mb-8 relative z-10 gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-widest">Current Bid</p>
                                <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">AED 950,000</div>
                            </div>
                            <div className="text-left sm:text-right bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-2 text-orange-600 font-bold mb-1">
                                    <Clock className="w-4 h-4 animate-pulse" />
                                    <span className="font-mono">4h 20m 15s</span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium">Ends Today, 6:00 PM</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6 relative z-10">
                            <Button size="lg" onClick={() => handleAction("bid")} className="w-full text-lg h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.01] cursor-pointer">
                                Place Bid <span className="opacity-70 ml-2 font-normal text-sm">(Min AED 960,000)</span>
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => handleAction("buy")} className="w-full h-12 rounded-2xl border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-medium cursor-pointer">
                                Buy It Now <span className="text-slate-400 ml-2">AED 1,200,000</span>
                            </Button>
                        </div>

                        <p className="text-center text-xs text-slate-400 relative z-10">
                            *All bids are legally binding. 5% deposit required.
                        </p>
                    </div>

                    {/* AI Insights Box */}
                    <div className="p-6 rounded-[2rem] bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                                <Zap className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-2">
                                    AI Market Insight
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-200/50 dark:bg-indigo-500/20 text-[10px] uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-300">Beta</span>
                                </h3>
                                <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed max-w-md">
                                    This lot is currently <span className="font-bold text-indigo-700 dark:text-white decoration-2 underline decoration-indigo-400/50">undervalued by 8%</span> compared to similar G63 Grand Edition models. Demand is <span className="font-bold text-green-600 dark:text-green-400">High</span>, with prices trending upwards (+5%).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats & Graph */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    <ChartIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bidding History</h3>
                            </div>
                            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium px-3 py-2 text-slate-600 dark:text-slate-300 outline-none cursor-pointer">
                                <option>Last 24 Hours</option>
                                <option>All Time</option>
                            </select>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                                    <XAxis
                                        dataKey="time"
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)' }}
                                        itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        formatter={(value: any) => [`AED ${Number(value || 0).toLocaleString()}`, 'Bid Amount']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="bid"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorBid)"

                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    {/* Specs Grid */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-xl">Specifications</h3>
                        <div className="space-y-0">
                            {[
                                { label: 'Engine', value: '4.0L V8 Biturbo' },
                                { label: 'Power', value: '577 HP' },
                                { label: 'Transmission', value: '9-Speed Auto' },
                                { label: '0-100 km/h', value: '4.5s' },
                                { label: 'Color', value: 'Night Black Magno' },
                                { label: 'Interior', value: 'Bengal Red / Black' },
                                { label: 'VIN', value: 'W1N463***291' }
                            ].map((spec, i) => (
                                <div key={spec.label} className="flex justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 group hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-4 px-4 transition-colors">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white text-right">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-slate-500 hover:text-slate-900 cursor-pointer">
                            View Full Specs <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
