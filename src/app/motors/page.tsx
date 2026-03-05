"use client"

import { MotorFilters } from "@/components/motors/Filters"
import { AuctionCard } from "@/components/auction/AuctionCard"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function MotorsPage() {
    const { t, language } = useLanguage()
    const cars = [
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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`flex flex-col lg:flex-row gap-8 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-80 shrink-0">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24">
                        <MotorFilters />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className={`flex items-center justify-between mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t("Motors Listings")}</h1>
                        <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{t("Sort by")}:</span>
                            <select className="bg-transparent text-sm font-medium text-slate-900 dark:text-white border-none focus:ring-0 cursor-pointer outline-none">
                                <option>{t("AI Recommended")}</option>
                                <option>{t("Ending Soon")}</option>
                                <option>{t("Price: Low to High")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <AuctionCard key={car.id} {...car} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                            {t("Load More")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
