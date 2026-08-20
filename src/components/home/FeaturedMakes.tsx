"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

// SVG Brand Logos as inline components for robustness and offline support
const NissanLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="6" />
        <rect x="10" y="42" width="80" height="16" fill="currentColor" rx="2" />
        <text x="50" y="53" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="2">NISSAN</text>
    </svg>
)

const HyundaiLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="42" ry="25" stroke="currentColor" strokeWidth="6" />
        <path d="M35 38 L35 62 M65 38 L65 62 M35 50 L65 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" transform="skewX(-15) translate(13, 0)" />
    </svg>
)

const KiaLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="45" ry="22" stroke="currentColor" strokeWidth="5" />
        <text x="50" y="57" fill="currentColor" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="3">KIA</text>
    </svg>
)

const ToyotaLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="45" ry="28" stroke="currentColor" strokeWidth="5" />
        <ellipse cx="50" cy="42" rx="28" ry="16" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="50" rx="12" ry="24" stroke="currentColor" strokeWidth="4" />
    </svg>
)

const LexusLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="42" ry="26" stroke="currentColor" strokeWidth="6" />
        <path d="M30 60 L45 35 L70 35 M42 40 L60 60" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const MercedesLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="5" />
        <path d="M50 12 L50 50 L18 68 M50 50 L82 68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
)

const LandRoverLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="35" rx="55" ry="28" fill="#02482A" />
        <ellipse cx="60" cy="35" rx="51" ry="24" stroke="#D4AF37" strokeWidth="2" />
        <text x="60" y="41" fill="white" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="1">LAND ROVER</text>
    </svg>
)

const ChevroletLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 42 L35 32 L65 32 L65 42 L85 42 L85 58 L65 58 L65 68 L35 68 L35 58 L15 58 L15 42 Z" fill="#D4AF37" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
)

const HondaLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="18" width="60" height="64" rx="12" stroke="currentColor" strokeWidth="6" />
        <path d="M32 30 L32 70 M68 30 L68 70 M32 50 L68 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
)

const FordLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="45" ry="24" fill="#0D47A1" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="50" rx="40" ry="19" stroke="white" strokeWidth="2" />
        <text x="50" y="56" fill="white" fontSize="16" fontWeight="bold" fontStyle="italic" textAnchor="middle" letterSpacing="1">Ford</text>
    </svg>
)

const DodgeLogo = () => (
    <svg className="w-16 h-16 object-contain" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 25 L80 25 L70 75 L50 85 L30 75 Z" stroke="currentColor" strokeWidth="5" fill="none" strokeLinejoin="round" />
        <path d="M40 38 Q43 50 50 53 Q57 50 60 38" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M45 60 L50 65 L55 60" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
)

const carMakes = [
    { name: "Nissan", count: 2461, logo: NissanLogo },
    { name: "Hyundai", count: 1747, logo: HyundaiLogo },
    { name: "Kia", count: 1589, logo: KiaLogo },
    { name: "Toyota", count: 1363, logo: ToyotaLogo },
    { name: "Lexus", count: 972, logo: LexusLogo },
    { name: "Mercedes Benz", count: 656, logo: MercedesLogo },
    { name: "Land Rover", count: 265, logo: LandRoverLogo },
    { name: "Chevrolet", count: 241, logo: ChevroletLogo },
    { name: "Honda", count: 223, logo: HondaLogo },
    { name: "Ford", count: 222, logo: FordLogo },
    { name: "Dodge", count: 187, logo: DodgeLogo },
]

export function FeaturedMakes() {
    const { t, language } = useLanguage()

    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4">
                
                {/* Heading */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                        {language === 'ar' ? (
                            <>
                                أشهر <span className="text-red-600">ماركات</span> السيارات في مكان واحد
                            </>
                        ) : (
                            <>
                                Top Car <span className="text-red-600">Makes</span>, All in One Place
                            </>
                        )}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
                        {t("Certified Quality & Authenticity")}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {carMakes.map((make) => {
                        const LogoComponent = make.logo
                        return (
                            <Link 
                                key={make.name}
                                href={`/category/motors?make=${make.name.toLowerCase()}`}
                                className={cn(
                                    "flex flex-col items-center justify-between p-6 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200/60 dark:border-slate-700/60 transition-all duration-300",
                                    "hover:shadow-xl hover:scale-105 hover:border-red-600/50 group h-48"
                                )}
                            >
                                <div className="text-slate-700 dark:text-slate-300 group-hover:text-red-600 transition-colors flex items-center justify-center flex-1">
                                    <LogoComponent />
                                </div>
                                <div className="text-center space-y-1 mt-4">
                                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 tracking-wide uppercase">
                                        {t(make.name)}
                                    </h3>
                                    <p className="text-xs font-black text-red-600 dark:text-red-500/90">
                                        ({make.count})
                                    </p>
                                </div>
                            </Link>
                        )
                    })}

                    {/* View All Card */}
                    <Link
                        href="/category/motors"
                        className={cn(
                            "flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 transition-all duration-300 h-48 cursor-pointer",
                            "hover:shadow-xl hover:scale-105 hover:border-red-600/50 hover:bg-white dark:hover:bg-slate-800/40 group"
                        )}
                    >
                        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-extrabold text-lg transition-transform duration-300 group-hover:translate-x-1">
                            <span>{t("View all")}</span>
                            {language === 'ar' ? (
                                <ArrowLeft className="w-5 h-5 text-red-600" />
                            ) : (
                                <ArrowRight className="w-5 h-5 text-red-600" />
                            )}
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    )
}
