"use client"

import { Button } from "@/components/ui/button"
import { 
    Clock, 
    Heart, 
    Share2, 
    ShieldCheck, 
    Zap, 
    ArrowRight, 
    LineChart as ChartIcon, 
    X, 
    CheckCircle, 
    Gavel, 
    Maximize2, 
    FileText, 
    Truck, 
    AlertCircle, 
    Check, 
    Receipt, 
    Wallet,
    Info,
    Sparkles,
    Copy
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { cn, toArabicNumerals, calculateSettlement, formatPrice } from "@/lib/utils"
import { AuthModal } from "@/components/auth/AuthModal"
import { DepositModal } from "@/components/dashboard/DepositModal"
import { useLanguage } from "@/lib/language-context"
import { useParams } from "next/navigation"

// Suppress Recharts warning about defaultProps in development
const originalConsoleError = console.error;
console.error = (...args) => {
    if (typeof args[0] === 'string' && /defaultProps/.test(args[0])) {
        return;
    }
    originalConsoleError(...args);
};

const fallbackImages = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2670&auto=format&fit=crop",
]

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
    const [pendingAction, setPendingAction] = useState<"bid" | "buy_now" | null>(null)
    const [bidAmount, setBidAmount] = useState(960000)
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [bidError, setBidError] = useState<string | null>(null)
    const [isSubmittingBid, setIsSubmittingBid] = useState(false)

    // Deposit state
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
    const [depositBalance, setDepositBalance] = useState(50000)

    // Favorites & Share state
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [shareToast, setShareToast] = useState(false)

    // Countdown state
    const [countdownStr, setCountdownStr] = useState("")
    const [isExpired, setIsExpired] = useState(false)

    // Sync deposit balance & favorites
    useEffect(() => {
        try {
            const savedDeposit = localStorage.getItem("bid_security_deposit")
            if (savedDeposit) setDepositBalance(50000 + Number(savedDeposit))
            const favs = JSON.parse(localStorage.getItem("user_favorites") || "[]")
            setIsWishlisted(favs.includes(vehicleId))
            const logged = localStorage.getItem("user_logged_in") === "true"
            setIsLoggedIn(logged)
        } catch {}
    }, [vehicleId])

    // Fetch dynamic vehicle data
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await fetch(`/api/vehicles/${vehicleId}`)
                if (res.ok) {
                    const json = await res.json()
                    if (json.success && json.data) {
                        setVehicle(json.data)
                        const nextMin = Number(json.data.currentBid || 0) + Number(json.data.minimumIncrement || 5000)
                        setBidAmount(nextMin)
                    }
                }
            } catch (err) {
                console.error("Error fetching vehicle details:", err)
            }
        }
        if (vehicleId) fetchVehicle()
    }, [vehicleId])

    // Real-time ticking countdown
    useEffect(() => {
        if (!vehicle?.endDate) return
        const updateCountdown = () => {
            const end = new Date(vehicle.endDate).getTime()
            const now = Date.now()
            const diff = end - now
            if (diff <= 0) {
                setCountdownStr(isAr ? "انتهى المزاد" : "Auction Ended")
                setIsExpired(true)
            } else {
                setIsExpired(false)
                const totalSeconds = Math.floor(diff / 1000)
                const days = Math.floor(totalSeconds / 86400)
                const hours = Math.floor((totalSeconds % 86400) / 3600)
                const mins = Math.floor((totalSeconds % 3600) / 60)
                const secs = totalSeconds % 60
                if (days > 0) {
                    setCountdownStr(isAr ? `${toArabicNumerals(days)}ي ${toArabicNumerals(hours)}س ${toArabicNumerals(mins)}د` : `${days}d ${hours}h ${mins}m`)
                } else {
                    setCountdownStr(isAr ? `${toArabicNumerals(hours)}س ${toArabicNumerals(mins)}د ${toArabicNumerals(secs)}ث` : `${hours}h ${mins}m ${secs}s`)
                }
            }
        }
        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)
        return () => clearInterval(interval)
    }, [vehicle?.endDate, isAr])

    const handleAction = (action: "bid" | "buy_now") => {
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
            if (action === "bid") {
                const nextMin = Number(vehicle?.currentBid || 950000) + Number(vehicle?.minimumIncrement || 5000)
                setBidAmount(nextMin)
                setBidError(null)
                setIsBidOpen(true)
            }
        }
    }

    const handleAuthComplete = () => {
        setIsLoggedIn(true)
        setIsAuthModalOpen(false)
        if (pendingAction === "bid") {
            const nextMin = Number(vehicle?.currentBid || 950000) + Number(vehicle?.minimumIncrement || 5000)
            setBidAmount(nextMin)
            setIsBidOpen(true)
        }
        setPendingAction(null)
    }

    const handleBidSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setBidError(null)
        setIsSubmittingBid(true)

        const requiredDeposit = vehicle?.depositRequiredAed || Math.round(Number(currentPrice) * 0.05)
        if (depositBalance < requiredDeposit) {
            setBidError(
                isAr
                    ? `رصيد التأمين الحالي (${toArabicNumerals(depositBalance.toLocaleString())} درهم) أقل من التأمين المطلوب (${toArabicNumerals(requiredDeposit.toLocaleString())} درهم). يرجى إيداع التأمين للمتابعة.`
                    : `Your deposit balance (AED ${depositBalance.toLocaleString()}) is below the required AED ${requiredDeposit.toLocaleString()}. Please top up your security deposit.`
            )
            setIsSubmittingBid(false)
            return
        }

        try {
            const res = await fetch(`/api/vehicles/${vehicleId}/bid`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: bidAmount, bidderName: "Registered Bidder" })
            })
            const json = await res.json()
            if (res.ok && json.success) {
                if (json.vehicle) {
                    setVehicle(json.vehicle)
                    const nextMin = Number(json.vehicle.currentBid) + Number(json.vehicle.minimumIncrement || 5000)
                    setBidAmount(nextMin)
                }
                setIsBidOpen(false)
                const msg = json.extended
                    ? (isAr ? "تم تسجيل مزايدتك بنجاح وتم تمديد المزاد دقيقتين (مضاد للقنص)!" : "Bid placed successfully! Anti-sniping extended the auction by 2 minutes!")
                    : (isAr ? `تمت المزايدة بنجاح بمبلغ ${toArabicNumerals(bidAmount.toLocaleString())} درهم!` : `Bid placed successfully for AED ${bidAmount.toLocaleString()}!`)
                setSuccessMessage(msg)
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 4000)
            } else {
                setBidError(json.error || (isAr ? "فشلت المزايدة، يرجى المحاولة بمبلغ أعلى" : "Failed to place bid, please try a higher amount"))
            }
        } catch (err: any) {
            setBidError(err?.message || (isAr ? "حدث خطأ في الاتصال" : "Network error"))
        } finally {
            setIsSubmittingBid(false)
        }
    }

    const toggleWishlist = () => {
        try {
            const favs = JSON.parse(localStorage.getItem("user_favorites") || "[]")
            let updated: string[]
            if (favs.includes(vehicleId)) {
                updated = favs.filter((item: string) => item !== vehicleId)
                setIsWishlisted(false)
            } else {
                updated = [...favs, vehicleId]
                setIsWishlisted(true)
            }
            localStorage.setItem("user_favorites", JSON.stringify(updated))
            window.dispatchEvent(new Event("favorites_changed"))
        } catch {
            setIsWishlisted(!isWishlisted)
        }
    }

    const handleShare = () => {
        if (typeof window !== "undefined") {
            if (navigator.share) {
                navigator.share({
                    title: vehicleTitle,
                    url: window.location.href
                }).catch(() => {})
            } else {
                navigator.clipboard.writeText(window.location.href)
                setShareToast(true)
                setTimeout(() => setShareToast(false), 2500)
            }
        }
    }

    const displayImages = (vehicle?.images && vehicle.images.length > 0) ? vehicle.images : fallbackImages
    const currentPrice = Number(vehicle?.currentBid || 950000)
    const minIncrement = Number(vehicle?.minimumIncrement || 5000)
    const minNextBid = currentPrice + minIncrement
    const vehicleTitle = vehicle?.title ? (isAr && vehicle.titleAr ? vehicle.titleAr : vehicle.title) : (isAr ? 'مرسيدس AMG G63 2024' : '2024 Mercedes-AMG G63')
    const vehicleSubtitle = vehicle?.trim || (isAr ? 'الإصدار الكبير • 1 من 1000 • صفر كيلومتر' : 'Grand Edition • 1 of 1000 • 0km Mileage')
    const entityName = vehicle?.sourceEntity ? (isAr ? vehicle.sourceEntity.arabicName : vehicle.sourceEntity.name) : (isAr ? 'أبوظبي للتنقل' : 'Abu Dhabi Mobility')
    const entityLogo = vehicle?.sourceEntity?.logo || '/images/abu-dhabi-mobility.png'

    // Real live fees settlement calculation
    const settlement = useMemo(() => calculateSettlement(currentPrice), [currentPrice])
    const bidSettlement = useMemo(() => calculateSettlement(bidAmount), [bidAmount])

    // Dynamic Chart points from real bidsHistory
    const chartData = useMemo(() => {
        if (!vehicle?.bidsHistory || vehicle.bidsHistory.length === 0) {
            return [
                { time: 'Start', bid: vehicle?.startingBid || 800000 },
                { time: 'Current', bid: currentPrice }
            ]
        }
        const chronBids = [...vehicle.bidsHistory].reverse()
        return chronBids.map((b: any, i: number) => {
            const date = new Date(b.timestamp)
            const timeLabel = isNaN(date.getTime()) 
                ? `#${i + 1}` 
                : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return {
                time: timeLabel,
                bid: Number(b.amount)
            }
        })
    }, [vehicle?.bidsHistory, vehicle?.startingBid, currentPrice])

    // Translated specs
    const specs = isAr ? [
        { label: 'الجهة المصدرة', value: entityName, logo: entityLogo },
        { label: 'رقم اللوط', value: vehicle?.lotNumber || 'LOT-2024-001' },
        { label: 'المحرك', value: vehicle?.engineAr || vehicle?.engine || `٤.٠ لتر V8 بيتوربو` },
        { label: 'القوة', value: `${toArabicNumerals(vehicle?.powerHp || 577)} حصان` },
        { label: 'ناقل الحركة', value: vehicle?.transmissionAr || vehicle?.transmission || `أوتوماتيك ٩ سرعات` },
        { label: 'المسافة المقطوعة', value: `${toArabicNumerals(vehicle?.mileageKm ?? 0)} كم` },
        { label: '٠-١٠٠ كم/ساعة', value: vehicle?.acceleration0100 ? `${toArabicNumerals(vehicle.acceleration0100)}` : `٤.٥ ثانية` },
        { label: 'اللون الخارجي', value: vehicle?.exteriorColorAr || vehicle?.exteriorColor || 'أسود ليلي مات' },
        { label: 'الداخلية', value: vehicle?.interiorColorAr || vehicle?.interiorColor || 'أحمر البنغال / أسود' },
        { label: 'رقم الهيكل', value: vehicle?.vin || 'W1N463***291' }
    ] : [
        { label: 'Source Entity', value: entityName, logo: entityLogo },
        { label: 'Lot Number', value: vehicle?.lotNumber || 'LOT-2024-001' },
        { label: 'Engine', value: vehicle?.engine || '4.0L V8 Biturbo' },
        { label: 'Power', value: `${vehicle?.powerHp || 577} HP` },
        { label: 'Transmission', value: vehicle?.transmission || '9-Speed Auto' },
        { label: 'Mileage', value: `${(vehicle?.mileageKm ?? 0).toLocaleString()} km` },
        { label: '0-100 km/h', value: vehicle?.acceleration0100 || '4.5s' },
        { label: 'Exterior Color', value: vehicle?.exteriorColor || 'Night Black Magno' },
        { label: 'Interior', value: vehicle?.interiorColor || 'Bengal Red / Black' },
        { label: 'VIN', value: vehicle?.vin || 'W1N463***291' }
    ]

    // Saaed terms
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
            {/* Global Modals */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => handleAuthComplete()}
                defaultTab={authTab}
            />

            <DepositModal
                isOpen={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                onSuccess={(added) => {
                    const newBal = depositBalance + added
                    setDepositBalance(newBal)
                    localStorage.setItem("bid_security_deposit", String(newBal - 50000))
                    window.dispatchEvent(new Event("balance_update"))
                    setBidError(null)
                }}
            />

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-emerald-400"
                    >
                        <CheckCircle className="w-6 h-6 shrink-0" />
                        <span className="font-bold text-base sm:text-lg">{successMessage || (isAr ? 'تمت العملية بنجاح!' : 'Action Successful!')}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Share Toast */}
            <AnimatePresence>
                {shareToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700"
                    >
                        <Copy className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-sm">{isAr ? 'تم نسخ رابط المزاد إلى الحافظة' : 'Auction link copied to clipboard!'}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Bid Modal */}
            <AnimatePresence>
                {isBidOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setIsBidOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden my-8"
                            dir={dir}
                        >
                            <button 
                                onClick={() => setIsBidOpen(false)} 
                                className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800`}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <form onSubmit={handleBidSubmit}>
                                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center mb-5">
                                    <Gavel className="w-7 h-7" />
                                </div>
                                
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                                    {isAr ? 'قدّم مزايدتك الرسمية' : 'Place Your Official Bid'}
                                </h2>
                                
                                <p className="text-sm text-slate-500 mb-6">
                                    {isAr ? 'أعلى مزايدة حالية:' : 'Current Highest Bid:'} <span className="font-black text-slate-900 dark:text-white">
                                        {formatPrice(currentPrice, isAr)}
                                    </span>
                                </p>

                                {bidError && (
                                    <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold flex items-start gap-2.5">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p>{bidError}</p>
                                            {bidError.includes("تأمين") || bidError.includes("deposit") ? (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsBidOpen(false)
                                                        setIsDepositModalOpen(true)
                                                    }}
                                                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
                                                >
                                                    <Wallet className="w-3.5 h-3.5" />
                                                    {isAr ? 'إيداع تأمين الآن' : 'Deposit Funds Now'}
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className={`text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 ${isAr ? 'text-right' : 'text-left'}`}>
                                            {isAr ? 'مبلغ المزايدة (درهم إماراتي)' : 'Your Bid Amount (AED)'}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step={minIncrement}
                                                min={minNextBid}
                                                value={bidAmount}
                                                onChange={(e) => {
                                                    setBidAmount(Number(e.target.value))
                                                    setBidError(null)
                                                }}
                                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 text-xl font-black text-slate-900 dark:text-white"
                                            />
                                        </div>
                                        <p className={`text-xs text-slate-400 mt-2 ${isAr ? 'text-right' : 'text-left'}`}>
                                            {isAr 
                                                ? `الحد الأدنى للمزايدة القادمة: ${toArabicNumerals(minNextBid.toLocaleString())} درهم (الزيادة: ${toArabicNumerals(minIncrement.toLocaleString())} درهم)`
                                                : `Minimum next bid: AED ${minNextBid.toLocaleString()} (Min increment: AED ${minIncrement.toLocaleString()})`}
                                        </p>
                                    </div>

                                    {/* Estimated Total Breakdown in Modal */}
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2 text-xs">
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>{isAr ? 'المزايدة المقترحة:' : 'Bid Amount:'}</span>
                                            <span className="font-bold text-slate-900 dark:text-white">{formatPrice(bidAmount, isAr)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>{isAr ? 'الرسوم الإدارية + الفحص:' : 'Admin & Inspection Fees:'}</span>
                                            <span className="font-bold text-slate-900 dark:text-white">{formatPrice(bidSettlement.adminFee + bidSettlement.loadingFee + bidSettlement.possessionFee, isAr)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-slate-500">
                                            <span>{isAr ? 'ضريبة القيمة المضافة (٥٪):' : 'VAT (5%):'}</span>
                                            <span className="font-bold text-slate-900 dark:text-white">{formatPrice(bidSettlement.vatAmount, isAr)}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center font-extrabold text-sm text-slate-900 dark:text-white">
                                            <span>{isAr ? 'الإجمالي التقديري للاستلام:' : 'Estimated Total Settlement:'}</span>
                                            <span className="text-red-600 dark:text-red-400">{formatPrice(bidSettlement.totalPayable, isAr)}</span>
                                        </div>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={isSubmittingBid || isExpired}
                                        size="lg" 
                                        className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-lg font-black mt-2 cursor-pointer shadow-lg shadow-red-600/20 active:scale-95 transition-all"
                                    >
                                        {isSubmittingBid 
                                            ? (isAr ? 'جارِ إرسال المزايدة...' : 'Submitting Bid...') 
                                            : (isAr ? `تأكيد المزايدة (${toArabicNumerals(bidAmount.toLocaleString())} درهم)` : `Confirm Bid (AED ${bidAmount.toLocaleString()})`)}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Grid: Gallery & Main Bidding Card */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                <div className="space-y-4">
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 relative group shadow-2xl border border-slate-200 dark:border-slate-800"
                    >
                        <img
                            src={displayImages[activeImage]}
                            alt="Vehicle Preview"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = fallbackImages[0]
                            }}
                        />
                        <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} flex gap-2 z-20`}>
                            <button 
                                onClick={toggleWishlist}
                                aria-label="Toggle Favorite"
                                className={`p-3 backdrop-blur-md rounded-full transition-all border cursor-pointer shadow-md ${
                                    isWishlisted 
                                        ? 'bg-red-600 text-white border-red-600 shadow-red-600/30' 
                                        : 'bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white hover:bg-white hover:text-red-600 border-white/30'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                            <button 
                                onClick={handleShare}
                                aria-label="Share Auction"
                                className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-800 dark:text-white hover:bg-white hover:text-slate-900 transition-colors border border-white/30 shadow-md cursor-pointer"
                            >
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
                                    activeImage === i 
                                        ? "border-red-600 ring-2 ring-red-600/20 ring-offset-2 dark:ring-offset-slate-950" 
                                        : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${i + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = fallbackImages[0]
                                    }}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Dynamic Bidding Action & Financial Overview */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div>
                        <div className={`flex flex-wrap items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                {t("Premium Lot")}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-500/20">
                                <ShieldCheck className="w-3.5 h-3.5" /> {t("Verified")}
                            </span>

                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs ${isAr ? 'flex-row-reverse' : ''}`}>
                                <div className="w-8 h-4.5 bg-white rounded p-0.5 flex items-center justify-center shrink-0">
                                    <img
                                        src={entityLogo}
                                        alt={entityName}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                                    {entityName}
                                </span>
                            </div>
                        </div>

                        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
                            {vehicleTitle}
                        </h1>
                        <p className={`text-slate-500 dark:text-slate-400 text-base sm:text-lg font-semibold ${isAr ? 'text-right' : 'text-left'}`}>
                            {vehicleSubtitle}
                        </p>
                    </div>

                    {/* Bidding Control Panel */}
                    <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

                        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 relative z-10 gap-4 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <p className="text-xs font-black text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-widest">{t("Current Bid")}</p>
                                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {formatPrice(currentPrice, isAr)}
                                </div>
                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                    {isAr ? `${toArabicNumerals(vehicle?.bidsCount || 0)} مزايدة مسجلة` : `${vehicle?.bidsCount || 0} active bids placed`}
                                </p>
                            </div>

                            <div className={`bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 ${isAr ? 'text-right' : 'text-left sm:text-right'}`}>
                                <div className={`flex items-center gap-2 text-orange-600 font-black mb-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                                    <Clock className="w-4 h-4 animate-pulse shrink-0" />
                                    <span className="font-mono text-sm sm:text-base">
                                        {countdownStr || (isAr ? 'جارِ التحميل...' : 'Calculating...')}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-bold">
                                    {isExpired ? (isAr ? 'انتهت فترة المزاد' : 'Auction Finished') : (isAr ? 'تمديد تلقائي عند المزايدة بالدقائق الأخيرة' : 'Anti-sniping auto extension active')}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-4 relative z-10">
                            <Button 
                                size="lg" 
                                disabled={isExpired}
                                onClick={() => handleAction("bid")} 
                                className="w-full text-base sm:text-lg h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/20 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer font-black"
                            >
                                {isAr ? 'قدّم مزايدة الآن' : 'Place Bid'} 
                                <span className="opacity-80 mx-2 font-normal text-xs sm:text-sm">
                                    {isAr 
                                        ? `(الحد الأدنى: ${toArabicNumerals(minNextBid.toLocaleString())} درهم)` 
                                        : `(Min: AED ${minNextBid.toLocaleString()})`}
                                </span>
                            </Button>

                            {/* Terms Agreement Checkbox */}
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

                            {/* Quick Bid Increments */}
                            <div className="space-y-2 pt-2">
                                <p className={`text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 ${isAr ? 'text-right' : 'text-left'}`}>
                                    {isAr ? 'مزايدة سريعة فورية (درهم)' : 'Quick Bids (AED)'}
                                </p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 5, 10].map((mult) => {
                                        const inc = minIncrement * mult
                                        const targetBid = currentPrice + inc
                                        return (
                                            <button
                                                key={mult}
                                                type="button"
                                                disabled={isExpired}
                                                onClick={() => {
                                                    setBidAmount(targetBid)
                                                    handleAction("bid")
                                                }}
                                                className="py-2.5 px-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-extrabold hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-400 transition-all active:scale-95 text-slate-800 dark:text-slate-100 cursor-pointer shadow-xs"
                                            >
                                                +{isAr ? toArabicNumerals(inc.toLocaleString()) : inc.toLocaleString()}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Deposit Status Notice */}
                        <div className={`pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                {isAr ? `تأمينك المتاح: ${toArabicNumerals(depositBalance.toLocaleString())} درهم` : `Security Deposit: AED ${depositBalance.toLocaleString()}`}
                            </span>
                            <button
                                type="button"
                                onClick={() => setIsDepositModalOpen(true)}
                                className="font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                            >
                                {isAr ? '+ زيادة التأمين' : '+ Top Up'}
                            </button>
                        </div>
                    </div>

                    {/* AI Market Insight Card */}
                    <div className="p-6 rounded-[2rem] bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 backdrop-blur-sm relative overflow-hidden group">
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
                                <Zap className="w-6 h-6 fill-current" />
                            </div>
                            <div className={isAr ? 'text-right' : 'text-left'}>
                                <h3 className="font-extrabold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-2">
                                    {t("AI Market Insight")}
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-500/20 text-[10px] uppercase font-black text-indigo-700 dark:text-indigo-300">
                                        {vehicle?.aiInsight?.badge || "Live"}
                                    </span>
                                </h3>
                                <p className="text-xs sm:text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
                                    {vehicle?.aiInsight 
                                        ? (isAr ? vehicle.aiInsight.summaryAr : vehicle.aiInsight.summaryEn) 
                                        : (isAr 
                                            ? `هذا العرض مقيّم بأقل من قيمته السوقية. الطلب مرتفع، والأسعار في اتجاه تصاعدي.`
                                            : `This lot is currently undervalued compared to similar market comps. Demand is high with strong upside.`)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Grid: Dynamic Bidding History & Specifications & Transparent Fee Settlement */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {/* Bidding History Chart & Log */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                                    <ChartIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("Bidding History")}</h3>
                            </div>
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                                {isAr ? `${toArabicNumerals(vehicle?.bidsCount || 0)} مزايدة` : `${vehicle?.bidsCount || 0} bids`}
                            </span>
                        </div>

                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={8} />
                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} dx={-8} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)' }}
                                        itemStyle={{ color: '#0f172a', fontWeight: 700 }}
                                        formatter={(value: any) => [isAr ? `${toArabicNumerals(Number(value || 0).toLocaleString())} درهم` : `AED ${Number(value || 0).toLocaleString()}`, isAr ? 'قيمة المزايدة' : 'Bid Amount']}
                                    />
                                    <Area type="monotone" dataKey="bid" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorBid)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Recent Bids Feed */}
                        {vehicle?.bidsHistory && vehicle.bidsHistory.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                                <h4 className={`text-xs font-black uppercase tracking-wider text-slate-400 mb-2 ${isAr ? 'text-right' : 'text-left'}`}>
                                    {isAr ? 'آخر المزايدات المسجلة' : 'Recent Bid Log'}
                                </h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {vehicle.bidsHistory.slice(0, 5).map((b: any, index: number) => (
                                        <div key={b.id || index} className={`flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs ${isAr ? 'flex-row-reverse' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="font-bold text-slate-800 dark:text-slate-200">{b.bidderName}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-slate-900 dark:text-white">
                                                    {formatPrice(Number(b.amount), isAr)}
                                                </span>
                                                <span className="text-[10px] text-slate-400">
                                                    {new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Transparent UAE Auction Settlement Calculator Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl shrink-0">
                                <Receipt className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                    {isAr ? 'حاسبة التكلفة النهائية للتملك' : 'Total Acquisition & Settlement Calculator'}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {isAr ? 'حساب شفاف وشامل لكافة الرسوم الإدارية وضريبة القيمة المضافة طبقاً للوائح ساعد' : 'Transparent breakdown of admin fees, loading, and VAT under Saaed regulations'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                                <span className="text-slate-500">{isAr ? 'سعر الترسية المقدر:' : 'Hammer Bid Price:'}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{formatPrice(settlement.bidAmount, isAr)}</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                                <span className="text-slate-500">{isAr ? 'الرسوم الإدارية (ساعد):' : 'Saaed Admin Fee:'}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{formatPrice(settlement.adminFee, isAr)}</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                                <span className="text-slate-500">{isAr ? 'رسوم القطر والتحميل والحيازة:' : 'Loading & Possession Fees:'}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{formatPrice(settlement.loadingFee + settlement.possessionFee, isAr)}</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                                <span className="text-slate-500">{isAr ? 'ضريبة القيمة المضافة (٥٪):' : 'Applicable VAT (5%):'}</span>
                                <span className="font-extrabold text-slate-900 dark:text-white">{formatPrice(settlement.vatAmount, isAr)}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 flex justify-between items-center">
                            <div>
                                <span className="text-xs uppercase font-extrabold tracking-wider text-red-600 dark:text-red-400 block">
                                    {isAr ? 'إجمالي المبلغ المطلوب سداده عند الفوز:' : 'Total Payable Upon Winning:'}
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {isAr ? 'شامل كافة الرسوم والمصروفات والضريبة' : 'Includes all regulatory fees & taxes'}
                                </span>
                            </div>
                            <span className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-400">
                                {formatPrice(settlement.totalPayable, isAr)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Specifications */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between">
                        <div>
                            <h3 className={`font-black text-slate-900 dark:text-white mb-6 text-xl ${isAr ? 'text-right' : 'text-left'}`}>
                                {t("Specifications")}
                            </h3>
                            <div className="space-y-0">
                                {specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-3 px-3 rounded-lg transition-colors"
                                    >
                                        <span className={`text-xs text-slate-500 dark:text-slate-400 font-medium ${isAr ? 'text-right' : 'text-left'}`}>
                                            {spec.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-bold text-slate-900 dark:text-white ${isAr ? 'text-left' : 'text-right'}`}>
                                                {spec.value}
                                            </span>
                                            {spec.logo && (
                                                <div className="w-7 h-4 bg-white rounded p-0.5 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0 overflow-hidden">
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
                        </div>

                        {vehicle?.inspection && (
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h4 className={`text-xs font-black uppercase tracking-wider text-slate-400 mb-3 ${isAr ? 'text-right' : 'text-left'}`}>
                                    {isAr ? 'تقرير فحص ساعد الفني' : 'Saaed Inspection Report'}
                                </h4>
                                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
                                    <div className="flex justify-between items-center font-bold">
                                        <span className="text-emerald-800 dark:text-emerald-300">{isAr ? 'درجة الفحص الفني:' : 'Inspection Grade:'}</span>
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-xs">{vehicle.inspection.grade}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                                        {vehicle.inspection.notes || (isAr ? 'اجتازت المركبة فحص السلامة والهيكل والمحرك بنجاح.' : 'Passed multi-point structural & mechanical inspection.')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Inspection Location Map Section */}
            <div className="mt-8 space-y-4">
                <h2 className={`text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? 'موقع المعاينة الرسمي' : 'Official Inspection Location'}
                </h2>

                <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 group">
                    <iframe
                        src={`https://maps.google.com/maps?q=${vehicle?.location?.latitude || 25.1764},${vehicle?.location?.longitude || 55.3908}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
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
                        href={vehicle?.location?.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Emirates+Auction+Yard+-+Al+aweer+Dubai"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in Google Maps Fullscreen"
                        className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg border border-slate-200/60 dark:border-slate-700/60 hover:scale-105 active:scale-95`}
                    >
                        <Maximize2 className="w-5 h-5" />
                    </a>

                    <div className={`absolute bottom-5 ${isAr ? 'right-5 text-right' : 'left-5 text-left'} z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 max-w-[280px] sm:max-w-xs transition-transform duration-300 group-hover:scale-[1.02]`}>
                        <div className={`flex items-center gap-2 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-4.5 bg-white rounded p-0.5 flex items-center justify-center border border-slate-200 shadow-2xs shrink-0">
                                <img
                                    src={entityLogo}
                                    alt={entityName}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-400">
                                {entityName}
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                            {vehicle?.location ? (isAr ? vehicle.location.branchNameAr : vehicle.location.branchNameEn) : (isAr ? 'فرع موقع المعاينة' : 'Inspection Location Branch')}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3 font-medium">
                            {vehicle?.location ? (isAr ? vehicle.location.addressAr : vehicle.location.addressEn) : "Dubai, UAE"}
                        </p>
                        <a
                            href={vehicle?.location?.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Emirates+Auction+Yard+-+Al+aweer+Dubai"}
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
            <div className="mt-14 bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600/10 text-red-600 dark:text-red-400 rounded-2xl shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {isAr ? 'الشروط والأحكام الرسمية للمزاد' : 'Official Auction Terms & Conditions'}
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

                            <div className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs">
                                <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <span>
                                    {isAr ? 'تنويه: تطبق رسوم السحب والقطر الخاصة بشركة ساعد على جميع المركبات المباعة.' : 'Notice: Official Saaed towing fees apply to all sold vehicles.'}
                                </span>
                            </div>

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
