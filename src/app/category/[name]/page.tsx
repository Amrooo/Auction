"use client"

import { useParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { AuctionCard } from "@/components/auction/AuctionCard"
import { MotorFilters } from "@/components/motors/Filters"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function CategoryPage() {
    const params = useParams()
    const { t, language } = useLanguage()
    const categoryName = (params.name as string).toLowerCase()

    // Mock data for motors (from original motors page)
    const motorsAuctions = [
        {
            id: "m1",
            title: "2024 Mercedes-AMG G63",
            image: "https://images.unsplash.com/photo-1520031441872-265149aea166?q=80&w=2574&auto=format&fit=crop",
            currentBid: 950000,
            endTime: "4h 20m",
            aiInsight: "Rare Spec",
            bids: 55
        },
        {
            id: "m2",
            title: "2022 Lamborghini Urus",
            image: "https://images.unsplash.com/photo-1621609764095-b22d11ad25ac?q=80&w=2592&auto=format&fit=crop",
            currentBid: 1100000,
            endTime: "1d 5h",
            bids: 32
        },
        {
            id: "m3",
            title: "2023 BMW M4 CSL",
            image: "https://images.unsplash.com/photo-1555215696-99ac45e75d74?q=80&w=2670&auto=format&fit=crop",
            currentBid: 550000,
            endTime: "6h 15m",
            aiInsight: "Best Value",
            bids: 89
        },
        {
            id: "m4",
            title: "Ferrari F8 Tributo",
            image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670&auto=format&fit=crop",
            currentBid: 1250000,
            endTime: "2d 12h",
            bids: 14
        },
        {
            id: "m5",
            title: "Nissan Patrol Nismo",
            image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
            currentBid: 320000,
            endTime: "1h 30m",
            bids: 67
        },
        {
            id: "m6",
            title: "Porsche Taycan Turbo S",
            image: "https://images.unsplash.com/photo-1611633235339-da9ca9b1f737?q=80&w=2574&auto=format&fit=crop",
            currentBid: 650000,
            endTime: "3d 4h",
            aiInsight: "Trending",
            bids: 28
        }
    ]

    // General mock data for other categories
    const generalAuctions = [
        {
            id: "g1",
            title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Item 1`,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop",
            currentBid: 5000,
            endTime: "2h 30m",
            bids: 15
        },
        // ... more general items could be added
    ]

    const auctions = categoryName === 'motors' ? motorsAuctions : generalAuctions

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`flex flex-col lg:flex-row gap-8 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                {/* Sidebar Filters - Only show for motors for now */}
                {categoryName === 'motors' && (
                    <aside className="w-full lg:w-80 shrink-0">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24"
                        >
                            <MotorFilters />
                        </motion.div>
                    </aside>
                )}

                {/* Main Content */}
                <div className="flex-1">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center justify-between mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white capitalize">
                            {categoryName} {t("Listings")}
                        </h1>
                        <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-bold">{t("Sort by")}:</span>
                            <select className="bg-transparent text-sm font-black text-slate-900 dark:text-white border-none focus:ring-0 cursor-pointer outline-none uppercase tracking-wider">
                                <option>{t("AI Recommended")}</option>
                                <option>{t("Ending Soon")}</option>
                                <option>{t("Price: Low to High")}</option>
                            </select>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {auctions.map((auction) => (
                            <AuctionCard key={auction.id} {...auction} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="rounded-2xl px-12 h-14 text-lg font-black border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-md active:scale-95">
                            {t("Load More")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
