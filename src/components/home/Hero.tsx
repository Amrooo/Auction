"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, TrendingUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

const heroImages = [
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2664&auto=format&fit=crop", // Mercedes
    "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop", // Porsche
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop", // Chevrolet
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop"  // Ferrari
]

export function Hero() {
    const [currentImage, setCurrentImage] = useState(0)
    const { t, language } = useLanguage()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-red-400/20 dark:bg-yellow-500/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70" />
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-3xl mix-blend-multiply filter opacity-70" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-secondary border border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground text-sm font-bold mb-6 backdrop-blur-sm shadow-sm transition-all hover:border-accent/30 group">
                            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                            <span>{t("AI-Powered Auction Intelligence")}</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white mb-6 leading-[1.1]">
                            {t("Bid Smarter.")}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                                {t("Win Bigger.")}
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            {t("Hero Description")}
                        </p>

                        <div className={`flex flex-col sm:flex-row items-center justify-center ${language === 'ar' ? 'lg:justify-start' : 'lg:justify-start'} gap-4`}>
                            <Button size="lg" className="rounded-full px-10 h-16 text-lg bg-accent text-white hover:bg-accent/90 shadow-2xl shadow-accent/20 transition-all hover:scale-105 font-bold border-none">
                                {t("Start Bidding")} {language === 'ar' ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-10 h-16 text-lg border-slate-200 dark:border-border bg-white dark:bg-background hover:bg-slate-900 dark:hover:bg-white text-slate-900 dark:text-foreground hover:text-white dark:hover:text-slate-900 shadow-sm transition-all font-bold">
                                {t("How It Works")}
                            </Button>
                        </div>

                        <div className={`mt-14 flex items-center justify-center ${language === 'ar' ? 'lg:justify-start' : 'lg:justify-start'} gap-10 text-slate-500 dark:text-muted-foreground`}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <span className="text-base font-bold">1.2k {t("Live Auctions")}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                <span className="text-base font-bold">$4M+ {t("Daily Volume")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200/60 dark:border-border bg-white/50 dark:bg-card/50 backdrop-blur-md p-4 transition-colors">
                            <div className="rounded-[2.5rem] overflow-hidden relative aspect-[4/3] group bg-slate-100 dark:bg-secondary">

                                {/* Image Slider */}
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImage}
                                        src={heroImages[currentImage]}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.7 }}
                                        alt="Luxury Auction Item"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

                                {/* Floating Cards */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className={`absolute top-10 ${language === 'ar' ? 'left-10' : 'right-10'} bg-white/95 dark:bg-background/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-slate-200/60 dark:border-border max-w-[220px]`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs shadow-inner">
                                            AI
                                        </div>
                                        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                                            <p className="text-[10px] text-slate-500 dark:text-muted-foreground font-black uppercase tracking-widest">{t("Prediction")}</p>
                                            <p className="font-extrabold text-slate-900 dark:text-foreground text-sm">{t("Undervalued")}</p>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-secondary rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-green-500 w-[85%] shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className={`absolute bottom-10 ${language === 'ar' ? 'right-10' : 'left-10'} bg-slate-900/90 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 text-white`}
                                >
                                    <p className="text-[10px] text-slate-300 font-bold mb-1 tracking-widest uppercase">{t("Live Bid")}</p>
                                    <p className="text-2xl font-black tabular-nums tracking-tight">$124,500</p>
                                    <div className="flex -space-x-3 mt-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-9 h-9 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-xl">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User" />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Slider Indicators */}
                                <div className={`absolute bottom-6 flex gap-2 ${language === 'ar' ? 'left-6' : 'right-6'}`}>
                                    {heroImages.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-white w-6' : 'bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
