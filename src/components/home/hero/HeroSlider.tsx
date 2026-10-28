"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Gavel } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export const heroSlides = [
    {
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2670&auto=format&fit=crop",
        titleKey: "Saaed new online Auto Auctions",
        descKey: "Discover premium vehicles, exclusive luxury watches, VIP plates, and high-end real estate listings with AI-driven valuation estimates."
    },
    {
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670&auto=format&fit=crop",
        titleKey: "Bid on Premium Government Lots",
        descKey: "Access verified state-owned assets, salvage vehicles, and commercial real estate directly from official agencies."
    },
    {
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2670&auto=format&fit=crop",
        titleKey: "Exclusive Watches & Fine Jewelry",
        descKey: "Explore authenticated luxury timepieces and fine jewelry curated by certified appraisers with real-time bidding."
    }
]

export function HeroSlider() {
    const [currentImage, setCurrentImage] = useState(0)
    const { t, language } = useLanguage()
    const router = useRouter()

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext()
        }, 7000)
        return () => clearInterval(timer)
    }, [])

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    }

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % heroSlides.length)
    }

    const slide = heroSlides[currentImage % heroSlides.length] || heroSlides[0]

    return (
        <>
            {/* Background Image Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={slide.image}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        alt="Background Slider Car"
                        className="absolute inset-0 w-full h-full object-cover filter saturate-[0.6] brightness-[0.7] contrast-[1.05] pointer-events-none"
                    />
                </AnimatePresence>
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
            </div>

            {/* Slider Navigation Arrows */}
            <button 
                onClick={handlePrev}
                className="absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer border-none backdrop-blur-sm left-2 sm:left-6 shadow-md"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button 
                onClick={handleNext}
                className="absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer border-none backdrop-blur-sm right-2 sm:right-6 shadow-md"
                aria-label="Next slide"
            >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Left/Right Aligned Hero Content based on RTL */}
            <div className={cn(
                "w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 flex-1 flex flex-col justify-center mt-4 sm:mt-8 md:mt-12",
                language === 'ar' ? 'items-start text-right' : 'items-start text-left'
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase max-w-full md:max-w-[70%] lg:max-w-[55%] leading-tight">
                            {t(slide.titleKey)}
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-200/90 font-medium max-w-full md:max-w-[70%] lg:max-w-[55%] leading-relaxed mt-2 sm:mt-3 mb-5 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                            {t(slide.descKey)}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                >
                    <button
                        onClick={() => router.push('/category/motors')}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl sm:rounded-2xl font-black shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base md:text-lg group cursor-pointer border-none hover:scale-105 active:scale-95"
                    >
                        <span>{t("Live Auction")}</span>
                        <span className={cn(
                            "text-xs sm:text-sm transition-transform",
                            language === 'ar' ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                        )}>
                            {language === 'ar' ? "◀" : "▶"}
                        </span>
                    </button>
                    <button
                        onClick={() => router.push('/category/motors')}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-950 text-white dark:bg-gradient-to-r dark:from-blue-900/90 dark:via-blue-800/80 dark:to-indigo-900/90 dark:text-blue-100 dark:border dark:border-blue-500/40 dark:shadow-[0_0_25px_rgba(59,130,246,0.3)] rounded-xl sm:rounded-2xl font-black shadow-lg hover:bg-slate-900 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base md:text-lg group cursor-pointer border-none hover:scale-105 active:scale-95"
                    >
                        <Gavel className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-slate-300 dark:text-blue-300" />
                        <span>{t("Bidding Now")}</span>
                    </button>
                </motion.div>
            </div>

            {/* Bullet Slide Indicators */}
            <div className="flex justify-center gap-2 absolute bottom-16 md:bottom-20 left-0 right-0 z-20">
                {heroSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                            idx === currentImage ? 'bg-[#3B82F6] w-6' : 'bg-slate-400/50'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </>
    )
}
