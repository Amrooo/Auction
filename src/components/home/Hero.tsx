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
        <div className="px-4 md:px-10 py-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <section className="relative w-full h-[520px] sm:h-[600px] md:h-[700px] overflow-hidden bg-slate-900 flex flex-col justify-between pt-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
                
                <HeroSlider />

                <HeroFilterPanel 
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

            </section>
        </div>
    )
}
