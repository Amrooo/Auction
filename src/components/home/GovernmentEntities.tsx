"use client"

import { useLanguage } from "@/lib/language-context"
import { ArrowRight, Shield, Scale } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const entities = [
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
        id: "abu-dhabi-police",
        name: "Abu Dhabi Police",
        arabicName: "شرطة أبوظبي",
        logo: "/images/abu-dhabi-police-transparent.png",
        color: "from-red-600 to-red-800",
        count: "92",
        itemType: "Vehicles",
        icon: <Shield className="w-6 h-6" />
    }
]

export function GovernmentEntities() {
    const { t, language } = useLanguage()

    return (
        <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-950/20">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-secondary/20 dark:bg-secondary/10 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                        {t("Official Partners")}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-bold">
                        {t("Partners Description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {entities.map((entity, index) => (
                        <Link href={`/auctions?source=${entity.id}`} key={entity.id}>
                            <div
                                className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl border border-slate-200 dark:border-border hover:-translate-y-1 transition-all duration-500 h-full flex flex-col items-center justify-center text-center overflow-hidden"
                            >
                                {/* Gradient Hover Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${entity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="w-full h-32 mb-6 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                    <img
                                        src={entity.logo}
                                        alt={entity.name}
                                        className="max-h-full max-w-[80%] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
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

                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 transition-colors">
                                    {language === 'ar' ? entity.arabicName : entity.name}
                                </h3>
                                {language !== 'ar' && (
                                    <p className="text-lg font-arabic font-bold text-slate-600 dark:text-muted-foreground group-hover:text-slate-900 mb-4 transition-colors">
                                        {entity.arabicName}
                                    </p>
                                )}

                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 dark:bg-secondary group-hover:bg-accent text-sm font-black text-slate-600 dark:text-muted-foreground group-hover:text-white transition-all shadow-sm border border-slate-100 dark:border-transparent">
                                        {entity.count} {t(entity.itemType)}
                                        <ArrowRight className={cn("w-4 h-4 transition-transform", language === 'ar' ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
