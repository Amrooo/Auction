"use client"

import { Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { AuctionCard } from "@/components/auction/AuctionCard"
import { MotorFilters } from "@/components/motors/Filters"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import { Car } from "lucide-react"
import { formatTimeRemaining, toArabicNumerals } from "@/lib/utils"

export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Auctions...</p>
            </div>
        }>
            <CategoryContent />
        </Suspense>
    )
}

function CategoryContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const categoryName = ((params?.name as string) || "motors").toLowerCase()

    const { t, language } = useLanguage()
    const isAr = language === 'ar'

    // Filter states
    const [selectedSource, setSelectedSource] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [selectedMakes, setSelectedMakes] = useState<string[]>([])
    const [minPrice, setMinPrice] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<string>("")
    const [selectedCondition, setSelectedCondition] = useState<string>("all")
    const [useAI, setUseAI] = useState<boolean>(false)
    const [sortBy, setSortBy] = useState<string>("recommended")

    // Sync from URL search params on mount or change
    useEffect(() => {
        const src = searchParams.get('source')
        if (src) setSelectedSource(src)
        const q = searchParams.get('search')
        if (q) setSearchQuery(q)
        const make = searchParams.get('make')
        if (make) setSelectedMakes([make])
    }, [searchParams])

    const [liveVehicles, setLiveVehicles] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Load dynamic vehicles from Web Service API
    useEffect(() => {
        const fetchVehicles = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`/api/vehicles?status=live&category=${categoryName}`)
                if (res.ok) {
                    const json = await res.json()
                    if (json.success && Array.isArray(json.data)) {
                        setLiveVehicles(json.data)
                    }
                }
            } catch (err) {
                console.error("Error fetching live vehicles:", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchVehicles()
    }, [categoryName])

    // Toggle make in filter
    const handleMakeToggle = (make: string) => {
        if (selectedMakes.includes(make)) {
            setSelectedMakes(selectedMakes.filter(m => m !== make))
        } else {
            setSelectedMakes([...selectedMakes, make])
        }
    }

    const resetFilters = () => {
        setSelectedSource("all")
        setSearchQuery("")
        setSelectedMakes([])
        setMinPrice("")
        setMaxPrice("")
        setSelectedCondition("all")
        setUseAI(false)
        setSortBy("recommended")
    }

    // Filter and sort the vehicles
    const filteredAuctions = useMemo(() => {
        let list = [...liveVehicles]

        // 1. Source Entity
        if (selectedSource !== 'all') {
            list = list.filter(item => item.sourceEntity?.id === selectedSource)
        }

        // 2. Keyword Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            list = list.filter(item => 
                (item.title && item.title.toLowerCase().includes(q)) ||
                (item.titleAr && item.titleAr.includes(q)) ||
                (item.make && item.make.toLowerCase().includes(q)) ||
                (item.model && item.model.toLowerCase().includes(q)) ||
                (item.lotNumber && item.lotNumber.toLowerCase().includes(q))
            )
        }

        // 3. Make filter
        if (selectedMakes.length > 0) {
            list = list.filter(item => selectedMakes.some(m => item.make?.toLowerCase().includes(m.toLowerCase())))
        }

        // 4. Price range
        if (minPrice && !isNaN(Number(minPrice))) {
            list = list.filter(item => Number(item.currentBid) >= Number(minPrice))
        }
        if (maxPrice && !isNaN(Number(maxPrice))) {
            list = list.filter(item => Number(item.currentBid) <= Number(maxPrice))
        }

        // 5. Condition
        if (selectedCondition !== 'all') {
            list = list.filter(item => {
                const notes = (item.notes || '').toLowerCase()
                const body = (item.bodyType || '').toLowerCase()
                if (selectedCondition === 'New') return item.mileageKm === 0
                if (selectedCondition === 'Used') return item.mileageKm > 0
                if (selectedCondition === 'Salvage') return notes.includes('salvage') || notes.includes('scrap')
                return true
            })
        }

        // 6. Smart Match AI boost
        if (useAI) {
            list = list.filter(item => !!item.aiInsight)
        }

        // 7. Sort
        if (sortBy === 'ending_soon') {
            list.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        } else if (sortBy === 'price_low') {
            list.sort((a, b) => Number(a.currentBid) - Number(b.currentBid))
        } else if (sortBy === 'price_high') {
            list.sort((a, b) => Number(b.currentBid) - Number(a.currentBid))
        } else if (sortBy === 'bids_count') {
            list.sort((a, b) => Number(b.bidsCount || 0) - Number(a.bidsCount || 0))
        }

        return list
    }, [liveVehicles, selectedSource, searchQuery, selectedMakes, minPrice, maxPrice, selectedCondition, useAI, sortBy])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className={`flex flex-col lg:flex-row gap-8 ${isAr ? 'lg:flex-row-reverse' : ''}`}>
                {/* Sidebar Filters */}
                {categoryName === 'motors' && (
                    <aside className="w-full lg:w-80 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24"
                        >
                            <MotorFilters
                                selectedSource={selectedSource}
                                onSourceChange={setSelectedSource}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                selectedMakes={selectedMakes}
                                onMakeToggle={handleMakeToggle}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                onMinPriceChange={setMinPrice}
                                onMaxPriceChange={setMaxPrice}
                                selectedCondition={selectedCondition}
                                onConditionChange={setSelectedCondition}
                                useAI={useAI}
                                onToggleAI={() => setUseAI(!useAI)}
                                onResetFilters={resetFilters}
                            />
                        </motion.div>
                    </aside>
                )}

                {/* Main Content */}
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
                                {isAr ? `${toArabicNumerals(filteredAuctions.length)} عرض متاح` : `${filteredAuctions.length} listings available`} 
                                {selectedSource !== 'all' ? ` (${selectedSource})` : ''}
                            </p>
                        </div>

                        <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold whitespace-nowrap">{t("Sort by")}:</span>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white dark:bg-slate-900 text-xs sm:text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 cursor-pointer outline-none tracking-tight shadow-2xs"
                            >
                                <option value="recommended">{t("AI Recommended")}</option>
                                <option value="ending_soon">{t("Ending Soon")}</option>
                                <option value="price_low">{t("Price: Low to High")}</option>
                                <option value="price_high">{isAr ? 'السعر: من الأعلى للأدنى' : 'Price: High to Low'}</option>
                                <option value="bids_count">{isAr ? 'الأكثر مزايدة' : 'Most Active Bids'}</option>
                            </select>
                        </div>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="aspect-[4/3] rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredAuctions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
                            {filteredAuctions.map((v) => (
                                <AuctionCard 
                                    key={v.id}
                                    id={v.id}
                                    title={v.title}
                                    titleAr={v.titleAr}
                                    image={v.thumbnail || v.images?.[0] || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop"}
                                    currentBid={v.currentBid}
                                    endTime={formatTimeRemaining(v.endDate, isAr)}
                                    aiInsight={v.aiInsight?.badge}
                                    bids={v.bidsCount || 0}
                                    sourceEntity={v.sourceEntity}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm my-8">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
                                <Car className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {isAr ? 'لا توجد مزادات مطابقة للفلاتر المحددة' : 'No auctions match the selected filters'}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                                {isAr ? 'حاول تغيير معايير البحث أو استعراض كافة المركبات المتاحة.' : 'Try adjusting your search criteria or resetting filters to see all lots.'}
                            </p>
                            <Button
                                onClick={resetFilters}
                                className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold px-6 cursor-pointer"
                            >
                                {isAr ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
