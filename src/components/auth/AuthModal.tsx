"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Github, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultTab?: "login" | "signup"
    noticeTitle?: string
    noticeDesc?: string
}

export function AuthModal({ isOpen, onClose, defaultTab = "login", noticeTitle, noticeDesc }: AuthModalProps) {
    const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { t, language } = useLanguage()
    const router = useRouter()

    // Reset tab when opening
    if (!isOpen) return null

    const handleUaePass = () => {
        localStorage.setItem("user_logged_in", "true")
        localStorage.setItem("user_role", "bidder")
        localStorage.setItem("user_name", language === 'ar' ? "مواطن إماراتي" : "Emirati Bidder")
        localStorage.setItem("user_email", "uaepass@digitaldubai.ae")
        window.dispatchEvent(new Event("login_state_change"))
        onClose()
        const redirectTarget = localStorage.getItem("auth_redirect_target")
        if (redirectTarget) {
            localStorage.removeItem("auth_redirect_target")
            router.push(redirectTarget)
        } else {
            router.push("/dashboard")
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            onClose()
            const emailLower = email.toLowerCase()
            localStorage.setItem("user_logged_in", "true")
            localStorage.setItem("user_email", email)

            const fallbackName = email.split("@")[0] 
                ? (email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)) 
                : "Amro"
            const resolvedName = name.trim() || fallbackName
            localStorage.setItem("user_name", resolvedName)

            if (emailLower.includes("admin")) {
                localStorage.setItem("user_role", "admin")
                window.dispatchEvent(new Event("login_state_change"))
                router.push("/admin")
            } else if (emailLower.includes("yard") || emailLower.includes("supervisor")) {
                localStorage.setItem("user_role", "yard")
                window.dispatchEvent(new Event("login_state_change"))
                router.push("/admin/safeyard")
            } else if (emailLower.includes("itc") || emailLower.includes("transport")) {
                localStorage.setItem("user_role", "itc")
                window.dispatchEvent(new Event("login_state_change"))
                router.push("/admin/itc")
            } else if (emailLower.includes("inspect")) {
                localStorage.setItem("user_role", "inspect")
                window.dispatchEvent(new Event("login_state_change"))
                router.push("/admin/integrations")
            } else {
                localStorage.setItem("user_role", "bidder")
                window.dispatchEvent(new Event("login_state_change"))
                const redirectTarget = localStorage.getItem("auth_redirect_target")
                if (redirectTarget) {
                    localStorage.removeItem("auth_redirect_target")
                    router.push(redirectTarget)
                } else {
                    router.push("/dashboard")
                }
            }
        }, 800)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/20"
                    >
                        {/* Abstract Background Decoration */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Header & Tabs */}
                        <div className="p-8 pb-0 relative z-10">
                            <button 
                                onClick={onClose} 
                                className={cn(
                                    "absolute top-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer z-20",
                                    language === 'ar' ? "left-6" : "right-6"
                                )}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {noticeTitle && (
                                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-start">
                                    <h4 className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                                        {noticeTitle}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                                        {noticeDesc || (language === 'ar' ? 'يجب تسجيل الدخول لمتابعة إضافة مركبتك للمزاد.' : 'Sign in is required to continue adding your vehicle for auction.')}
                                    </p>
                                </div>
                            )}

                            <div className={`mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t("Welcome")}</h2>
                                <p className="text-slate-500 dark:text-slate-400">{t("Welcome Description")}</p>
                            </div>

                            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
                                {["login", "signup"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={cn(
                                            "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer capitalize",
                                            activeTab === tab
                                                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                                        )}
                                    >
                                        {tab === "signup" ? t("Get Started") : t("Log In")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="px-8 pb-8 relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {activeTab === "signup" && (
                                    <div className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                        <label className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t("Full Name")}</label>
                                        <div className="relative">
                                            <User className={`absolute top-3.5 w-5 h-5 text-slate-400 ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                                            <input
                                                type="text"
                                                placeholder={language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={`w-full py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white font-medium ${language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                    <label className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t("Email Address")}</label>
                                    <div className="relative">
                                        <Mail className={`absolute top-3.5 w-5 h-5 text-slate-400 ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`w-full py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white font-medium ${language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                    <label className={`text-xs font-bold uppercase tracking-wider text-slate-500 ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t("Password")}</label>
                                    <div className="relative">
                                        <Lock className={`absolute top-3.5 w-5 h-5 text-slate-400 ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className={`w-full py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white font-medium ${language === 'ar' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                                            required
                                        />
                                    </div>
                                </div>

                                {activeTab === "login" && (
                                    <div className={`flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
                                        <a href="#" className="text-xs font-bold text-primary hover:underline">{t("Forgot Password?")}</a>
                                    </div>
                                )}

                                <Button
                                    className="w-full h-12 text-lg rounded-xl mt-6 cursor-pointer bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all font-bold shadow-lg shadow-slate-900/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                                        </motion.div>
                                    ) : (
                                        <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                                            {activeTab === "signup" ? t("Create Account") : t("Sign In")}
                                            <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                                        </div>
                                    )}
                                </Button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase z-10">
                                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold">{t("Or continue with")}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button 
                                    onClick={handleUaePass}
                                    className={`w-full h-14 flex items-center justify-center gap-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white hover:bg-slate-50 transition-all duration-300 cursor-pointer shadow-sm group ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                                >
                                    <img
                                        src="/images/uae-pass-fingerprint.png"
                                        alt="UAE Pass"
                                        className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <span className="text-slate-900 font-bold text-sm">{t("Sign in with UAE Pass")}</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
