"use client"

import { Car, Home, Hash, Gem, Gavel, Watch, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const categories = [
    { name: "Motors", icon: Car, count: "450+", color: "from-blue-500/20 to-blue-500/5", span: "md:col-span-2 md:row-span-2", height: "h-64 md:h-full", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop" },
    { name: "Real Estate", icon: Home, count: "120+", color: "from-emerald-500/20 to-emerald-500/5", span: "md:col-span-1", height: "h-64", image: "/images/real-estate.jpg" },
    { name: "Jewelry", icon: Gem, count: "230+", color: "from-purple-500/20 to-purple-500/5", span: "md:col-span-1", height: "h-64", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop" },
    { name: "Plates", icon: Hash, count: "890+", color: "from-orange-500/20 to-orange-500/5", span: "md:col-span-2", height: "h-64", image: "/images/license-plate.png" },
    { name: "Watches", icon: Watch, count: "150+", color: "from-amber-500/20 to-amber-500/5", span: "md:col-span-1", height: "h-64", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2669&auto=format&fit=crop" },
    { name: "General", icon: Gavel, count: "1.2k+", color: "from-indigo-500/20 to-indigo-500/5", span: "md:col-span-3", height: "h-64", image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2670&auto=format&fit=crop" },
]



const categoryColors: Record<string, { border: string; bar: string; shadow: string; iconHover: string; badgeHover: string }> = {
    Motors: {
        border: "from-blue-500 to-indigo-600",
        bar: "bg-gradient-to-r from-blue-500 to-indigo-600",
        shadow: "shadow-[0_0_15px_rgba(59,130,246,0.6)]",
        iconHover: "group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white",
        badgeHover: "group-hover:border-blue-500/30 group-hover:text-blue-500 dark:group-hover:text-blue-400",
    },
    "Real Estate": {
        border: "from-emerald-400 to-teal-600",
        bar: "bg-gradient-to-r from-emerald-400 to-teal-600",
        shadow: "shadow-[0_0_15px_rgba(16,185,129,0.6)]",
        iconHover: "group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-teal-600 group-hover:text-white",
        badgeHover: "group-hover:border-emerald-500/30 group-hover:text-emerald-500 dark:group-hover:text-emerald-400",
    },
    Jewelry: {
        border: "from-purple-500 to-pink-600",
        bar: "bg-gradient-to-r from-purple-500 to-pink-600",
        shadow: "shadow-[0_0_15px_rgba(168,85,247,0.6)]",
        iconHover: "group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-600 group-hover:text-white",
        badgeHover: "group-hover:border-purple-500/30 group-hover:text-purple-500 dark:group-hover:text-purple-400",
    },
    Plates: {
        border: "from-orange-400 to-red-600",
        bar: "bg-gradient-to-r from-orange-400 to-red-600",
        shadow: "shadow-[0_0_15px_rgba(249,115,22,0.6)]",
        iconHover: "group-hover:bg-gradient-to-br group-hover:from-orange-400 group-hover:to-red-600 group-hover:text-white",
        badgeHover: "group-hover:border-orange-500/30 group-hover:text-orange-500 dark:group-hover:text-orange-400",
    },
    Watches: {
        border: "from-amber-400 to-yellow-600",
        bar: "bg-gradient-to-r from-amber-400 to-yellow-600",
        shadow: "shadow-[0_0_15px_rgba(245,158,11,0.6)]",
        iconHover: "group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-yellow-600 group-hover:text-white",
        badgeHover: "group-hover:border-amber-500/30 group-hover:text-amber-500 dark:group-hover:text-amber-400",
    },
    General: {
        border: "from-indigo-400 to-violet-600",
        bar: "bg-gradient-to-r from-indigo-400 to-violet-600",
        shadow: "shadow-[0_0_15px_rgba(99,102,241,0.6)]",
        iconHover: "group-hover:bg-gradient-to-br group-hover:from-indigo-400 group-hover:to-violet-600 group-hover:text-white",
        badgeHover: "group-hover:border-indigo-500/30 group-hover:text-indigo-500 dark:group-hover:text-indigo-400",
    },
}

export function FeaturedCategories() {
    const { t, language } = useLanguage()

    return (
        <section id="featured-categories" className="py-24 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        {t("Explore Categories")}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-bold">
                        {t("Categories Description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-fr">
                    {categories.map((cat, i) => {
                        const theme = categoryColors[cat.name] || {
                            border: "from-slate-200 to-slate-300",
                            bar: "bg-accent",
                            shadow: "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
                            iconHover: "group-hover:bg-accent group-hover:text-white",
                            badgeHover: "group-hover:border-accent/30 group-hover:text-accent"
                        };
                        return (
                            <div
                                key={cat.name}
                                className={cn(
                                    "relative group p-[2px] transition-all duration-500 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl",
                                    cat.span,
                                    cat.height,
                                    "bg-gradient-to-br from-slate-200/80 to-slate-300/80 dark:from-slate-800/80 dark:to-slate-700/80",
                                    `hover:bg-gradient-to-br hover:${theme.border}`
                                )}
                            >
                                {/* Animated Gradient Border Overlay */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${cat.color} -z-10 bg-clip-text`} />

                                <Link
                                    href={`/category/${cat.name.toLowerCase()}`}
                                    className={cn(
                                        "block h-full w-full relative transition-all duration-500 rounded-[2.85rem] overflow-hidden",
                                        cat.name === "Plates" ? "bg-slate-900/90" : "bg-white dark:bg-slate-900/90"
                                    )}
                                >
                                    {/* Colored Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`} />

                                {/* Image Background */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={t(cat.name)}
                                        className={cn(
                                            "w-full h-full transition-transform duration-700 group-hover:scale-105 will-change-transform",
                                            cat.name === "Plates"
                                                ? "object-contain opacity-90 p-16 rounded-[2.5rem]"
                                                : "object-cover opacity-80 dark:opacity-60 grayscale-[10%] group-hover:grayscale-0"
                                        )}
                                    />
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t",
                                        cat.name === "Plates"
                                            ? "from-black/95 via-black/50 to-transparent"
                                            : "from-white/95 via-white/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/80"
                                    )} />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                                    <div className="flex items-end justify-between">
                                        <div className="relative">
                                            {cat.name !== "Plates" && (
                                                <div className={cn(
                                                    "w-14 h-14 rounded-[1.25rem] flex items-center justify-center mb-5 transition-all duration-500 shadow-xl backdrop-blur-xl",
                                                    "bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 group-hover:scale-110 group-hover:rotate-6 text-slate-900 dark:text-white",
                                                    theme.iconHover
                                                )}>
                                                    <cat.icon className="w-7 h-7" />
                                                </div>
                                            )}
                                            <h3 className={cn(
                                                "text-3xl font-black mb-2 transition-transform duration-500 ease-out group-hover:translate-x-1 tracking-tight",
                                                cat.name === "Plates" ? "text-white drop-shadow-lg" : "text-slate-900 dark:text-white"
                                            )}>
                                                {t(cat.name)}
                                            </h3>
                                            <p className={cn(
                                                "text-[10px] uppercase font-black px-4 py-1.5 rounded-full w-fit backdrop-blur-md border tracking-widest transition-all duration-500",
                                                cat.name === "Plates"
                                                    ? "bg-white/20 text-white border-white/30"
                                                    : cn("bg-white dark:bg-white/5 text-slate-900 dark:text-white/70 border-slate-300 dark:border-white/10", theme.badgeHover)
                                            )}>
                                                {cat.count} {t("listings")}
                                            </p>
                                        </div>

                                        <div className={`w-14 h-14 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white dark:bg-white/10 backdrop-blur-xl shadow-2xl`}>
                                            {language === 'ar' ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Line (Matches Category Border Color) */}
                                <div className={cn(
                                    "absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-1000 ease-in-out",
                                    theme.bar,
                                    theme.shadow
                                )} />
                            </Link>
                        </div>
                    )
                })}
                </div>
            </div>
        </section>
    )
}

