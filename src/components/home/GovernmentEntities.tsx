"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowRight, Shield, Scale, Car, Building2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRef, useState } from "react"

const entities = [
    {
        id: "dmt",
        name: "Department of Municipalities and Transport",
        arabicName: "دائرة البلديات والنقل",
        logo: "/images/dmt-logo.png",
        color: "from-amber-600 to-amber-800",
        count: "110",
        itemType: "Lots",
        icon: <Building2 className="w-6 h-6" />,
        isDarkInvert: true
    },
    {
        id: "abu-dhabi-mobility",
        name: "Abu Dhabi Mobility",
        arabicName: "أبوظبي للتنقل",
        logo: "/images/abu-dhabi-mobility.png",
        color: "from-teal-600 to-emerald-800",
        count: "156",
        itemType: "Vehicles",
        icon: <Car className="w-6 h-6" />
    },
    {
        id: "dubai-police",
        name: "Dubai Police",
        arabicName: "شرطة دبي",
        logo: "/images/dubai-police.png",
        color: "from-green-600 to-green-800",
        count: "124",
        itemType: "Vehicles",
        icon: <Shield className="w-6 h-6" />
    },
    {
        id: "abu-dhabi-police",
        name: "Abu Dhabi Police",
        arabicName: "شرطة أبوظبي",
        logo: "/images/abu-dhabi-police-transparent.png",
        color: "from-red-600 to-red-800",
        count: "92",
        itemType: "Vehicles",
        icon: <Shield className="w-6 h-6" />
    },
    {
        id: "dubai-customs",
        name: "Dubai Customs",
        arabicName: "جمارك دبي",
        logo: "/images/dubai-customs.png",
        color: "from-blue-600 to-blue-800",
        count: "85",
        itemType: "Lots",
        icon: <Scale className="w-6 h-6" />
    },
    {
        id: "saaed",
        name: "Saaed Traffic Systems",
        arabicName: "شركة ساعد للأنظمة المرورية",
        logo: "/images/saaed-logo.png",
        color: "from-slate-700 to-slate-900",
        count: "210",
        itemType: "Vehicles",
        icon: <Car className="w-6 h-6" />
    }
]

export function GovernmentEntities() {
    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const [isPaused, setIsPaused] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleScroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return
        const scrollAmount = 320
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
    }

    // Duplicate list for infinite marquee loop
    const displayEntities = [...entities, ...entities]

    return (
        <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950/20">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-secondary/20 dark:bg-secondary/10 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-start">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-red-600/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider border border-red-600/20">
                                {isAr ? 'الشركاء الاستراتيجيون' : 'Verified Government Partners'}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                            {t("Official Partners")}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base md:text-lg font-medium">
                            {t("Partners Description")}
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleScroll(isAr ? 'right' : 'left')}
                            aria-label="Previous Partners"
                            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                        </button>
                        <button
                            onClick={() => handleScroll(isAr ? 'left' : 'right')}
                            aria-label="Next Partners"
                            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Single-Row Marquee Slider */}
            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Edge gradient masks */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-background via-background/60 to-transparent z-20" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background via-background/60 to-transparent z-20" />

                {/* Animated Marquee Strip with 10% reduced full card UI */}
                <motion.div
                    ref={scrollContainerRef}
                    className="flex gap-6 py-4 px-6 overflow-x-auto no-scrollbar scroll-smooth"
                    animate={
                        !isPaused
                            ? {
                                x: isAr ? ["0%", "50%"] : ["0%", "-50%"]
                            }
                            : {}
                    }
                    transition={{
                        ease: "linear",
                        duration: 32,
                        repeat: Infinity,
                    }}
                >
                    {displayEntities.map((entity, index) => (
                        <Link
                            href={`/category/motors?source=${entity.id}`}
                            key={`${entity.id}-${index}`}
                            className="shrink-0 w-[285px] sm:w-[310px] select-none block"
                        >
                            <div
                                className="group relative bg-white dark:bg-slate-900 rounded-[2.25rem] p-7 shadow-sm hover:shadow-2xl border border-slate-200 dark:border-border hover:-translate-y-1 transition-all duration-500 h-full flex flex-col items-center justify-center text-center overflow-hidden"
                            >
                                {/* Gradient Hover Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${entity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="w-full h-28 mb-5 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                    <img
                                        src={entity.logo}
                                        alt={entity.name}
                                        className={cn(
                                            "max-h-full max-w-[82%] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110",
                                            entity.id === 'dmt' && "dark:brightness-125 dark:contrast-125 dark:drop-shadow-[0_1px_4px_rgba(255,255,255,0.3)]"
                                        )}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('bg-muted', 'rounded-2xl');
                                        }}
                                    />
                                    {/* Fallback Icon */}
                                    <div className="hidden group-hover:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
                                        {entity.icon}
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 transition-colors line-clamp-1">
                                    {language === 'ar' ? entity.arabicName : entity.name}
                                </h3>
                                {language !== 'ar' && (
                                    <p className="text-base font-arabic font-bold text-slate-600 dark:text-muted-foreground group-hover:text-slate-900 mb-3 transition-colors line-clamp-1">
                                        {entity.arabicName}
                                    </p>
                                )}

                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-secondary group-hover:bg-accent text-xs font-black text-slate-600 dark:text-muted-foreground group-hover:text-white transition-all shadow-sm border border-slate-100 dark:border-transparent">
                                        {entity.count} {t(entity.itemType)}
                                        <ArrowRight className={cn("w-3.5 h-3.5 transition-transform", language === 'ar' ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
