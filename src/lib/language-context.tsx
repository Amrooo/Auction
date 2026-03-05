"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Cairo } from "next/font/google"

const cairo = Cairo({ subsets: ["arabic", "latin"] })

type Language = "en" | "ar"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
    en: {
        "Home": "Home",
        "Auctions": "Auctions",
        "Motors": "Motors",
        "Real Estate": "Real Estate",
        "About": "About",
        "Log In": "Log In",
        "Get Started": "Get Started",
        "Search": "Search",
        "Bid Smarter.": "Bid Smarter.",
        "Win Bigger.": "Win Bigger.",
        "Hero Description": "Experience the next generation of auctions. Our AI analyzes market trends to predict prices, detect undervalued gems, and personalize your feed.",
        "Start Bidding": "Start Bidding",
        "How It Works": "How It Works",
        "Live Auctions": "Live Auctions",
        "Daily Volume": "Daily Volume",
        "Prediction": "Prediction",
        "Undervalued": "Undervalued",
        "Live Bid": "Live Bid",
        // Categories Section
        "Explore Categories": "Explore Categories",
        "Categories Description": "Discover premium assets across our most popular categories. Our AI curates the best deals for you daily.",
        "Plates": "Plates",
        "Jewelry": "Jewelry",
        "Watches": "Watches",
        "General": "General",
        "listings": "listings",
        "Vehicles": "Vehicles",
        "Lots": "Lots",
        "Official Partners": "Official Partners",
        "View All": "View All",
        "Happening now. Don't miss out.": "Happening now. Don't miss out.",
        "Partners Description": "Bid on exclusive inventory directly from government entities. Verified, trusted, and premium assets.",
        // Footer
        "Footer Description": "The next generation of auction platforms powered by artificial intelligence. Experience smart bidding, predictive analytics, and seamless transactions.",
        "Platform": "Platform",
        "Ending Soon": "Ending Soon",
        "Consignments": "Consignments",
        "Support": "Support",
        "Help Center": "Help Center",
        "Safety & Security": "Safety & Security",
        "Terms of Service": "Terms of Service",
        "Privacy Policy": "Privacy Policy",
        "Contact Us": "Contact Us",
        "Stay Updated": "Stay Updated",
        "Newsletter Description": "Subscribe to get the latest auction alerts and AI insights.",
        "Enter email": "Enter email",
        "Join": "Join",
        "Rights Reserved": "All rights reserved.",
        // Auth Modal
        "Welcome": "Welcome",
        "Welcome Description": "Join the world's most exclusive auction.",
        "Full Name": "Full Name",
        "John Doe": "John Doe",
        "Email Address": "Email Address",
        "Password": "Password",
        "Forgot Password?": "Forgot Password?",
        "Create Account": "Create Account",
        "Sign In": "Sign In",
        "Or continue with": "Or continue with",
        "Sign in with UAE Pass": "Sign in with UAE Pass",
        // Filters and Listing
        "Smart Match Description": "Let AI analyze your preferences to find the best deals.",
        "Search make, model...": "Search make, model...",
        "Filters": "Filters",
        "Make": "Make",
        "Price Range (AED)": "Price Range (AED)",
        "Min": "Min",
        "Max": "Max",
        "Condition": "Condition",
        "New": "New",
        "Used": "Used",
        "Salvage": "Salvage",
        "Classic": "Classic",
        "Apply Filters": "Apply Filters",
        "Motors Listings": "Motors Listings",
        "AI Recommended": "AI Recommended",
        "Price: Low to High": "Price: Low to High",
        "Load More": "Load More"
    },
    ar: {
        "Home": "الرئيسية",
        "Auctions": "المزادات",
        "Motors": "السيارات",
        "Real Estate": "العقارات",
        "About": "عن الموقع",
        "Log In": "دخول",
        "Get Started": "ابـدأ الآن",
        "Search": "بحث",
        "Smart Match": "المطابقة الذكية",
        "Sort by": "ترتيب حسب",
        "Current Bid": "المزاد الحالي",
        "Ends In": "ينتهي خلال",
        "Bid Now": "زاود الآن",
        "Bids": "مزايدة",
        "Specifications": "المواصفات",
        "Bidding History": "سجل المزايدات",
        "AI Market Insight": "تحليل الذكاء الاصطناعي",
        "Verified": "موثوق",
        "Premium Lot": "مميز",
        // Hero Section
        "AI-Powered Auction Intelligence": "ذكاء المزادات المدعوم بالذكاء الاصطناعي",
        "Bid Smarter.": "مزايدة أذكى…",
        "Win Bigger.": "مكاسب أكبر",
        "Hero Description": "اكتشف الجيل الجديد من المزادات. يقوم ذكاؤنا الاصطناعي بتحليل اتجاهات السوق للتنبؤ بالأسعار واكتشاف الفرص القيمة وتخصيص تجربتك.",
        "Start Bidding": "ابدأ المزايدة",
        "How It Works": "كيف يعمل؟",
        "Live Auctions": "المزادات المباشرة",
        "Daily Volume": "حجم تداول يومي",
        "Prediction": "توقعات الذكاء الاصطناعي",
        "Undervalued": "فرصة قيمة",
        "Live Bid": "مزايدة مباشرة",
        // Categories Section
        "Explore Categories": "استكشف الفئات",
        "Categories Description": "اكتشف أصولاً مميزة عبر فئاتنا الأكثر شعبية. يقوم ذكاؤنا الاصطناعي بانتقاء أفضل الصفقات لك يومياً.",
        "Plates": "أرقام مميزة",
        "Jewelry": "مجوهرات",
        "Watches": "ساعات فاخرة",
        "General": "منوعات",
        "listings": "عرض",
        "Vehicles": "مركبة",
        "Lots": "قطعة",
        "Official Partners": "الشركاء الرسميون",
        "View All": "عرض الكل",
        "Happening now. Don't miss out.": "تحدث الآن. لا تفوت الفرصة.",
        "Partners Description": "زاود على مخزون حصري مباشرة من الجهات الحكومية. أصول موثقة وموثوقة ومميزة.",
        // Footer
        "Footer Description": "جيل جديد من منصات المزادات المدعومة بالذكاء الاصطناعي. اكتشف المزايدة الذكية والتحليلات التنبؤية والمعاملات السلسة.",
        "Platform": "المنصة",
        "Ending Soon": "تنتهي قريباً",
        "Consignments": "الإيداعات",
        "Support": "الدعم",
        "Help Center": "مركز المساعدة",
        "Safety & Security": "الأمان والسلامة",
        "Terms of Service": "شروط الخدمة",
        "Privacy Policy": "سياسة الخصوصية",
        "Contact Us": "اتصل بنا",
        "Stay Updated": "ابقَ على اطلاع",
        "Newsletter Description": "اشترك للحصول على آخر تنبيهات المزادات ورؤى الذكاء الاصطناعي.",
        "Enter email": "أدخل البريد الإلكتروني",
        "Join": "انضمام",
        "Rights Reserved": "جميع الحقوق محفوظة لشركة ساعد.",
        // Auth Modal
        "Welcome": "مرحباً بك",
        "Welcome Description": "انضم إلى المزاد الأكثر حصرية في العالم.",
        "Full Name": "الاسم الكامل",
        "John Doe": "أحمد عبدالله",
        "Email Address": "البريد الإلكتروني",
        "Password": "كلمة المرور",
        "Forgot Password?": "هل نسيت كلمة المرور؟",
        "Create Account": "إنشاء حساب",
        "Sign In": "تسجيل الدخول",
        "Or continue with": "أو المتابعة باستخدام",
        "Sign in with UAE Pass": "الدخول بالهوية الرقمية (UAE Pass)",
        // Filters and Listing
        "Smart Match Description": "دع الذكاء الاصطناعي يحلل تفضيلاتك للعثور على أفضل العروض.",
        "Search make, model...": "ابحث عن الشركة المصنعة، الموديل...",
        "Filters": "عوامل التصفية",
        "Make": "الشركة المصنعة",
        "Price Range (AED)": "نطاق السعر (درهم)",
        "Min": "الحد الأدنى",
        "Max": "الحد الأقصى",
        "Condition": "الحالة",
        "New": "جديد",
        "Used": "مستعمل",
        "Salvage": "حوادث/سكراب",
        "Classic": "كلاسيكي",
        "Apply Filters": "تطبيق عوامل التصفية",
        "Motors Listings": "إعلانات السيارات",
        "AI Recommended": "موصى به من الذكاء الاصطناعي",
        "Price: Low to High": "السعر: من الأقل للأعلى",
        "Load More": "عرض المزيد"
    }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en")

    useEffect(() => {
        // Update HTML attributes
        document.documentElement.lang = language
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

        // Update Font Family
        if (language === "ar") {
            document.body.classList.add(cairo.className)
            document.body.style.fontFamily = cairo.style.fontFamily
        } else {
            document.body.classList.remove(cairo.className)
            document.body.style.fontFamily = ""
        }
    }, [language])

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations.en] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
