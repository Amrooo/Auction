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
            {/* Hero Slider Banner with Blue Gradient Border in Dark Theme, White in Light Theme */}
            <div className="p-[2px] rounded-[2.1rem] md:rounded-[3.1rem] bg-gradient-to-b from-white/70 via-white/25 to-white/5 dark:from-blue-500 dark:via-blue-600/40 dark:to-blue-900/10 shadow-2xl dark:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                <section className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[560px] overflow-hidden bg-slate-900 flex flex-col justify-between pt-6 pb-28 rounded-[2rem] md:rounded-[3rem]">
                    <HeroSlider />
                </section>
            </div>

            {/* Overlapping Filter Panel: Tabs baseline aligns with slider bottom line */}
            <div className="-mt-11 md:-mt-12 relative z-30">
                <HeroFilterPanel 
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </div>
        </div>
    )
}
