"use client"

import Link from "next/link"
import { Search, Gavel, Menu, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

import { AuthModal } from "@/components/auth/AuthModal"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [authView, setAuthView] = useState<"login" | "signup">("login")
    const { language, setLanguage, t } = useLanguage()
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const openAuthModal = (view: "login" | "signup") => {
        setAuthView(view)
        setIsAuthModalOpen(true)
    }

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-white dark:bg-slate-900 shadow-xl py-2 border-b border-slate-200 dark:border-border/50"
                        : "bg-white dark:bg-transparent py-4 border-b border-white/10 dark:border-transparent"
                )}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
                    <Link href="/" className="flex items-center group">
                        <img
                            src="/images/saaed-logo.png"
                            alt="Saaed"
                            className={cn(
                                "h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105",
                                isScrolled && "dark:brightness-0 dark:invert"
                            )}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className={cn(
                        "hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-500",
                        isScrolled
                            ? "bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md border-slate-200 dark:border-border/50"
                            : "bg-slate-50/50 dark:bg-white/5 backdrop-blur-md border-slate-200 dark:border-white/10 shadow-sm"
                    )}>
                        {["Home", "Auctions", "Motors", "Real Estate", "About"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                                className="px-5 py-2 rounded-full text-sm font-black transition-all duration-300 text-slate-900 dark:text-white hover:text-accent dark:hover:text-accent"
                            >
                                {t(item)}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3 relative">
                        <button
                            suppressHydrationWarning
                            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                            className={cn(
                                "p-2.5 rounded-full transition-all flex items-center gap-1.5 font-black text-xs border shadow-sm",
                                "bg-white hover:bg-slate-100 text-black border-slate-200",
                                "dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10"
                            )}
                        >
                            <Globe className="w-4 h-4 text-accent" />
                            {language === "en" ? "AR" : "EN"}
                        </button>

                        <ThemeToggle />

                        <button
                            suppressHydrationWarning
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={cn(
                                "p-2.5 rounded-full transition-all hidden sm:block border shadow-sm",
                                isSearchOpen
                                    ? "bg-accent text-white border-accent shadow-accent/20"
                                    : "bg-white hover:bg-slate-100 text-black border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10"
                            )}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>

                        <div className="hidden sm:flex gap-2 ms-2">
                            <Button
                                variant="ghost"
                                onClick={() => openAuthModal("login")}
                                className="rounded-full transition-all font-black px-5 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10"
                            >
                                {t("Log In")}
                            </Button>
                            <Button
                                onClick={() => openAuthModal("signup")}
                                className="rounded-full bg-accent hover:bg-accent/90 dark:bg-white dark:hover:bg-accent text-white dark:text-slate-950 dark:hover:text-white shadow-xl shadow-accent/20 dark:shadow-white/10 transition-all hover:scale-105 active:scale-95 font-black px-7 border-none h-11"
                            >
                                {t("Get Started")}
                            </Button>
                        </div>

                        {/* Search Bar Dropdown */}
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    ref={searchRef}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 15, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-2 w-80 md:w-96 z-[60]"
                                >
                                    <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/60 dark:border-border/50 rounded-2xl shadow-2xl p-4 overflow-hidden">
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-muted-foreground group-focus-within:text-accent transition-colors" />
                                            <input
                                                suppressHydrationWarning
                                                autoFocus
                                                type="text"
                                                placeholder={t("Search auctions, items, prices...")}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none text-black dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            suppressHydrationWarning
                            className={cn(
                                "md:hidden p-2.5 transition-colors rounded-full",
                                isScrolled
                                    ? "hover:bg-secondary text-black dark:text-white"
                                    : "hover:bg-black/5 text-black dark:text-white dark:hover:bg-white/10"
                            )}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header >

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultTab={authView}
            />
        </>
    )
}
