"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, SlidersHorizontal, Search, Building2, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export const filterEntities = [
    {
        id: "all",
        name: "All Entities",
        arabicName: "جميع الجهات",
        logo: null
    },
    {
        id: "abu-dhabi-mobility",
        name: "Abu Dhabi Mobility",
        arabicName: "أبوظبي للتنقل",
        logo: "/images/abu-dhabi-mobility.png"
    },
    {
        id: "dmt",
        name: "Dept. of Municipalities & Transport",
        arabicName: "دائرة البلديات والنقل",
        logo: "/images/dmt-logo.png"
    },
    {
        id: "dubai-police",
        name: "Dubai Police",
        arabicName: "شرطة دبي",
        logo: "/images/dubai-police.png"
    },
    {
        id: "abu-dhabi-police",
        name: "Abu Dhabi Police",
        arabicName: "شرطة أبوظبي",
        logo: "/images/abu-dhabi-police-transparent.png"
    },
    {
        id: "dubai-customs",
        name: "Dubai Customs",
        arabicName: "جمارك دبي",
        logo: "/images/dubai-customs.png"
    },
    {
        id: "saaed",
        name: "Saaed Traffic Systems",
        arabicName: "شركة ساعد",
        logo: "/images/saaed-logo.png"
    }
]

interface MotorFiltersProps {
    selectedSource?: string
    onSourceChange?: (sourceId: string) => void
    onResetFilters?: () => void
}

export function MotorFilters({
    selectedSource = "all",
    onSourceChange,
    onResetFilters
}: MotorFiltersProps) {
    const [useAI, setUseAI] = useState(false)
    const [activeSource, setActiveSource] = useState(selectedSource)
    const { t, language } = useLanguage()
    const isAr = language === 'ar'

    const handleSelectSource = (id: string) => {
        setActiveSource(id)
        if (onSourceChange) {
            onSourceChange(id)
        }
    }

    return (
        <div className="space-y-7">
            {/* AI Toggle */}
            <div
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${useAI ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'}`}
                onClick={() => setUseAI(!useAI)}
            >
                <div className={`flex items-center justify-between mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                        <Sparkles className={`w-4 h-4 ${useAI ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                        {t("Smart Match")}
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-colors relative ${useAI ? 'bg-red-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <div className={`absolute top-1 ${isAr ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${useAI ? (isAr ? '-translate-x-4' : 'translate-x-4') : ''}`} />
                    </div>
                </div>
                <p className={`text-xs text-slate-500 dark:text-slate-400 font-medium ${isAr ? 'text-right' : 'text-left'}`}>
                    {t("Smart Match Description")}
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className={`absolute top-3.5 w-4 h-4 text-slate-400 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
                <input
                    type="text"
                    placeholder={t("Search make, model...")}
                    className={`w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium ${isAr ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
                />
            </div>

            {/* Source Entity Filter */}
            <div className="space-y-3 pt-2">
                <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <Building2 className="w-4 h-4 text-red-600" />
                        {t("Source Entity")}
                    </h3>
                    {activeSource !== 'all' && (
                        <button
                            onClick={() => handleSelectSource('all')}
                            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                        >
                            {isAr ? 'إعادة ضبط' : 'Reset'}
                        </button>
                    )}
                </div>

                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                    {filterEntities.map((entity) => {
                        const isSelected = activeSource === entity.id
                        return (
                            <button
                                key={entity.id}
                                onClick={() => handleSelectSource(entity.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-left",
                                    isAr && "flex-row-reverse text-right",
                                    isSelected
                                        ? "bg-red-50/80 dark:bg-red-950/30 border-red-500/80 text-red-700 dark:text-red-300 font-bold shadow-xs"
                                        : "bg-white dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                                )}
                            >
                                <div className={`flex items-center gap-2.5 min-w-0 ${isAr ? 'flex-row-reverse' : ''}`}>
                                    {entity.logo ? (
                                        <div className="w-6 h-6 rounded-lg bg-white p-0.5 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs overflow-hidden">
                                            <img
                                                src={entity.logo}
                                                alt={entity.name}
                                                className="w-full h-full object-contain"
                                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-300 shrink-0">
                                            ALL
                                        </div>
                                    )}
                                    <span className="text-xs truncate">
                                        {isAr ? entity.arabicName : entity.name}
                                    </span>
                                </div>

                                {isSelected && (
                                    <div className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Other Filters */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className={`font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                    <SlidersHorizontal className="w-4 h-4" /> {t("Filters")}
                </h3>

                <div className="space-y-2.5">
                    <label className={`text-xs font-bold text-slate-700 dark:text-slate-300 block ${isAr ? 'text-right' : 'text-left'}`}>{t("Make")}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Toyota', 'Nissan', 'Porsche', 'BMW', 'Mercedes', 'Ferrari'].map(make => (
                            <label key={make} className={`flex items-center gap-2 px-3 py-2 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer bg-white dark:bg-slate-900 transition-colors ${isAr ? 'flex-row-reverse' : ''}`}>
                                <input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500 accent-red-600" />
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{make}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className={`text-xs font-bold text-slate-700 dark:text-slate-300 block ${isAr ? 'text-right' : 'text-left'}`}>{t("Price Range (AED)")}</label>
                    <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <input type="number" placeholder={t("Min")} className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white ${isAr ? 'text-right' : 'text-left'}`} />
                        <span className="text-slate-400 font-bold">-</span>
                        <input type="number" placeholder={t("Max")} className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white ${isAr ? 'text-right' : 'text-left'}`} />
                    </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className={`text-xs font-bold text-slate-700 dark:text-slate-300 block ${isAr ? 'text-right' : 'text-left'}`}>{t("Condition")}</label>
                    <div className={`flex flex-wrap gap-2 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                        {['New', 'Used', 'Salvage', 'Classic'].map(type => (
                            <button key={type} className="px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-colors cursor-pointer">
                                {t(type)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Button
                onClick={onResetFilters}
                className="w-full rounded-2xl bg-slate-900 py-6 text-white font-black text-sm dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
            >
                {t("Apply Filters")}
            </Button>
        </div>
    )
}
