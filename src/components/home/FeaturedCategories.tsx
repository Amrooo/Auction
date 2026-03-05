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
    { name: "General", icon: Gavel, count: "1.2k+", color: "from-indigo-500/20 to-indigo-500/5", span: "md:col-span-3", height: "h-64", image: "https://images.unsplash.com/photo-1550948537-130a1ce83314?q=80&w=2672&auto=format&fit=crop" },
]



export function FeaturedCategories() {
    const { t, language } = useLanguage()

    return (
        <section className="py-24 bg-white dark:bg-slate-950/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        {t("Explore Categories")}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        {t("Categories Description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-fr">
                    {categories.map((cat, i) => (
                        <div
                            key={cat.name}
                            className={`relative group rounded-[3rem] overflow-hidden ${cat.span} ${cat.height} ring-1 ring-slate-100 dark:ring-border shadow-sm hover:shadow-xl transition-shadow duration-300`}
                        >
                            {/* Animated Gradient Border Overlay */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${cat.color} -z-10 bg-clip-text`} />

                            <Link
                                href={`/category/${cat.name.toLowerCase()}`}
                                className={cn(
                                    "block h-full w-full relative transition-all duration-500",
                                    cat.name === "Plates" ? "bg-slate-900/80" : "bg-white/80 dark:bg-slate-900/80"
                                )}
                            >
                                {/* Colored Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />

                                {/* Image Background */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={t(cat.name)}
                                        className={cn(
                                            "w-full h-full transition-transform duration-700 group-hover:scale-105 will-change-transform",
                                            cat.name === "Plates"
                                                ? "object-contain opacity-80 p-16 rounded-[2.5rem]"
                                                : "object-cover opacity-60 dark:opacity-60 grayscale-[20%] group-hover:grayscale-0"
                                        )}
                                    />
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t",
                                        cat.name === "Plates"
                                            ? "from-black/90 via-black/40 to-transparent"
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
                                                    "bg-white/80 dark:bg-white/10 border border-white dark:border-white/20 group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-6 text-slate-800 dark:text-white"
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
                                                    : "bg-white/80 dark:bg-white/5 text-slate-500 dark:text-white/70 border-slate-200 dark:border-white/10 group-hover:border-accent/30 group-hover:text-accent"
                                            )}>
                                                {cat.count} {t("listings")}
                                            </p>
                                        </div>

                                        <div className={`w-14 h-14 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/90 dark:bg-white/10 backdrop-blur-xl shadow-2xl`}>
                                            {language === 'ar' ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Line */}
                                <div className={`absolute bottom-0 left-0 h-1.5 bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(220,38,38,0.5)]`} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
