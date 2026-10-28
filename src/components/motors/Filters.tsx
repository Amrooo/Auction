"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, SlidersHorizontal, Search, Building2, Check, RotateCcw } from "lucide-react"
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
    searchQuery?: string
    onSearchChange?: (q: string) => void
    selectedMakes?: string[]
    onMakeToggle?: (make: string) => void
    minPrice?: string
    maxPrice?: string
    onMinPriceChange?: (v: string) => void
    onMaxPriceChange?: (v: string) => void
    selectedCondition?: string
    onConditionChange?: (c: string) => void
    useAI?: boolean
    onToggleAI?: () => void
    onResetFilters?: () => void
}

export function MotorFilters({
    selectedSource = "all",
    onSourceChange,
    searchQuery = "",
    onSearchChange,
    selectedMakes = [],
    onMakeToggle,
    minPrice = "",
    maxPrice = "",
    onMinPriceChange,
    onMaxPriceChange,
    selectedCondition = "all",
    onConditionChange,
    useAI = false,
    onToggleAI,
    onResetFilters
}: MotorFiltersProps) {
    const { t, language } = useLanguage()
    const isAr = language === 'ar'

    return (
        <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
            {/* AI Toggle */}
            <div
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${useAI ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'}`}
                onClick={onToggleAI}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                        <Sparkles className={`w-4 h-4 ${useAI ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                        <span>{t("Smart Match")}</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-colors relative ${useAI ? 'bg-red-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <div className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all",
                            isAr 
                                ? (useAI ? "right-5" : "right-1") 
                                : (useAI ? "left-5" : "left-1")
                        )} />
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium text-start">
                    {t("Smart Match Description")}
                </p>
            </div>

            {/* Live Search Input */}
            <div className="relative">
                <Search className={cn("absolute top-3.5 w-4 h-4 text-slate-400", isAr ? "right-3.5" : "left-3.5")} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder={t("Search make, model...")}
                    className={cn(
                        "w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium",
                        isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
                    )}
                />
            </div>

            {/* Source Entity Filter */}
            <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-red-600" />
                        <span>{t("Source Entity")}</span>
                    </h3>
                    {selectedSource !== 'all' && (
                        <button
                            onClick={() => onSourceChange?.('all')}
                            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                        >
                            {isAr ? 'إعادة ضبط' : 'Reset'}
                        </button>
                    )}
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {filterEntities.map((entity) => {
                        const isSelected = selectedSource === entity.id
                        return (
                            <button
                                key={entity.id}
                                type="button"
                                onClick={() => onSourceChange?.(entity.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-start",
                                    isSelected
                                        ? "bg-red-50/80 dark:bg-red-950/30 border-red-500/80 text-red-700 dark:text-red-300 font-bold shadow-xs"
                                        : "bg-white dark:bg-slate-900/60 border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-medium"
                                )}
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
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

            {/* Detailed Filters: Make, Price, Condition */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-red-600" /> 
                    <span>{t("Filters")}</span>
                </h3>

                {/* Make selector */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block text-start">{t("Make")}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Mercedes-Benz', 'Lamborghini', 'BMW', 'Ferrari', 'Nissan', 'Toyota'].map(make => {
                            const isChecked = selectedMakes.includes(make)
                            return (
                                <button
                                    key={make}
                                    type="button"
                                    onClick={() => onMakeToggle?.(make)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer transition-colors text-xs font-semibold text-start",
                                        isChecked 
                                            ? "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-600 dark:text-red-400 font-bold" 
                                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                                    )}
                                >
                                    <div className={cn("w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0", isChecked ? "bg-red-600 border-red-600 text-white" : "border-slate-300 dark:border-slate-600")}>
                                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                    <span className="truncate">{make}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block text-start">{t("Price Range (AED)")}</label>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            placeholder={t("Min")} 
                            value={minPrice}
                            onChange={(e) => onMinPriceChange?.(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white text-start" 
                        />
                        <span className="text-slate-400 font-bold">-</span>
                        <input 
                            type="number" 
                            placeholder={t("Max")} 
                            value={maxPrice}
                            onChange={(e) => onMaxPriceChange?.(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white text-start" 
                        />
                    </div>
                </div>

                {/* Condition */}
                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block text-start">{t("Condition")}</label>
                    <div className="flex flex-wrap gap-2">
                        {['all', 'New', 'Used', 'Salvage'].map(type => (
                            <button 
                                key={type} 
                                type="button"
                                onClick={() => onConditionChange?.(type)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer",
                                    selectedCondition === type
                                        ? "bg-red-600 text-white border-red-600"
                                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                {type === 'all' ? (isAr ? 'الكل' : 'All') : t(type)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            <Button
                type="button"
                variant="outline"
                onClick={onResetFilters}
                className="w-full rounded-2xl py-5 font-bold text-xs border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-2"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                {isAr ? 'إعادة تعيين كافة الفلاتر' : 'Reset All Filters'}
            </Button>
        </div>
    )
}
