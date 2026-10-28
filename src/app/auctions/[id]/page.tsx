"use client"

import { Button } from "@/components/ui/button"
import { Clock, Heart, Share2, ShieldCheck, Zap, ArrowRight, LineChart as ChartIcon, X, CheckCircle, Gavel, Maximize2, FileText, Truck, AlertCircle, Check } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn, toArabicNumerals } from "@/lib/utils"
import { AuthModal } from "@/components/auth/AuthModal"
import { useLanguage } from "@/lib/language-context"

const data = [
    { time: '10:00', bid: 850000 },
    { time: '11:00', bid: 865000 },
    { time: '12:00', bid: 880000 },
    { time: '13:00', bid: 890000 },
    { time: '14:00', bid: 920000 },
    { time: '15:00', bid: 950000 },
]

// Suppress Recharts warning about defaultProps in development
const originalConsoleError = console.error;
console.error = (...args) => {
    if (typeof args[0] === 'string' && /defaultProps/.test(args[0])) {
        return;
    }
    originalConsoleError(...args);
};

const images = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop", // Front 3/4 Exterior Angle
    "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2670&auto=format&fit=crop", // Side Profile & Aerodynamics
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2670&auto=format&fit=crop", // Front Grille & Headlight Close-up
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2670&auto=format&fit=crop", // Rear 3/4 & Tail Stance
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2670&auto=format&fit=crop", // Interior Cabin & Cockpit
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2670&auto=format&fit=crop", // Performance Alloy Wheel & Caliper
]

