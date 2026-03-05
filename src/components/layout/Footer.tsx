"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
    const { t, language } = useLanguage()

    return (
        <footer className="bg-slate-950 text-slate-400 py-16 rounded-t-[3rem] mt-20 relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className={`space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <img
                                src="/images/saaed-logo.png"
                                alt="Saaed"
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            {t("Footer Description")}
                        </p>
                    </div>

                    {/* Links */}
                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">{t("Platform")}</h3>
                        <ul className="space-y-3 text-sm">
                            {['Live Auctions', 'Ending Soon', 'Motors', 'Real Estate', 'Consignments'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 hover:text-accent transition-colors">
                                        {t(item)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">{t("Support")}</h3>
                        <ul className="space-y-3 text-sm">
                            {['Help Center', 'Safety & Security', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 hover:text-accent transition-colors">
                                        {t(item)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                        <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">{t("Stay Updated")}</h3>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                            {t("Newsletter Description")}
                        </p>
                        <div className={`flex gap-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <input
                                suppressHydrationWarning
                                type="email"
                                placeholder={t("Enter email")}
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-accent/50 transition-all text-white"
                            />
                            <button
                                suppressHydrationWarning
                                className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-accent/90 transition-all hover:scale-105 shadow-lg shadow-accent/20 shrink-0"
                            >
                                {t("Join")}
                            </button>
                        </div>
                        <div className={`flex gap-4 mt-8 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-slate-500 hover:text-white transition-all hover:scale-110">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div suppressHydrationWarning className="border-t border-white/5 mt-16 pt-8 text-center text-xs text-slate-600 font-medium">
                    © {new Date().getFullYear()} {t("Rights Reserved")}
                </div>
            </div>
        </footer>
    )
}
