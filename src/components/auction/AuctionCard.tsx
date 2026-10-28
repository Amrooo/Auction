"use client"

import Link from "next/link"
import { Heart, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { toArabicNumerals } from "@/lib/utils"
import { useState, useEffect } from "react"

export interface SourceEntity {
    id: string
    name: string
    arabicName?: string
    logo: string
}

interface AuctionCardProps {
    id: string
    title: string
    titleAr?: string
    image: string
    currentBid: number
    currency?: string
    endTime: string
    aiInsight?: string
    bids: number
    sourceEntity?: SourceEntity
}

export function AuctionCard({
    id,
    title,
    titleAr,
    image,
    currentBid,
    currency = "AED",
    endTime,
    aiInsight,
    bids,
    sourceEntity,
}: AuctionCardProps) {
    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const [isFavorited, setIsFavorited] = useState(false)

    useEffect(() => {
        try {
            const favs = JSON.parse(localStorage.getItem("user_favorites") || "[]")
            setIsFavorited(favs.includes(id))
        } catch {
            // ignore
        }
    }, [id])

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const favs = JSON.parse(localStorage.getItem("user_favorites") || "[]")
            let updated: string[]
            if (favs.includes(id)) {
                updated = favs.filter((item: string) => item !== id)
                setIsFavorited(false)
            } else {
                updated = [...favs, id]
                setIsFavorited(true)
            }
            localStorage.setItem("user_favorites", JSON.stringify(updated))
            window.dispatchEvent(new Event("favorites_changed"))
        } catch {
            setIsFavorited(!isFavorited)
        }
    }

    const displayTitle = isAr && titleAr ? titleAr : title

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 flex flex-col justify-between">
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                <Link href={`/auctions/${id}`} className="block w-full h-full">
                    <img
                        src={image}
                        alt={displayTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop"
                        }}
                    />
                </Link>

                {/* Source Entity Floating Badge */}
                {sourceEntity && (
                    <div className={`absolute top-3.5 ${isAr ? 'right-3.5 flex-row-reverse' : 'left-3.5'} z-20 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full shadow-md border border-slate-200/80 dark:border-slate-700/80 transition-transform group-hover:scale-105`}>
                        <div className="w-4.5 h-4.5 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0">
                            <img
                                src={sourceEntity.logo}
                                alt={sourceEntity.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                }}
                            />
                        </div>
                        <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 tracking-tight line-clamp-1 max-w-[125px]">
                            {isAr && sourceEntity.arabicName ? sourceEntity.arabicName : sourceEntity.name}
                        </span>
                    </div>
                )}

                <button
                    suppressHydrationWarning
                    type="button"
                    onClick={toggleFavorite}
                    aria-label="Add to wishlist"
                    className={`absolute top-3.5 ${isAr ? 'left-3.5' : 'right-3.5'} z-20 p-2.5 backdrop-blur-md rounded-full transition-all shadow-md border cursor-pointer ${isFavorited
                        ? 'bg-red-600 text-white border-red-600 shadow-red-600/30'
                        : 'bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-white hover:bg-white hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-500 border-white/40 dark:border-slate-700/40'
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                {aiInsight && (
                    <div className={`absolute bottom-3.5 ${isAr ? 'right-3.5' : 'left-3.5'} z-20 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/95 dark:bg-indigo-500/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xl pointer-events-none`}>
                        <TrendingUp className="w-3 h-3" />
                        {aiInsight}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-2 pt-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <Link href={`/auctions/${id}`} className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            <h3 className={`font-extrabold text-slate-900 dark:text-slate-100 line-clamp-1 text-lg tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
                                {displayTitle}
                            </h3>
                        </Link>
                    </div>

                    <div className={`grid grid-cols-2 gap-4 mb-5 ${isAr ? 'text-right' : ''}`}>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-muted-foreground mb-1">{t("Current Bid")}</p>
                            <p className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                                <span className="text-xs me-1 text-slate-600 dark:text-slate-500 transition-colors">
                                    {isAr ? 'درهم' : currency}
                                </span>
                                {isAr ? toArabicNumerals(currentBid.toLocaleString()) : currentBid.toLocaleString()}
                            </p>
                        </div>
                        <div className={isAr ? 'text-left' : 'text-right'}>
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-muted-foreground mb-1">{t("Ends In")}</p>
                            <div className={`flex items-center gap-1.5 text-orange-600 dark:text-orange-500 font-black ${isAr ? 'justify-start' : 'justify-end'}`}>
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{endTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="text-xs font-black text-slate-500 dark:text-slate-400">
                        {isAr ? `${toArabicNumerals(bids)} مزايدة` : `${bids} ${t("Bids")}`}
                    </div>
                    <Link href={`/auctions/${id}`} className="flex-1">
                        <Button size="lg" className="w-full rounded-2xl bg-red-600 hover:bg-red-700 text-white hover:text-white font-black transition-all shadow-md hover:shadow-red-600/20 active:scale-95 text-xs uppercase tracking-widest border-none cursor-pointer">
                            {t("Bid Now")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
