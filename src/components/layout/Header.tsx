"use client"

import Link from "next/link"
import { Search, Gavel, Menu, Globe, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"

import { usePathname, useRouter } from "next/navigation"

import { AuthModal } from "@/components/auth/AuthModal"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [authView, setAuthView] = useState<"login" | "signup">("login")
    const { language, setLanguage, t } = useLanguage()
    const searchRef = useRef<HTMLDivElement>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userRole, setUserRole] = useState("")
    const [headerSearch, setHeaderSearch] = useState("")

    if (pathname.startsWith("/admin")) return null

    useEffect(() => {
        const checkSession = () => {
            const loggedIn = localStorage.getItem("user_logged_in") === "true"
            setIsLoggedIn(loggedIn)
            setUserRole(localStorage.getItem("user_role") || "")
        }
        checkSession()
        window.addEventListener("storage", checkSession)
        window.addEventListener("login_state_change", checkSession)

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
            window.removeEventListener("storage", checkSession)
            window.removeEventListener("login_state_change", checkSession)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user_logged_in")
        localStorage.removeItem("user_role")
        setIsLoggedIn(false)
        setUserRole("")
        window.dispatchEvent(new Event("login_state_change"))
        router.push("/")
    }

    const getPortalHref = () => {
        if (userRole === "admin") return "/admin"
        if (userRole === "yard") return "/admin/safeyard"
        if (userRole === "itc") return "/admin/itc"
        if (userRole === "inspect") return "/admin/integrations"
        return "/dashboard"
    }

    const [authNotice, setAuthNotice] = useState<{ title?: string; desc?: string }>({})

    const openAuthModal = (view: "login" | "signup", customNotice?: { title?: string; desc?: string }) => {
        setAuthView(view)
        if (customNotice) {
            setAuthNotice(customNotice)
        } else {
            setAuthNotice({})
        }
        setIsAuthModalOpen(true)
    }

    const handleAddVehicleClick = () => {
        if (isLoggedIn) {
            router.push("/dashboard?tab=sell")
        } else {
            localStorage.setItem("auth_redirect_target", "/dashboard?tab=sell")
            openAuthModal("login", {
                title: language === 'ar' ? 'تسجيل الدخول مطلوب لإضافة مركبة للمزاد' : 'Login Required to Add Vehicle for Auction',
                desc: language === 'ar' ? 'يرجى تسجيل الدخول بحسابك أو إنشاء حساب جديد للبدء في معالج إدراج المركبة.' : 'Please sign in or create an account to start the vehicle consignment wizard.'
            })
        }
    }

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-white dark:bg-black shadow-xl py-2 border-b border-slate-200 dark:border-border/50"
                        : "bg-white dark:bg-transparent py-4 border-b border-white/10 dark:border-transparent"
                )}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-black rounded-xl p-1.5 sm:p-2 shadow-md border border-slate-800 flex items-center justify-center shrink-0">
                            <img
                                src="/images/uae-flag-original.png"
                                alt="UAE Flag"
                                className="h-7 sm:h-8 w-auto object-contain"
                            />
                        </div>

                        <Link href="/" className="flex items-center group shrink-0">
                            <img
                                src="/images/saaed-logo.png"
                                alt="Saaed"
                                className={cn(
                                    "h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105",
                                    isScrolled && "dark:brightness-0 dark:invert"
                                )}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        <Link href="/" className="text-sm font-bold px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white transition-all">
                            {t("Home")}
                        </Link>
                        <div className="relative group cursor-pointer flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all">
                            <span>{t("Services")}</span>
                            <span className="text-[9px] translate-y-[1px]">▼</span>
                            
                            {/* Dropdown Menu */}
                            <div className={cn(
                                "absolute top-full mt-2 w-48 bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 hidden group-hover:block z-50",
                                language === 'ar' ? 'right-0' : 'left-0'
                            )}>
                                {[
                                    { name: "Motors", path: "/category/motors" },
                                    { name: "Real Estate", path: "/category/real%20estate" },
                                    { name: "Jewelry", path: "/category/jewelry" },
                                    { name: "Plates", path: "/category/plates" },
                                    { name: "Watches", path: "/category/watches" },
                                    { name: "General", path: "/category/general" }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className="block px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-colors text-start"
                                    >
                                        {t(item.name)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/about" className="text-sm font-bold px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all">
                            {t("About Us")}
                        </Link>
                        <Link href="/contact" className="text-sm font-bold px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all">
                            {t("Contact Us")}
                        </Link>
                        <Link href="/how-to-buy" className="text-sm font-bold px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all">
                            {t("How to Buy")}
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3 relative">
                        <button
                            suppressHydrationWarning
                            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                            className={cn(
                                "p-2 rounded-full transition-all flex items-center gap-1 font-bold text-xs border shadow-sm cursor-pointer",
                                "bg-white hover:bg-slate-100 text-black border-slate-200",
                                "dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10"
                            )}
                        >
                            <Globe className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
                            {language === "en" ? "AR" : "EN"}
                        </button>

                        <ThemeToggle />

                        <button
                            suppressHydrationWarning
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={cn(
                                "p-2.5 rounded-full transition-all hidden sm:block border shadow-sm cursor-pointer",
                                isSearchOpen
                                    ? "bg-accent text-white border-accent shadow-accent/20"
                                    : "bg-white hover:bg-slate-100 text-black border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10"
                            )}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>

                        {/* Add Vehicle for Auction CTA Button */}
                        <button
                            onClick={handleAddVehicleClick}
                            className="hidden lg:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-600/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer border-none"
                        >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>{language === 'ar' ? 'أضف مركبة للمزاد' : 'Add Vehicle'}</span>
                        </button>

                        {isLoggedIn ? (
                            <div className="hidden sm:flex items-center gap-3 ms-2">
                                <Link
                                    href={getPortalHref()}
                                    className="px-6 py-2.5 rounded-2xl text-xs font-black bg-slate-950 dark:bg-slate-850 text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition-all cursor-pointer uppercase tracking-wider border-none shadow-md"
                                >
                                    {userRole === "admin" ? "Admin Panel" :
                                     userRole === "yard" ? "Yard Portal" :
                                     userRole === "itc" ? "ITC Portal" :
                                     userRole === "inspect" ? "Integrations" :
                                     "Dashboard"}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 rounded-2xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition-all shadow-[0_4px_12px_rgba(220,38,38,0.2)] cursor-pointer uppercase tracking-wider border-none active:scale-95"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-3 ms-2">
                                <button 
                                    onClick={() => openAuthModal("signup")}
                                    className="px-6 py-2.5 rounded-2xl text-xs font-black bg-slate-950 dark:bg-slate-800 text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition-all cursor-pointer uppercase tracking-wider border-none shadow-md"
                                >
                                    {t("Register")}
                                </button>
                                <button 
                                    onClick={() => openAuthModal("login")}
                                    className="px-6 py-2.5 rounded-2xl text-xs font-black bg-red-600 hover:bg-red-700 text-white transition-all shadow-[0_4px_12px_rgba(220,38,38,0.2)] cursor-pointer uppercase tracking-wider border-none active:scale-95"
                                >
                                    {t("Login")}
                                </button>
                            </div>
                        )}

                        {/* Search Bar Dropdown */}
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    ref={searchRef}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 15, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-sm z-[60]"
                                >
                                    <div className="bg-white dark:bg-black/95 backdrop-blur-xl border border-slate-200/60 dark:border-border/50 rounded-2xl shadow-2xl p-4 overflow-hidden">
                                        <form 
                                            onSubmit={(e) => {
                                                e.preventDefault()
                                                if (headerSearch.trim()) {
                                                    router.push(`/category/motors?search=${encodeURIComponent(headerSearch.trim())}`)
                                                    setIsSearchOpen(false)
                                                    setHeaderSearch("")
                                                }
                                            }}
                                            className="relative group"
                                        >
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-muted-foreground group-focus-within:text-accent transition-colors" />
                                            <input
                                                suppressHydrationWarning
                                                autoFocus
                                                type="text"
                                                value={headerSearch}
                                                onChange={(e) => setHeaderSearch(e.target.value)}
                                                placeholder={t("Search auctions, items, prices...")}
                                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-border/50 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none text-black dark:text-white"
                                            />
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            suppressHydrationWarning
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn(
                                "md:hidden p-2.5 transition-colors rounded-full cursor-pointer",
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

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
                        />
                        <motion.div
                            initial={{ x: language === 'ar' ? "-100%" : "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: language === 'ar' ? "-100%" : "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={cn(
                                "fixed top-0 bottom-0 w-80 bg-white dark:bg-black border-slate-200 dark:border-slate-800 z-[101] shadow-2xl p-6 flex flex-col justify-between md:hidden overflow-y-auto",
                                language === 'ar' ? "left-0 border-r" : "right-0 border-l"
                            )}
                            dir={language === 'ar' ? 'rtl' : 'ltr'}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/80 dark:border-slate-700/80">
                                            <img
                                                src="/images/uae-flag-ribbon.png"
                                                alt="UAE Flag"
                                                className="h-2 w-auto object-contain"
                                            />
                                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                UAE
                                            </span>
                                        </div>
                                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                            <img
                                                src="/images/saaed-logo.png"
                                                alt="Saaed"
                                                className="h-9 w-auto object-contain dark:brightness-0 dark:invert"
                                            />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-4">
                                    <Link
                                        href="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-red-600 dark:text-red-500 hover:text-red-600/80 transition-colors text-start"
                                    >
                                        {t("Home")}
                                    </Link>
                                    
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-bold text-slate-400 dark:text-slate-500 text-start">
                                            {t("Services")}
                                        </span>
                                        <div className="grid grid-cols-2 gap-2 pl-2 pr-2">
                                            {[
                                                { name: "Motors", path: "/category/motors" },
                                                { name: "Real Estate", path: "/category/real%20estate" },
                                                { name: "Jewelry", path: "/category/jewelry" },
                                                { name: "Plates", path: "/category/plates" },
                                                { name: "Watches", path: "/category/watches" },
                                                { name: "General", path: "/category/general" }
                                            ].map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.path}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-500 transition-colors text-start"
                                                >
                                                    {t(item.name)}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href="/about"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-500 transition-colors text-start"
                                    >
                                        {t("About Us")}
                                    </Link>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-500 transition-colors text-start"
                                    >
                                        {t("Contact Us")}
                                    </Link>
                                    <Link
                                        href="/how-to-buy"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-500 transition-colors text-start"
                                    >
                                        {t("How to Buy")}
                                    </Link>
                                </nav>
                            </div>

                            <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        suppressHydrationWarning
                                        onClick={() => {
                                            setLanguage(language === "en" ? "ar" : "en");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-xs border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-black dark:text-white cursor-pointer"
                                    >
                                        <Globe className="w-4 h-4 text-red-600 dark:text-red-500" />
                                        {language === "en" ? "العربية" : "English"}
                                    </button>
                                    <ThemeToggle />
                                </div>

                                {/* Mobile Add Vehicle for Auction Button */}
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        handleAddVehicleClick()
                                    }}
                                    className="w-full py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer border-none"
                                >
                                    <Plus className="w-4 h-4 stroke-[3]" />
                                    <span>{language === 'ar' ? 'أضف مركبة للمزاد' : 'Add Vehicle for Auction'}</span>
                                </button>

                                {isLoggedIn ? (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={getPortalHref()}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full py-3 rounded-2xl text-sm font-black bg-slate-950 dark:bg-slate-800 text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition-all cursor-pointer border-none shadow-md text-center block"
                                        >
                                            {userRole === "admin" ? "Admin Panel" :
                                             userRole === "yard" ? "Yard Portal" :
                                             userRole === "itc" ? "ITC Portal" :
                                             userRole === "inspect" ? "Integrations" :
                                             "Dashboard"}
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full py-3 rounded-2xl text-sm font-black bg-red-600 hover:bg-red-700 text-white transition-all shadow-[0_4px_12px_rgba(220,38,38,0.2)] cursor-pointer border-none active:scale-95"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                openAuthModal("signup");
                                            }}
                                            className="w-full py-3 rounded-2xl text-sm font-black bg-slate-950 dark:bg-slate-800 text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition-all cursor-pointer border-none shadow-md"
                                        >
                                            {t("Register")}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                openAuthModal("login");
                                            }}
                                            className="w-full py-3 rounded-2xl text-sm font-black bg-red-600 hover:bg-red-700 text-white transition-all shadow-[0_4px_12px_rgba(220,38,38,0.2)] cursor-pointer border-none active:scale-95"
                                        >
                                            {t("Login")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultTab={authView}
                noticeTitle={authNotice.title}
                noticeDesc={authNotice.desc}
            />
        </>
    )
}