import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function AuctionDetailPage() {
    const params = useParams()
    const vehicleId = (params?.id as string) || "m1"
    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'

    const [vehicle, setVehicle] = useState<any>(null)
    const [activeImage, setActiveImage] = useState(0)
    const [isBidOpen, setIsBidOpen] = useState(false)
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
    const [isTermsAccepted, setIsTermsAccepted] = useState(false)
    const [termsError, setTermsError] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [authTab, setAuthTab] = useState<"login" | "signup">("login")
    const [pendingAction, setPendingAction] = useState<"bid" | null>(null)
    const [bidAmount, setBidAmount] = useState(960000)
    const [showSuccess, setShowSuccess] = useState(false)

    // Fetch dynamic vehicle data from Web Service API
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await fetch(`/api/vehicles/${vehicleId}`)
                if (res.ok) {
                    const json = await res.json()
                    if (json.success && json.data) {
                        setVehicle(json.data)
                        const nextMin = Number(json.data.currentBid || 0) + Number(json.data.minimumIncrement || 1000)
                        setBidAmount(nextMin)
                    }
                }
            } catch (err) {
                console.error("Error fetching vehicle details:", err)
            }
        }
        if (vehicleId) fetchVehicle()
    }, [vehicleId])

    const handleAction = (action: "bid") => {
        if (!isTermsAccepted) {
            setTermsError(true)
            setIsTermsModalOpen(true)
            return
        }
        setTermsError(false)
        if (!isLoggedIn) {
            setAuthTab("login")
            setPendingAction(action)
            setIsAuthModalOpen(true)
        } else {
            if (action === "bid") setIsBidOpen(true)
        }
    }

    const handleAuthComplete = () => {
        setIsLoggedIn(true)
        setIsAuthModalOpen(false)
        if (pendingAction === "bid") {
            setIsBidOpen(true)
        }
        setPendingAction(null)
    }

    const handleBidSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/vehicles/${vehicleId}/bid`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: bidAmount, bidderName: "Registered Bidder" })
            })
            if (res.ok) {
                const json = await res.json()
                if (json.success && json.vehicle) {
                    setVehicle(json.vehicle)
                }
            }
        } catch (err) {
            console.error("Error submitting bid:", err)
        }
        setIsBidOpen(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const displayImages = (vehicle?.images && vehicle.images.length > 0) ? vehicle.images : images
    const currentPrice = vehicle?.currentBid || 950000
    const vehicleTitle = vehicle?.title ? (isAr && vehicle.titleAr ? vehicle.titleAr : vehicle.title) : (isAr ? 'مرسيدس AMG G63 2024' : '2024 Mercedes-AMG G63')
    const vehicleSubtitle = vehicle?.trim || (isAr ? 'الإصدار الكبير • 1 من 1000 • صفر كيلومتر' : 'Grand Edition • 1 of 1000 • 0km Mileage')
    const entityName = vehicle?.sourceEntity ? (isAr ? vehicle.sourceEntity.arabicName : vehicle.sourceEntity.name) : (isAr ? 'أبوظبي للتنقل' : 'Abu Dhabi Mobility')
    const entityLogo = vehicle?.sourceEntity?.logo || '/images/abu-dhabi-mobility.png'

    // Translated specs with Arabic numerals support
    const specs = isAr ? [
        { label: 'الجهة المصدرة', value: entityName, logo: entityLogo },
        { label: 'المحرك', value: vehicle?.engineAr || vehicle?.engine || `٤.٠ لتر V8 بيتوربو` },
        { label: 'القوة', value: `${toArabicNumerals(vehicle?.powerHp || 577)} حصان` },
        { label: 'ناقل الحركة', value: vehicle?.transmissionAr || vehicle?.transmission || `أوتوماتيك ٩ سرعات` },
        { label: '٠-١٠٠ كم/ساعة', value: vehicle?.acceleration0100 ? `${toArabicNumerals(vehicle.acceleration0100)}` : `٤.٥ ثانية` },
        { label: 'اللون', value: vehicle?.exteriorColorAr || vehicle?.exteriorColor || 'أسود ليلي مات' },
        { label: 'الداخلية', value: vehicle?.interiorColorAr || vehicle?.interiorColor || 'أحمر البنغال / أسود' },
        { label: 'رقم الهيكل', value: vehicle?.vin || 'W1N463***291' }
    ] : [
        { label: 'Source Entity', value: entityName, logo: entityLogo },
        { label: 'Engine', value: vehicle?.engine || '4.0L V8 Biturbo' },
        { label: 'Power', value: `${vehicle?.powerHp || 577} HP` },
        { label: 'Transmission', value: vehicle?.transmission || '9-Speed Auto' },
        { label: '0-100 km/h', value: vehicle?.acceleration0100 || '4.5s' },
        { label: 'Color', value: vehicle?.exteriorColor || 'Night Black Magno' },
        { label: 'Interior', value: vehicle?.interiorColor || 'Bengal Red / Black' },
        { label: 'VIN', value: vehicle?.vin || 'W1N463***291' }
    ]

    // Saaed terms and conditions
    const terms = isAr ? [
        "تباع المركبة على حالتها الراهنة وفي مكان تواجدها 'كما هي'، ويتحمل المشتري كامل المسؤولية عن فحص ومعاينة المعروض قبل تقديم أي مزايدة، ولا تتحمل شركة ساعد أي ضمانات أو مسؤولية بعد رسو المزاد.",
        "تطبق الرسوم الإدارية بالإضافة إلى ضريبة القيمة المضافة على كل معروض على النحو التالي: ٢٠٠ درهم لسعر البيع حتى ٥٠٠ درهم، ٣٠٠ درهم لسعر البيع بين ٥٠١ درهم و ١,٠٠٠ درهم، ٦٠٠ درهم لسعر البيع بين ١,٠٠١ درهم و ١٠٠,٠٠٠ درهم، ١٪ من سعر البيع لما فوق ١٠٠,٠٠٠ درهم.",
        "يجب إتمام عملية الدفع واستلام المعروض خلال ٤٨ ساعة من وقت انتهاء المزاد. يتم إنهاء مستندات المعروض خلال ١٠ أيام عمل تقريباً من تاريخ إتمام عملية الدفع.",
        "تحتفظ شركة ساعد بالحق في تطبيق رسوم قدرها ١٠٠ درهم عن كل يوم تأخير، دون إشعار مسبق، لأي مركبة لم يتم سداد قيمتها أو استلامها خلال المدة المحددة.",
        "شركة ساعد غير مسؤولة على الإطلاق عن المدة المستغرقة لإصدار أوراق نقل الملكية.",
        "تطبق رسوم تحميل/تنزيل قدرها ١٠٠ درهم عن كل سيارة.",
        "شركة ساعد لا تضمن تسجيل السيارات الكلاسيكية.",
        "يتحمل المشتري ٢٠٠ درهم رسوم إصدار الحيازة ... وفي حال تطلب إصدار الحيازة إجراء فحص تصدير، يتعين على المشتري إجراء الفحص وتسليمه إلى شركة ساعد لإصدار الحيازة على نفقة المشتري."
    ] : [
        "The customer purchases the vehicle strictly on an 'as-is, where-is' basis. The bidder assumes full responsibility for inspecting and verifying the vehicle's condition prior to placing any bids. Saaed provides no warranties or guarantees whatsoever post-sale.",
        "Administrative fee plus VAT shall apply to each item as follows: 200 AED for sale price up to 500 AED, 300 AED for sale price between 501 AED and 1,000 AED, 600 AED for sale price between 1,001 AED and 100,000 AED, 1 percent of sale price above AED 100,000.",
        "You must complete payment and collection of the Lot within 48 hours from the time of auction's conclusion. Documents of the lot shall be finalized within approximately 10 working days of completing the payment process.",
        "Saaed reserves the right to apply fees of 100AED for each delay, without prior notice, for any vehicle not paid or received within the specified period",
        "Saaed is not responsible whatsoever for the period of issuing ownership documents.",
        "AED 100 loading/unloading fees will be applied for each car.",
        "Saaed shall not guarantee the registration of the classic cars.",
        "The buyer bears 200 dirhams of possession issuance fees ... In the event that the issuance of possession requires an export examination, the buyer must conduct the examination and hand it over to Saaed to issue the possession at the buyer’s expense"
    ]

    return (
        <div className="container mx-auto px-4 py-8 lg:py-12 relative" dir={dir}>
            {/* Global Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => handleAuthComplete()}
                defaultTab={authTab}
            />

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold text-lg">{isAr ? 'تمت العملية بنجاح!' : 'Action Successful!'}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bid Modal Overlay */}
            <AnimatePresence>
                {isBidOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setIsBidOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden"
                            dir={dir}
                        >
                            <button onClick={() => setIsBidOpen(false)} className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer`}>
                                <X className="w-6 h-6" />
                            </button>

                            <form onSubmit={handleBidSubmit}>
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-900 dark:text-white">
                                    <Gavel className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{isAr ? 'قدّم مزايدتك' : 'Place Your Bid'}</h2>
                                <p className="text-slate-500 mb-6">
                                    {isAr ? 'أعلى مزايدة حالية:' : 'Current Highest:'} <span className="font-bold text-slate-900 dark:text-white">
                                        {isAr ? `${toArabicNumerals(Number(currentPrice).toLocaleString())} درهم` : `AED ${Number(currentPrice).toLocaleString()}`}
                                    </span>
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className={`text-sm font-medium text-slate-700 dark:text-slate-300 ${isAr ? 'mr-1' : 'ml-1'}`}>{isAr ? 'حد مزايدتك (درهم)' : 'Your Max Bid (AED)'}</label>
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(Number(e.target.value))}
                                            className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-lg font-bold"
                                        />
                                        <p className={`text-xs text-slate-400 mt-2 ${isAr ? 'mr-1 text-right' : 'ml-1'}`}>
                                            {isAr ? `الحد الأدنى للزيادة: ${toArabicNumerals(vehicle?.minimumIncrement || 5000)} درهم` : `Minimum bid increment: AED ${(vehicle?.minimumIncrement || 5000).toLocaleString()}`}
                                        </p>
                                    </div>
                                    <Button size="lg" className="w-full h-12 rounded-xl text-lg mt-4 cursor-pointer">{isAr ? 'تأكيد المزايدة' : 'Confirm Bid'}</Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <div className="space-y-4">
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 relative group shadow-2xl border border-white/10"
                    >
                        <img
                            src={displayImages[activeImage]}
                            alt="Vehicle Preview"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop"
                            }}
                        />
                        <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors border border-white/20 cursor-pointer">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-colors border border-white/20 cursor-pointer">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-6 gap-3">
                        {displayImages.map((img: string, i: number) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveImage(i)}
                                className={cn(
                                    "aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer transition-all border-2",
                                    activeImage === i ? "border-primary ring-2 ring-primary/20 ring-offset-2 dark:ring-offset-slate-950" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop"
                                    }}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="space-y-8 flex flex-col justify-center">
                    <div>
                        <div className={`flex flex-wrap items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                {t("Premium Lot")}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                                <ShieldCheck className="w-3 h-3" /> {t("Verified")}
                            </span>

                            <div className={`inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs ${isAr ? 'flex-row-reverse' : ''}`}>
                                <div className="w-9 h-5 bg-white rounded p-0.5 flex items-center justify-center shrink-0">
                                    <img
                                        src={entityLogo}
                                        alt="Abu Dhabi Mobility"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                                    {entityName}
                                </span>
                            </div>
                        </div>
                        <h1 className={`text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
                            {vehicleTitle}
                        </h1>
                        <p className={`text-slate-500 dark:text-slate-400 text-lg font-medium ${isAr ? 'text-right' : 'text-left'}`}>
                            {vehicleSubtitle}
                        </p>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

                        <div className={`flex flex-col sm:flex-row justify-between items-end mb-8 relative z-10 gap-4 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-widest">{t("Current Bid")}</p>
                                <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    {isAr ? `${toArabicNumerals('950,000')} درهم` : 'AED 950,000'}
                                </div>
                            </div>
                            <div className={`bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 ${isAr ? 'text-right' : 'text-left sm:text-right'}`}>
                                <div className={`flex items-center gap-2 text-orange-600 font-bold mb-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                                    <Clock className="w-4 h-4 animate-pulse" />
                                    <span className="font-mono">
                                        {isAr ? `${toArabicNumerals(4)}س ${toArabicNumerals(20)}د ${toArabicNumerals(15)}ث` : '4h 20m 15s'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium">
                                    {isAr ? `ينتهي اليوم، الساعة ${toArabicNumerals(6)}:٠٠ مساءً` : 'Ends Today, 6:00 PM'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-4 relative z-10">
                            <Button size="lg" onClick={() => handleAction("bid")} className="w-full text-lg h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.01] cursor-pointer font-black">
                                {isAr ? 'قدّم مزايدة' : 'Place Bid'} <span className="opacity-70 ml-2 font-normal text-sm">{isAr ? `(الحد الأدنى: ${toArabicNumerals('960,000')} درهم)` : '(Min AED 960,000)'}</span>
                            </Button>

                            <div className={`flex items-start gap-2.5 text-xs pt-1 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                <input
                                    type="checkbox"
                                    id="agreeTerms"
                                    checked={isTermsAccepted}
                                    onChange={(e) => {
                                        setIsTermsAccepted(e.target.checked)
                                        if (e.target.checked) setTermsError(false)
                                    }}
                                    className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer shrink-0"
                                />
                                <label htmlFor="agreeTerms" className={cn(
                                    "select-none cursor-pointer leading-tight font-medium",
                                    termsError ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-600 dark:text-slate-400"
                                )}>
                                    {isAr ? 'أوافق على ' : 'I agree to the '}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setIsTermsModalOpen(true)
                                        }}
                                        className="text-red-600 dark:text-red-400 font-bold underline hover:text-red-700 cursor-pointer inline"
                                    >
                                        {isAr ? 'الشروط والأحكام الخاصة بشركة ساعد' : 'Saaed Auction Terms & Conditions'}
                                    </button>
                                </label>
                            </div>

                            <div className="space-y-2 pt-2">
                                <p className={`text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 ${isAr ? 'text-right' : 'text-left'}`}>
                                    {isAr ? 'مزايدة سريعة (درهم)' : 'Quick Bid (AED)'}
                                </p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[100, 200, 400, 800].map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => {
                                                setBidAmount(950000 + amount);
                                                handleAction("bid");
                                            }}
                                            className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 cursor-pointer flex items-center justify-center gap-0.5 shadow-sm"
                                        >
                                            +{isAr ? toArabicNumerals(amount) : amount}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className={`text-center text-xs text-slate-400 relative z-10`}>
                            {isAr ? `*جميع المزايدات ملزمة قانوناً. يشترط وديعة ${toArabicNumerals(5)}٪.` : '*All bids are legally binding. 5% deposit required.'}
                        </p>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className={`flex items-start gap-4 relative z-10 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
                                <Zap className="w-6 h-6 fill-current" />
                            </div>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-2">
                                    {t("AI Market Insight")}
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-200/50 dark:bg-indigo-500/20 text-[10px] uppercase font-bold tracking-wider text-indigo-700 dark:text-indigo-300">Beta</span>
                                </h3>
                                <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed max-w-md">
                                    {isAr
                                        ? <>هذا العرض <span className="font-bold text-indigo-700 dark:text-white decoration-2 underline decoration-indigo-400/50">مقيّم بأقل من قيمته بنسبة {toArabicNumerals(8)}٪</span> مقارنةً بطرازات G63 المماثلة. الطلب <span className="font-bold text-green-600 dark:text-green-400">مرتفع</span>، والأسعار في اتجاه تصاعدي (+{toArabicNumerals(5)}٪).</>
                                        : <>This lot is currently <span className="font-bold text-indigo-700 dark:text-white decoration-2 underline decoration-indigo-400/50">undervalued by 8%</span> compared to similar G63 Grand Edition models. Demand is <span className="font-bold text-green-600 dark:text-green-400">High</span>, with prices trending upwards (+5%).</>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className={`flex items-center justify-between mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    <ChartIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("Bidding History")}</h3>
                            </div>
                            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium px-3 py-2 text-slate-600 dark:text-slate-300 outline-none cursor-pointer">
                                <option>{isAr ? 'آخر ٢٤ ساعة' : 'Last 24 Hours'}</option>
                                <option>{isAr ? 'كل الوقت' : 'All Time'}</option>
                            </select>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)' }}
                                        itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                        formatter={(value: any) => [isAr ? `${toArabicNumerals(Number(value || 0).toLocaleString())} درهم` : `AED ${Number(value || 0).toLocaleString()}`, isAr ? 'مبلغ المزايدة' : 'Bid Amount']}
                                    />
                                    <Area type="monotone" dataKey="bid" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBid)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <h3 className={`font-bold text-slate-900 dark:text-white mb-6 text-xl ${isAr ? 'text-right' : 'text-left'}`}>
                            {t("Specifications")}
                        </h3>
                        <div className="space-y-0">
                            {specs.map((spec) => (
                                <div
                                    key={spec.label}
                                    className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 group hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-4 px-4 transition-colors"
                                >
                                    <span className={`text-sm text-slate-500 dark:text-slate-400 font-medium ${isAr ? 'text-right' : 'text-left'}`}>
                                        {spec.label}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold text-slate-900 dark:text-white ${isAr ? 'text-left' : 'text-right'}`}>
                                            {spec.value}
                                        </span>
                                        {spec.logo && (
                                            <div className="w-8 h-5 bg-white rounded p-0.5 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0 overflow-hidden">
                                                <img
                                                    src={spec.logo}
                                                    alt={spec.value}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-slate-500 hover:text-slate-900 cursor-pointer flex items-center justify-center gap-2">
                            <span>{isAr ? 'عرض كامل المواصفات' : 'View Full Specs'}</span>
                            <ArrowRight className={cn("w-4 h-4 transition-transform", isAr && "rotate-180")} />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-14 space-y-4">
                <h2 className={`text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? 'موقع المعاينة' : 'Inspection Location'}
                </h2>

                <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 group">
                    <iframe
                        src="https://maps.google.com/maps?q=25.1764,55.3908&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Inspection Location Map"
                        className="w-full h-full filter contrast-105"
                    />

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Emirates+Auction+Yard+-+Al+aweer+Dubai"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in Google Maps Fullscreen"
                        className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg border border-slate-200/60 dark:border-slate-700/60 hover:scale-105 active:scale-95`}
                    >
                        <Maximize2 className="w-5 h-5" />
                    </a>

                    <div className={`absolute bottom-5 ${isAr ? 'right-5 text-right' : 'left-5 text-left'} z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 max-w-[280px] sm:max-w-xs transition-transform duration-300 group-hover:scale-[1.02]`}>
                        <div className={`flex items-center gap-2 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <div className="w-9 h-5 bg-white rounded p-0.5 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                                <img
                                    src="/images/abu-dhabi-mobility.png"
                                    alt="Abu Dhabi Mobility"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-400">
                                {isAr ? 'أبوظبي للتنقل' : 'Abu Dhabi Mobility'}
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                            {isAr ? 'فرع موقع المعاينة' : 'Inspection Location Branch'}
                        </h3>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Emirates+Auction+Yard+-+Al+aweer+Dubai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-sm transition-all hover:border-slate-400"
                        >
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.527 4.799c-1.92-1.92-4.57-2.799-7.527-2.799C7.432 2 4.19 5.242 4.19 9.242c0 2.278 1.05 4.316 2.698 5.656l5.112 7.102 5.113-7.102c1.647-1.34 2.697-3.378 2.697-5.656 0-1.74-.537-3.355-1.583-4.443z" fill="#34A853"/>
                                <path d="M12 2c2.957 0 5.607.879 7.527 2.799l-4.409 6.123A3.873 3.873 0 0 0 12 9.242c-2.14 0-3.873 1.734-3.873 3.873 0 .42.067.825.19 1.205L4.19 9.242C4.19 5.242 7.432 2 12 2z" fill="#4285F4"/>
                                <path d="M12 9.242a3.873 3.873 0 0 1 3.118 1.578l4.409-6.123A10.158 10.158 0 0 0 12 2v7.242z" fill="#EA4335"/>
                                <path d="M12 16.988a3.873 3.873 0 0 1-3.683-2.668L4.19 9.242c-.085.325-.13.666-.13 1.018 0 2.278 1.05 4.316 2.698 5.656l5.112 7.102.13-6.03z" fill="#FBBC04"/>
                                <circle cx="12" cy="11.5" r="2.2" fill="#FFFFFF"/>
                            </svg>
                            <span>{isAr ? 'عرض على خرائط Google' : 'View on Google maps'}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Terms And Conditions Section */}
            <div className="mt-14 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 lg:p-12 border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600/10 text-red-600 dark:text-red-400 rounded-2xl shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {isAr ? 'الشروط والأحكام' : 'Terms And Conditions'}
                    </h2>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    {isAr
                        ? 'تطبق الشروط والأحكام الخاصة بالمزاد العلني لشركة ساعد، بالإضافة إلى الشروط والأحكام التالية:'
                        : "Saaed's terms and conditions of public auction shall apply, along with the following terms and conditions"}
                </p>

                {/* Saaed Towing Fees Alert Hint Banner */}
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-4">
                    <div className="p-2.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-sm text-amber-900 dark:text-amber-300 mb-1">
                            {isAr ? 'تنبيه هـام: رسوم السحب والقطر (Saaed Towing Fees)' : 'Important Notice: Saaed Towing & Recovery Fees'}
                        </h4>
                        <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed font-medium">
                            {isAr
                                ? 'يرجى العلم بأنه تطبق رسوم السحب والقطر الخاصة بشركة ساعد على جميع المركبات المباعة في المزاد وفقاً للائحة والتعرفة الرسمية المعتمدة وتضاف إلى إجمالي مستحقات الشراء.'
                                : 'Please note that official Saaed Towing and Recovery Fees will be applied to all purchased vehicles in accordance with the approved regulatory tariff and added to the final settlement.'}
                        </p>
                    </div>
                </div>

                {/* Bullet-styled Terms List */}
                <div className="space-y-3 pt-2">
                    {terms.map((term, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <span className="w-7 h-7 rounded-xl bg-red-600/10 text-red-600 dark:text-red-400 font-extrabold text-xs flex items-center justify-center shrink-0 border border-red-600/20">
                                {isAr ? toArabicNumerals(index + 1) : index + 1}
                            </span>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium flex-1 pt-0.5">
                                {term}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Terms & Conditions Modal Popup */}
            <AnimatePresence>
                {isTermsModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setIsTermsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
                            dir={dir}
                        >
                            <button
                                onClick={() => setIsTermsModalOpen(false)}
                                className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800`}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-red-600/10 text-red-600 rounded-2xl shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                                        {isAr ? 'شروط وأحكام مزاد ساعد' : 'Saaed Auction Terms & Conditions'}
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        {isAr ? 'يرجى مراجعة الشروط والموافقة عليها قبل المزايدة' : 'Please review and accept the terms before bidding'}
                                    </p>
                                </div>
                            </div>

                            {/* Towing warning inside modal */}
                            <div className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs">
                                <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <span>
                                    {isAr ? 'تنويه: تطبق رسوم السحب والقطر الخاصة بشركة ساعد على جميع المركبات المباعة.' : 'Notice: Official Saaed towing fees apply to all sold vehicles.'}
                                </span>
                            </div>

                            {/* Scrollable list of terms */}
                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar my-2">
                                {terms.map((term, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                                    >
                                        <span className="w-6 h-6 rounded-lg bg-red-600/10 text-red-600 font-bold text-[11px] flex items-center justify-center shrink-0">
                                            {isAr ? toArabicNumerals(index + 1) : index + 1}
                                        </span>
                                        <span className="flex-1 pt-0.5">{term}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsTermsModalOpen(false)}
                                    className="rounded-xl px-5 cursor-pointer"
                                >
                                    {isAr ? 'إغلاق' : 'Close'}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsTermsAccepted(true)
                                        setTermsError(false)
                                        setIsTermsModalOpen(false)
                                    }}
                                    className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold px-6 flex items-center gap-2 cursor-pointer shadow-md"
                                >
                                    <Check className="w-4 h-4" />
                                    {isAr ? 'أوافق على الشروط' : 'I Agree & Accept'}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
