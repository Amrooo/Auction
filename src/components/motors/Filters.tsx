"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider" // Need to implement this or use standard input for now
import { Button } from "@/components/ui/button"
import { Sparkles, SlidersHorizontal, Search } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function MotorFilters() {
    const [useAI, setUseAI] = useState(false)
    const { t, language } = useLanguage()

    return (
        <div className="space-y-8">
            {/* AI Toggle */}
            <div
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${useAI ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                onClick={() => setUseAI(!useAI)}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                        <Sparkles className={`w-4 h-4 ${useAI ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                        {t("Smart Match")}
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-colors relative ${useAI ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <div className={`absolute top-1 ${language === 'ar' ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${useAI ? (language === 'ar' ? '-translate-x-4' : 'translate-x-4') : ''}`} />
                    </div>
                </div>
                <p className={`text-xs text-slate-500 dark:text-slate-400 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {t("Smart Match Description")}
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className={`absolute top-3 w-4 h-4 text-slate-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                <input
                    type="text"
                    placeholder={t("Search make, model...")}
                    className={`w-full py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 ${language === 'ar' ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
                />
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <h3 className={`font-semibold text-slate-900 dark:text-white flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                    <SlidersHorizontal className="w-4 h-4" /> {t("Filters")}
                </h3>

                <div className="space-y-3">
                    <label className={`text-sm font-medium text-slate-700 dark:text-slate-300 block ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Make")}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Toyota', 'Nissan', 'Porsche', 'BMW', 'Mercedes', 'Ford'].map(make => (
                            <label key={make} className={`flex items-center gap-2 px-3 py-2 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer bg-white dark:bg-slate-900 transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="text-sm text-slate-600 dark:text-slate-300">{make}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className={`text-sm font-medium text-slate-700 dark:text-slate-300 block ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Price Range (AED)")}</label>
                    <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <input type="number" placeholder={t("Min")} className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white ${language === 'ar' ? 'text-right' : 'text-left'}`} />
                        <span className="text-slate-400">-</span>
                        <input type="number" placeholder={t("Max")} className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white ${language === 'ar' ? 'text-right' : 'text-left'}`} />
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className={`text-sm font-medium text-slate-700 dark:text-slate-300 block ${language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Condition")}</label>
                    <div className={`flex flex-wrap gap-2 ${language === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                        {['New', 'Used', 'Salvage', 'Classic'].map(type => (
                            <button key={type} className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-colors">
                                {t(type)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Button className="w-full rounded-xl bg-slate-900 py-6 text-white font-bold text-lg dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 hover:bg-slate-800 transition-all">
                {t("Apply Filters")}
            </Button>
        </div>
    )
}
