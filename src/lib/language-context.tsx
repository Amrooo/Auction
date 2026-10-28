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
        "Load More": "Load More",
        // Hero Section & Custom filters
        "Find Your Car in Just Few Clicks": "Find Your Car in Just Few Clicks",
        "Discover premium vehicles, exclusive luxury watches, VIP plates, and high-end real estate listings with AI-driven valuation estimates.": "Discover premium vehicles, exclusive luxury watches, VIP plates, and high-end real estate listings with AI-driven valuation estimates.",
        "Live Auction": "Live Auction",
        "Bidding Now": "Bidding Now",
        "Register": "Register",
        "Login": "Login",
        "Services": "Services",
        "About Us": "About Us",
        "How to Buy": "How to Buy",
        "Keyword": "Keyword",
        "Property Type": "Property Type",
        "Location": "Location",
        "Bedrooms": "Bedrooms",
        "Material": "Material",
        "Gemstone": "Gemstone",
        "Collection": "Collection",
        "Plate Number": "Plate Number",
        "Emirate": "Emirate",
        "Digits": "Digits",
        "Plate Code": "Plate Code",
        "Brand": "Brand",
        "Movement": "Movement",
        "Sub Category": "Sub Category",
        "Source": "Source",
        "Price": "Price",
        "Top Car Makes, All in One Place": "Top Car Makes, All in One Place",
        "Certified Quality & Authenticity": "Certified Quality & Authenticity",
        "View all": "View all",
        "Nissan": "Nissan",
        "Hyundai": "Hyundai",
        "Kia": "Kia",
        "Toyota": "Toyota",
        "Lexus": "Lexus",
        "Mercedes Benz": "Mercedes Benz",
        "Land Rover": "Land Rover",
        "Chevrolet": "Chevrolet",
        "Honda": "Honda",
        "Ford": "Ford",
        "Dodge": "Dodge",
        "Saaed new online Auto Auctions": "Saaed new online Auto Auctions",
        "Bid on Premium Government Lots": "Bid on Premium Government Lots",
        "Access verified state-owned assets, salvage vehicles, and commercial real estate directly from official agencies.": "Access verified state-owned assets, salvage vehicles, and commercial real estate directly from official agencies.",
        "Exclusive Watches & Fine Jewelry": "Exclusive Watches & Fine Jewelry",
        "Explore authenticated luxury timepieces and fine jewelry curated by certified appraisers with real-time bidding.": "Explore authenticated luxury timepieces and fine jewelry curated by certified appraisers with real-time bidding.",
        "2021 Toyota Land Cruiser V8 (SafeYard Impound)": "2021 Toyota Land Cruiser V8 (SafeYard Impound)",
        "2018 Nissan Patrol Platinum (Scrap / Salvage)": "2018 Nissan Patrol Platinum (Scrap / Salvage)",
        "2020 Mercedes-Benz C300 (External Seller)": "2020 Mercedes-Benz C300 (External Seller)",
        "2019 Lexus RX350 (Court Impound)": "2019 Lexus RX350 (Court Impound)",
        "High Demand": "High Demand",
        "Scrap Value High": "Scrap Value High",
        "Clean Title": "Clean Title",
        "Ready for Release": "Ready for Release",
        "Inspection Location": "Inspection Location",
        "Inspection Location Branch": "Inspection Location Branch",
        "View on Google maps": "View on Google maps",
        "Terms And Conditions": "Terms And Conditions",
        "Terms and Conditions Description": "Saaed's terms and conditions of public auction shall apply, along with the following terms and conditions",
        "Source Entity": "Source Entity",
        "All Entities": "All Entities",
        "Select Entity": "Select Entity",
        "Add Vehicle for Auction": "Add Vehicle for Auction",
        "My Listed Vehicles": "My Listed Vehicles"
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
        "Load More": "عرض المزيد",
        // New Arabic translations
        "Find Your Car in Just Few Clicks": "ابحث عن سيارتك ببضع نقرات فقط",
        "Discover premium vehicles, exclusive luxury watches, VIP plates, and high-end real estate listings with AI-driven valuation estimates.": "اكتشف السيارات الفاخرة، الساعات الحصرية، الأرقام المميزة، والعقارات الراقية مع تقديرات قيمتها المدعومة بالذكاء الاصطناعي.",
        "Live Auction": "مزاد مباشر",
        "Bidding Now": "زاود الآن",
        "Register": "تسجيل",
        "Login": "تسجيل الدخول",
        "Services": "خدماتنا",
        "About Us": "من نحن",
        "How to Buy": "طريقة الشراء",
        "Keyword": "الكلمة المفتاحية",
        "Property Type": "نوع العقار",
        "Location": "الموقع",
        "Bedrooms": "الغرف",
        "Material": "المادة",
        "Gemstone": "الأحجار الكريمة",
        "Collection": "المجموعة",
        "Plate Number": "رقم اللوحة",
        "Emirate": "الإمارة",
        "Digits": "عدد الأرقام",
        "Plate Code": "رمز اللوحة",
        "Brand": "الماركة",
        "Movement": "الحركة",
        "Sub Category": "الفئة الفرعية",
        "Source": "المصدر",
        "Price": "السعر",
        "Top Car Makes, All in One Place": "أشهر ماركات السيارات في مكان واحد",
        "Certified Quality & Authenticity": "جودة وموثوقية مضمونة",
        "View all": "عرض الكل",
        "Nissan": "نيسان",
        "Hyundai": "هيونداي",
        "Kia": "كيا",
        "Toyota": "تويوتا",
        "Lexus": "لكزس",
        "Mercedes Benz": "مرسيدس بنز",
        "Land Rover": "لاند روفر",
        "Chevrolet": "شيفروليه",
        "Honda": "هوندا",
        "Ford": "فورد",
        "Dodge": "دودج",
        "Saaed new online Auto Auctions": "مزادات ساعد الجديدة للسيارات عبر الإنترنت",
        "Bid on Premium Government Lots": "زاود على حصص حكومية مميزة",
        "Access verified state-owned assets, salvage vehicles, and commercial real estate directly from official agencies.": "الوصول إلى الأصول الحكومية المعتمدة، وسيارات الحوادث، والعقارات التجارية مباشرة من الجهات الرسمية.",
        "Exclusive Watches & Fine Jewelry": "ساعات ومجوهرات حصرية فاخرة",
        "Explore authenticated luxury timepieces and fine jewelry curated by certified appraisers with real-time bidding.": "استكشف الساعات الفاخرة والمجوهرات النادرة المعتمدة من خبراء التقييم مع مزايدة مباشرة.",
        "2021 Toyota Land Cruiser V8 (SafeYard Impound)": "تويوتا لاند كروزر 2021 (حجز الساحات)",
        "2018 Nissan Patrol Platinum (Scrap / Salvage)": "نيسان باترول 2018 (سكراب / شطب)",
        "2020 Mercedes-Benz C300 (External Seller)": "مرسيدس بنز 2020 (بائع خارجي)",
        "2019 Lexus RX350 (Court Impound)": "لكزس 2019 (حجز المحكمة)",
        "High Demand": "طلب مرتفع",
        "Scrap Value High": "قيمة سكراب عالية",
        "Clean Title": "ملكية خالية من الرهون",
        "Ready for Release": "جاهز للإفراج",
        "Inspection Location": "موقع المعاينة",
        "Inspection Location Branch": "فرع موقع المعاينة",
        "View on Google maps": "عرض على خرائط Google",
        "Terms And Conditions": "الشروط والأحكام",
        "Terms and Conditions Description": "تطبق الشروط والأحكام الخاصة بالمزاد العلني لشركة ساعد، بالإضافة إلى الشروط والأحكام التالية:",
        "Source Entity": "الجهة المصدرة",
        "All Entities": "جميع الجهات",
        "Select Entity": "اختر الجهة",
        "Add Vehicle for Auction": "أضف مركبة للمزاد",
        "My Listed Vehicles": "مركباتي المعروضة للمزاد"
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
