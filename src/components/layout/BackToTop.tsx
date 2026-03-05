"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed bottom-8 right-8 z-[100] p-4 rounded-2xl shadow-2xl transition-all duration-300 group",
                        "bg-accent text-white hover:bg-accent/90",
                        "border border-white/20 dark:border-white/10"
                    )}
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />

                    {/* Ring animation */}
                    <span className="absolute inset-0 rounded-2xl ring-4 ring-accent opacity-0 group-hover:opacity-20 transition-opacity animate-pulse" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
