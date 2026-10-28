"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { AuctionCard, SourceEntity } from "@/components/auction/AuctionCard"
import { MotorFilters } from "@/components/motors/Filters"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import { Car } from "lucide-react"

export default function CategoryPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const initialSource = searchParams.get('source') || 'all'
    const [selectedSource, setSelectedSource] = useState<string>(initialSource)

    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const categoryName = (params.name as string).toLowerCase()

    const [liveVehicles, setLiveVehicles] = useState<Array<{
        id: string
        title: string
        titleAr?: string
        image: string
        currentBid: number
        endTime: string
        aiInsight?: string
        bids: number
        sourceEntity: SourceEntity
    }>>([])

    // Load dynamic vehicles from Web Service API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch(`/api/vehicles?status=live&category=${categoryName}`)
                if (res.ok) {
                    const json = await res.json()
                    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
                        const mapped = json.data.map((v: any) => ({
                            id: v.id,
                            title: isAr && v.titleAr ? v.titleAr : v.title,
                            image: v.thumbnail || v.images?.[0] || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop",
                            currentBid: v.currentBid,
                            endTime: "4h 20m",
                            aiInsight: v.aiInsight?.badge,
                            bids: v.bidsCount || 0,
                            sourceEntity: v.sourceEntity
                        }))
                        setLiveVehicles(mapped)
                    }
                }
            } catch (err) {
                console.error("Error fetching live vehicles:", err)
            }
        }
        fetchVehicles()
    }, [categoryName, isAr])

    const allAuctions = liveVehicles.length > 0 ? liveVehicles : (categoryName === 'motors' ? [
        {
            id: "m1",
            title: "2024 Mercedes-AMG G63",
            image: "https://images.unsplash.com/photo-1520031441872-265149aea166?q=80&w=2574&auto=format&fit=crop",
            currentBid: 950000,
            endTime: "4h 20m",
            aiInsight: "Rare Spec",
            bids: 55,
            sourceEntity: {
                id: "abu-dhabi-mobility",
                name: "Abu Dhabi Mobility",
                arabicName: "أبوظبي للتنقل",
                logo: "/images/abu-dhabi-mobility.png"
            }
        },
        {
            id: "m2",
            title: "2022 Lamborghini Urus",
            image: "https://images.unsplash.com/photo-1621609764095-b22d11ad25ac?q=80&w=2592&auto=format&fit=crop",
            currentBid: 1100000,
            endTime: "1d 5h",
            bids: 32,
            sourceEntity: {
                id: "dubai-police",
                name: "Dubai Police",
                arabicName: "شرطة دبي",
                logo: "/images/dubai-police.png"
            }
        },
        {
            id: "m3",
            title: "2023 BMW M4 CSL",
            image: "https://images.unsplash.com/photo-1555215696-99ac45e75d74?q=80&w=2670&auto=format&fit=crop",
            currentBid: 550000,
            endTime: "6h 15m",
            aiInsight: "Best Value",
            bids: 89,
            sourceEntity: {
                id: "abu-dhabi-police",
                name: "Abu Dhabi Police",
                arabicName: "شرطة أبوظبي",
                logo: "/images/abu-dhabi-police-transparent.png"
            }
        },
        {
            id: "m4",
            title: "Ferrari F8 Tributo",
            image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670&auto=format&fit=crop",
            currentBid: 1250000,
            endTime: "2d 12h",
            bids: 14,
            sourceEntity: {
                id: "dmt",
                name: "Dept. of Municipalities & Transport",
                arabicName: "دائرة البلديات والنقل",
                logo: "/images/dmt-logo.png"
            }
        },
        {
            id: "m5",
            title: "Nissan Patrol Nismo",
            image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
            currentBid: 320000,
            endTime: "1h 30m",
            bids: 67,
            sourceEntity: {
                id: "saaed",
                name: "Saaed Traffic Systems",
                arabicName: "شركة ساعد",
                logo: "/images/saaed-logo.png"
            }
        }
    ] : [
        {
            id: "g1",
            title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Item 1`,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop",
            currentBid: 5000,
            endTime: "2h 30m",
            bids: 15,
            sourceEntity: {
                id: "dmt",
                name: "Department of Municipalities and Transport",
                arabicName: "دائرة البلديات والنقل",
                logo: "/images/dmt-logo.png"
            }
        }
    ])

    const filteredAuctions = useMemo(() => {
        if (selectedSource === 'all') return allAuctions
        return allAuctions.filter(item => item.sourceEntity?.id === selectedSource)
    }, [allAuctions, selectedSource])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`flex flex-col lg:flex-row gap-8 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
                {/* Sidebar Filters - Left side menu */}
                {categoryName === 'motors' && (
                    <aside className="w-full lg:w-80 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24"
                        >
                            <MotorFilters
                                selectedSource={selectedSource}
                                onSourceChange={(sourceId) => setSelectedSource(sourceId)}
                                onResetFilters={() => setSelectedSource('all')}
                            />
                        </motion.div>
                    </aside>
                )}

                {/* Main Content - Vehicle Cards aligned left beside menu */}
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
                    >
                        <div className="text-start">
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white capitalize">
                                {isAr ? `مزادات ${t(categoryName === 'motors' ? 'Motors' : categoryName)}` : `${categoryName} ${t("Listings")}`}
                            </h1>
                            <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
                                {filteredAuctions.length} {t("listings")} {selectedSource !== 'all' ? `(${selectedSource})` : ''}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold whitespace-nowrap">{t("Sort by")}:</span>
                            <select className="bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:ring-0 cursor-pointer outline-none tracking-tight">
                                <option>{t("AI Recommended")}</option>
                                <option>{t("Ending Soon")}</option>
                                <option>{t("Price: Low to High")}</option>
                            </select>
                        </div>
                    </motion.div>

                    {filteredAuctions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
                            {filteredAuctions.map((auction) => (
                                <AuctionCard key={auction.id} {...auction} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm my-8">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
                                <Car className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {isAr ? 'لا توجد مركبات متطابقة حالياً' : 'No vehicles found for this entity'}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                                {isAr ? 'حاول تغيير عامل التصفية أو استعراض كافة الجهات المتاحة.' : 'Try selecting a different source entity or reset your filters.'}
                            </p>
                            <Button
                                onClick={() => setSelectedSource('all')}
                                className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold px-6 cursor-pointer"
                            >
                                {isAr ? 'عرض جميع الجهات' : 'Show All Entities'}
                            </Button>
                        </div>
                    )}

                    {filteredAuctions.length > 0 && (
                        <div className="mt-16 text-center">
                            <Button variant="outline" size="lg" className="rounded-2xl px-12 h-14 text-lg font-black border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer">
                                {t("Load More")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
