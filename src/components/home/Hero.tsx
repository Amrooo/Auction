"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { HeroSlider } from "./hero/HeroSlider"
import { HeroFilterPanel } from "./hero/HeroFilterPanel"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const categories = ["Motors", "Real Estate", "Jewelry", "Plates", "Watches", "General"]

export function Hero() {
    const [activeCategory, setActiveCategory] = useState("Motors")
    const { language } = useLanguage()

    return (
        <div className="px-4 md:px-10 pt-6 pb-8 md:pb-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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

            {/* Animated Mouse & Arrow Scroll Indicator */}
            <div className="flex flex-col items-center justify-center pt-7 md:pt-9">
                <button
                    onClick={() => {
                        window.scrollBy({ top: 480, behavior: "smooth" })
                    }}
                    className="group flex flex-col items-center gap-1.5 text-blue-600 hover:text-indigo-600 dark:text-blue-400/80 dark:hover:text-blue-300 transition-colors cursor-pointer border-none bg-transparent outline-none"
                    aria-label="Scroll down"
                >
                    {/* Mouse Shape with Gradient Blue Border */}
                    <div className="p-[2px] rounded-full bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-600 dark:from-blue-500/70 dark:via-blue-600/50 dark:to-blue-900/30 shadow-md shadow-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                        <div className="w-[18px] h-[30px] md:w-[22px] md:h-[34px] rounded-full bg-white dark:bg-slate-900 flex justify-center pt-1.5">
                            {/* Animated Wheel / Dot inside mouse */}
                            <motion.div
                                animate={{
                                    y: [0, 8, 0],
                                    opacity: [1, 0.25, 1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.6,
                                    ease: "easeInOut"
                                }}
                                className="w-1 h-2 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600 dark:bg-blue-400"
                            />
                        </div>
                    </div>

                    {/* Down Arrow Indicator */}
                    <motion.div
                        animate={{
                            y: [0, 4, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "easeInOut"
                        }}
                    >
                        <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400/80 group-hover:text-indigo-600 dark:group-hover:text-blue-300 transition-colors" />
                    </motion.div>
                </button>
            </div>
        </div>
    )
}
