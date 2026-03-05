"use client"

import Link from "next/link"
import { Heart, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

interface AuctionCardProps {
    id: string
    title: string
    image: string
    currentBid: number
    currency?: string
    endTime: string
    aiInsight?: string
    bids: number
}

export function AuctionCard({
    id,
    title,
    image,
    currentBid,
    currency = "AED",
    endTime,
    aiInsight,
    bids,
}: AuctionCardProps) {
    const { t } = useLanguage()

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                <Link href={`/auctions/${id}`} className="block w-full h-full">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop"
                        }}
                    />
                </Link>

                <button suppressHydrationWarning className="absolute top-4 right-4 z-20 p-2.5 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-600 transition-all shadow-lg">
                    <Heart className="w-4 h-4" />
                </button>

                {aiInsight && (
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600/90 dark:bg-indigo-500/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xl pointer-events-none">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {aiInsight}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-2 pt-5">
                <div className="flex justify-between items-start mb-3">
                    <Link href={`/auctions/${id}`} className="group-hover:text-accent transition-colors">
                        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 line-clamp-1 text-lg tracking-tight">
                            {title}
                        </h3>
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-muted-foreground mb-1">{t("Current Bid")}</p>
                        <p className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                            <span className="text-xs me-1 text-slate-500">{currency}</span>
                            {currentBid.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-muted-foreground mb-1">{t("Ends In")}</p>
                        <div className="flex items-center justify-end gap-1.5 text-orange-600 dark:text-orange-500 font-black">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{endTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="text-xs font-bold text-slate-400">
                        {bids} {t("Bids")}
                    </div>
                    <Link href={`/auctions/${id}`} className="flex-1">
                        <Button size="lg" className="w-full rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-accent dark:hover:bg-accent dark:hover:text-white font-black transition-all shadow-lg hover:shadow-accent/20 active:scale-95 text-xs uppercase tracking-widest">
                            {t("Bid Now")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
