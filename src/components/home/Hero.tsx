"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { HeroSlider } from "./hero/HeroSlider"
import { HeroFilterPanel } from "./hero/HeroFilterPanel"

const categories = ["Motors", "Real Estate", "Jewelry", "Plates", "Watches", "General"]

export function Hero() {
    const [activeCategory, setActiveCategory] = useState("Motors")
    const { language } = useLanguage()

    return (
        <div className="px-4 md:px-10 pt-6 pb-12 md:pb-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Hero Slider Banner */}
            <section className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[560px] overflow-hidden bg-slate-900 flex flex-col justify-between pt-6 pb-28 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
                <HeroSlider />
            </section>

            {/* Overlapping Filter Panel */}
            <div className="-mt-16 sm:-mt-20 relative z-30">
                <HeroFilterPanel 
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </div>
        </div>
    )
}
