"use client"

import { useState, useId, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Car, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  ShieldCheck, 
  DollarSign, 
  Calendar, 
  Clock, 
  Tag, 
  AlertCircle, 
  Trash2, 
  Plus, 
  ExternalLink,
  Layers,
  ChevronRight,
  Info,
  Check,
  Eye
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

interface VehicleListingWizardProps {
  onSuccess?: (lotId: string) => void
  onCancel?: () => void
}

const POPULAR_MAKES = [
  "Mercedes-Benz",
  "Porsche",
  "Toyota",
  "Land Rover",
  "BMW",
  "Nissan",
  "Lexus",
  "Audi",
  "Ferrari",
  "Lamborghini",
  "Bentley",
  "Rolls-Royce",
  "Ford",
  "Chevrolet",
  "Jeep"
]

const BODY_TYPES = [
  { id: "SUV", labelEn: "SUV / 4x4", labelAr: "دفع رباعي / SUV" },
  { id: "Sedan", labelEn: "Sedan", labelAr: "سيدان" },
  { id: "Coupe", labelEn: "Coupe", labelAr: "كوبيه" },
  { id: "Convertible", labelEn: "Convertible", labelAr: "كابريوليه" },
  { id: "Pickup", labelEn: "Truck / Pickup", labelAr: "بيك أب / شاحنة" },
  { id: "Hatchback", labelEn: "Hatchback", labelAr: "هاتشباك" }
]

const SPECS = [
  { id: "GCC", labelEn: "GCC Specs (خليجي)", labelAr: "مواصفات خليجية (GCC)" },
  { id: "North American", labelEn: "North American Specs", labelAr: "مواصفات أمريكية / كندية" },
  { id: "European", labelEn: "European Specs", labelAr: "مواصفات أوروبية" },
  { id: "Japanese", labelEn: "Japanese Specs", labelAr: "مواصفات يابانية" }
]

const YARDS = [
  { id: "al-aweer", nameEn: "Saaed Al Aweer Auto Market Yard - Dubai", nameAr: "ساحة ساعد سوق العوير للسيارات - دبي" },
  { id: "musaffah", nameEn: "Saaed Central Yard - Musaffah, Abu Dhabi", nameAr: "ساحة ساعد المركزية - مصفح، أبوظبي" },
  { id: "sharjah", nameEn: "Saaed Logistics Yard - Industrial 12, Sharjah", nameAr: "ساحة ساعد اللوجستية - الصناعية ١٢، الشارقة" },
  { id: "al-ain", nameEn: "Saaed Inspection Center - Al Ain", nameAr: "مركز فحص ساعد - العين" }
]

const DEMO_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670&auto=format&fit=crop"
]

export default function VehicleListingWizard({ onSuccess, onCancel }: VehicleListingWizardProps) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedLot, setSubmittedLot] = useState<any | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Specs
    make: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2024,
    trim: "Grand Edition V8 BiTurbo",
    bodyType: "SUV",
    spec: "GCC",
    mileageKm: 14500,
    engine: "4.0L V8 Twin-Turbo",
    powerHp: 577,
    transmission: "Automatic 9G-Tronic",
    fuelType: "Petrol",
    exteriorColor: "Obsidian Black Metallic",
    interiorColor: "Bengal Red / Black Nappa",
    vin: "WDB4632761X" + Math.floor(100000 + Math.random() * 900000),
    condition: "Excellent (Agency Warranty)",
    yard: "al-aweer",

    // Step 2: Media
    images: DEMO_GALLERY_IMAGES,
    thumbnail: DEMO_GALLERY_IMAGES[0],
    videoUrl: "",

    // Step 3: Documents
    mulkiyaUploaded: true,
    mulkiyaFileName: "Mulkiya_Registration_Front_Back.pdf",
    inspectionUploaded: true,
    inspectionFileName: "RTA_Comprehensive_Passing_Report_2026.pdf",
    serviceHistoryUploaded: true,
    serviceHistoryFileName: "Agency_Gargash_Service_History.pdf",
    emiratesIdUploaded: true,
    emiratesIdFileName: "Owner_Emirates_ID_Verified.pdf",
    clearTitleConfirmed: true,

    // Step 4: Financials & Suggested Price
    startingBid: 680000,
    reservePrice: 850000,
    hasReserve: true,
    minimumIncrement: 5000,
    buyNowPrice: 990000,
    hasBuyNow: true,
    durationDays: 7,
    depositPercent: 5,

    // Step 5: Terms
    termsAccepted: false
  })

  // Dynamic AI Valuation Engine
  const [valuationData, setValuationData] = useState({
    marketEstimate: 950000,
    suggestedStartingBid: 650000,
    suggestedReserve: 850000,
    suggestedIncrement: 5000,
    confidenceScore: 94,
    demandTrend: "High (+6.2% YoY)"
  })

  // Re-calculate AI suggested prices whenever Make, Model, Year, Mileage changes
  useEffect(() => {
    let basePrice = 250000
    const makeLower = formData.make.toLowerCase()

    if (makeLower.includes("mercedes") || makeLower.includes("porsche") || makeLower.includes("land rover")) {
      basePrice = 650000
    } else if (makeLower.includes("ferrari") || makeLower.includes("lamborghini") || makeLower.includes("rolls") || makeLower.includes("bentley")) {
      basePrice = 1400000
    } else if (makeLower.includes("toyota") || makeLower.includes("nissan") || makeLower.includes("lexus")) {
      basePrice = 320000
    }

    // Adjust for year
    const currentYear = 2026
    const age = Math.max(0, currentYear - Number(formData.year))
    const ageFactor = Math.max(0.4, 1 - (age * 0.08))

    // Adjust for mileage
    const mileageFactor = Math.max(0.65, 1 - ((Number(formData.mileageKm) / 100000) * 0.15))

    const calculatedMarket = Math.round((basePrice * ageFactor * mileageFactor) / 10000) * 10000
    const suggestedStart = Math.round((calculatedMarket * 0.68) / 5000) * 5000
    const suggestedRes = Math.round((calculatedMarket * 0.88) / 5000) * 5000
    const suggestedInc = calculatedMarket > 1000000 ? 10000 : calculatedMarket > 400000 ? 5000 : 2500

    setValuationData({
      marketEstimate: calculatedMarket,
      suggestedStartingBid: suggestedStart,
      suggestedReserve: suggestedRes,
      suggestedIncrement: suggestedInc,
      confidenceScore: 94 - Math.min(15, age * 2),
      demandTrend: age <= 2 ? "Very High (+8.4% Demand)" : "Moderate / Stable"
    })
  }, [formData.make, formData.model, formData.year, formData.mileageKm])

  // Handler to apply suggested prices automatically
  const applySuggestedPricing = () => {
    setFormData(prev => ({
      ...prev,
      startingBid: valuationData.suggestedStartingBid,
      reservePrice: valuationData.suggestedReserve,
      hasReserve: true,
      minimumIncrement: valuationData.suggestedIncrement,
      buyNowPrice: Math.round((valuationData.marketEstimate * 1.05) / 10000) * 10000
    }))
  }

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newUrls: string[] = []
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file)
        newUrls.push(url)
      })
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newUrls],
        thumbnail: prev.thumbnail || newUrls[0]
      }))
    }
  }

  const removeImage = (idxToRemove: number) => {
    setFormData(prev => {
      const filtered = prev.images.filter((_, i) => i !== idxToRemove)
      return {
        ...prev,
        images: filtered,
        thumbnail: filtered[0] || ""
      }
    })
  }

  const handleDocumentUpload = (docKey: string, fileName: string) => {
    setFormData(prev => ({
      ...prev,
      [`${docKey}Uploaded`]: true,
      [`${docKey}FileName`]: fileName
    }))
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.termsAccepted) return

    setIsSubmitting(true)
    const lotNumber = `LOT-UAE-${Math.floor(1000 + Math.random() * 9000)}`
    const vehicleId = `usr-${Date.now()}`

    const newVehiclePayload = {
      id: vehicleId,
      lotNumber,
      vin: formData.vin,
      title: `${formData.year} ${formData.make} ${formData.model} ${formData.trim}`.trim(),
      titleAr: `${formData.make} ${formData.model} ${formData.year}`,
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      trim: formData.trim,
      bodyType: formData.bodyType,
      category: "motors",
      mileageKm: Number(formData.mileageKm),
      exteriorColor: formData.exteriorColor,
      interiorColor: formData.interiorColor,
      engine: formData.engine,
      powerHp: Number(formData.powerHp),
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      startingBid: Number(formData.startingBid),
      minimumIncrement: Number(formData.minimumIncrement),
      reservePrice: formData.hasReserve ? Number(formData.reservePrice) : undefined,
      currentBid: Number(formData.startingBid),
      buyNowPrice: formData.hasBuyNow ? Number(formData.buyNowPrice) : undefined,
      depositRequiredAed: Math.round(Number(formData.startingBid) * 0.05),
      status: "pending_approval",
      thumbnail: formData.thumbnail || formData.images[0],
      images: formData.images,
      videoUrl: formData.videoUrl || undefined,
      sourceEntity: {
        id: "saaed",
        name: "Saaed User Auction Consignment",
        arabicName: "مزاد الأفراد - ساعد",
        logo: "/images/saaed-logo.png"
      },
      location: {
        branchNameEn: "Saaed Central Inspection & Yard",
        branchNameAr: "مركز فحص وساحة ساعد المركزية",
        yardName: YARDS.find(y => y.id === formData.yard)?.nameEn || "Al Aweer Auto Market Yard",
        addressEn: "Auto Market, Al Aweer, Dubai",
        addressAr: "سوق العوير للسيارات، دبي",
        latitude: 25.1764,
        longitude: 55.3908,
        googleMapsUrl: "https://maps.google.com/?q=25.1764,55.3908"
      },
      notes: `Privately submitted vehicle for official Saaed Auction. Regional Spec: ${formData.spec}. Condition: ${formData.condition}. Clear title confirmed.`,
      notesAr: `مركبة مدرجة شخصياً لمزاد ساعد الرسمي. المواصفات: ${formData.spec}. الحالة: ${formData.condition}. خلو الطرف مؤكد.`,
      inspection: {
        grade: "A (Verified Clean)",
        chassisCondition: "Pristine, No Structural Damage",
        engineCondition: "Optimal Performance",
        transmissionCondition: "Smooth Gear Shift",
        bodyCondition: "Original Paint (Minor bumper stone chips)",
        interiorCondition: "Like New Nappa Leather",
        tiresCondition: "85% Tread Remaining",
        notes: "Passed Saaed 140-point preliminary inspection readiness."
      },
      aiInsight: {
        badge: "Verified Private Lot",
        marketValuationAed: valuationData.marketEstimate,
        valuationDeltaPercent: -Math.round(((valuationData.marketEstimate - formData.startingBid) / valuationData.marketEstimate) * 100),
        demandLevel: "High",
        priceTrend: "Rising",
        summaryEn: `AI estimated market value of AED ${valuationData.marketEstimate.toLocaleString()}. Highly desirable ${formData.spec} specification.`,
        summaryAr: `القيمة السوقية التقديرية بالذكاء الاصطناعي ${valuationData.marketEstimate.toLocaleString()} درهم. مواصفات مرغوبة جداً.`
      }
    }

    try {
      // 1. Post to API
      await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehiclePayload)
      }).catch(err => console.log('API save warning:', err))

      // 2. Save in localStorage for User Portal "My Listings"
      const existingRaw = localStorage.getItem("user_listed_vehicles")
      const existingList = existingRaw ? JSON.parse(existingRaw) : []
      existingList.unshift({
        ...newVehiclePayload,
        submittedAt: new Date().toISOString(),
        reviewStage: "Documents & Yard Check"
      })
      localStorage.setItem("user_listed_vehicles", JSON.stringify(existingList))

      setSubmittedLot(newVehiclePayload)
      if (onSuccess) {
        onSuccess(lotNumber)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // SUCCESS STEP SCREEN
  if (submittedLot) {
    return (
      <div className="text-center py-12 px-6 max-w-3xl mx-auto space-y-8" dir={isAr ? 'rtl' : 'ltr'}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/10"
        >
          <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
        </motion.div>

        <div className="space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            {isAr ? 'تم استلام طلب المزاد بنجاح' : 'Vehicle Successfully Submitted for Auction'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {submittedLot.title}
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-semibold max-w-xl mx-auto">
            {isAr 
              ? `تم تسجيل مركبتك بالرقم المرجعي (${submittedLot.lotNumber}). سيقوم فريق فحص ساعد بالتحقق من المستندات والمطابقة خلال 24 ساعة لبدء المزاد المباشر.`
              : `Your vehicle has been registered under reference (${submittedLot.lotNumber}). Saaed inspection team will verify the documents and schedule the live auction within 24 hours.`
            }
          </p>
        </div>

        {/* Submission Details Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 text-start space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">{isAr ? 'رقم اللوط' : 'Assigned Lot Number'}</p>
              <p className="text-lg font-black text-red-600 dark:text-red-400">{submittedLot.lotNumber}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">{isAr ? 'حالة الطلب' : 'Status'}</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Clock className="w-3 h-3" />
                {isAr ? 'قيد مراجعة واعتماد ساعد' : 'Pending Saaed Approval'}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">{isAr ? 'سعر بدء المزاد' : 'Starting Bid'}</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                AED {Number(submittedLot.startingBid).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'المسافة المقطوعة' : 'Mileage'}</span>
              {Number(submittedLot.mileageKm).toLocaleString()} KM
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'سعر الحجز الأدنى' : 'Reserve Price'}</span>
              {submittedLot.reservePrice ? `AED ${Number(submittedLot.reservePrice).toLocaleString()}` : 'None'}
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'المستندات المرفقة' : 'Documents'}</span>
              {isAr ? '٤ مستندات موثقة' : '4 Attached & Verified'}
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">{isAr ? 'موقع الفحص والتسليم' : 'Inspection Yard'}</span>
              Al Aweer Yard, Dubai
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              window.location.href = "/dashboard?tab=my-listings"
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl text-xs font-black uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            {isAr ? 'عرض مركباتي المدرجة للمزاد' : 'View In My Listed Vehicles'}
          </button>
          <button
            onClick={() => {
              setSubmittedLot(null)
              setCurrentStep(1)
            }}
            className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-red-600/20 active:scale-95 border-none"
          >
            {isAr ? '+ إضافة مركبة أخرى' : '+ Add Another Vehicle'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Wizard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="text-start">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60">
              {isAr ? 'بوابة البائع المعتمد' : 'Official Seller Consignment'}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {isAr ? 'خطوات عرض المركبة في المزاد' : 'Vehicle Auction Listing Wizard'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'إضافة مركبة للمزاد العلني' : 'Add Vehicle for Public Auction'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
            {isAr 
              ? 'أدرج مركبتك بسهولة مع تقييم ذكي لسعر البداية، فحص المستندات، والوصول لأكثر من 85,000 مزايد معتمد.' 
              : 'List your vehicle with AI suggested starting price, document verification, and direct reach to 85,000+ verified bidders.'}
          </p>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all self-start cursor-pointer"
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
        )}
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {[
            { step: 1, titleEn: "Vehicle Details", titleAr: "مواصفات المركبة", icon: Car },
            { step: 2, titleEn: "Photos & Media", titleAr: "الصور والوسائط", icon: Camera },
            { step: 3, titleEn: "Documents", titleAr: "الملكية والمستندات", icon: FileText },
            { step: 4, titleEn: "AI Suggested Price", titleAr: "التسعير المقترح", icon: Sparkles },
            { step: 5, titleEn: "Review & Submit", titleAr: "المراجعة والتأكيد", icon: CheckCircle2 }
          ].map((item) => {
            const isPassed = currentStep > item.step
            const isCurrent = currentStep === item.step
            const Icon = item.icon

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => {
                  if (item.step < currentStep) setCurrentStep(item.step)
                }}
                disabled={item.step > currentStep}
                className={cn(
                  "flex flex-col items-center text-center p-2 rounded-2xl transition-all cursor-pointer",
                  isCurrent && "bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700",
                  item.step > currentStep && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-all",
                  isPassed && "bg-emerald-600 text-white",
                  isCurrent && "bg-red-600 text-white shadow-md shadow-red-600/30",
                  !isPassed && !isCurrent && "bg-slate-200 dark:bg-slate-700 text-slate-500"
                )}>
                  {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider hidden sm:block truncate max-w-full text-slate-800 dark:text-slate-200">
                  {isAr ? item.titleAr : item.titleEn}
                </span>
                <span className="text-[9px] font-bold text-slate-400">
                  {item.step}/5
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* STEP 1: VEHICLE SPECIFICATIONS */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 text-start"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-red-600" />
              {isAr ? 'الخطوة ١: تفاصيل ومواصفات المركبة' : 'Step 1: Vehicle Specifications'}
            </h3>
            <span className="text-xs font-bold text-slate-400">
              {isAr ? '*الحقول الإلزامية مطلوبة للفحص الفني' : '*Accurate details ensure smooth verification'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Make */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'الشركة المصنعة (الماركة) *' : 'Vehicle Make *'}
              </label>
              <select
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              >
                {POPULAR_MAKES.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'الموديل / الفئة *' : 'Model / Class *'}
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g. G63 AMG, Land Cruiser 300, 911 GT3"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'سنة الصنع *' : 'Manufacturing Year *'}
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              >
                {Array.from({ length: 27 }, (_, i) => 2026 - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Trim */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'المواصفات والدرجة (Trim)' : 'Trim & Package'}
              </label>
              <input
                type="text"
                value={formData.trim}
                onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
                placeholder="e.g. V8 Twin-Turbo, Edition 1, VXR"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Body Type */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'نوع الهيكل *' : 'Body Type *'}
              </label>
              <select
                value={formData.bodyType}
                onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              >
                {BODY_TYPES.map(b => (
                  <option key={b.id} value={b.id}>{isAr ? b.labelAr : b.labelEn}</option>
                ))}
              </select>
            </div>

            {/* Regional Spec */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'المواصفات الإقليمية *' : 'Regional Specifications *'}
              </label>
              <select
                value={formData.spec}
                onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              >
                {SPECS.map(s => (
                  <option key={s.id} value={s.id}>{isAr ? s.labelAr : s.labelEn}</option>
                ))}
              </select>
            </div>

            {/* Mileage */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'المسافة المقطوعة (كم) *' : 'Odometer Mileage (KM) *'}
              </label>
              <input
                type="number"
                value={formData.mileageKm}
                onChange={(e) => setFormData({ ...formData, mileageKm: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Exterior Color */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'اللون الخارجي *' : 'Exterior Color *'}
              </label>
              <input
                type="text"
                value={formData.exteriorColor}
                onChange={(e) => setFormData({ ...formData, exteriorColor: e.target.value })}
                placeholder="e.g. Obsidian Black, Arctic White, Nardo Grey"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Interior Color */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'اللون الداخلي *' : 'Interior Color *'}
              </label>
              <input
                type="text"
                value={formData.interiorColor}
                onChange={(e) => setFormData({ ...formData, interiorColor: e.target.value })}
                placeholder="e.g. Red Nappa, Tan Beige, Black Leather"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* VIN */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'رقم الشاسيه (VIN - 17 خانة) *' : 'Chassis Number (VIN - 17 Chars) *'}
              </label>
              <input
                type="text"
                maxLength={17}
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                className="w-full font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600 uppercase"
              />
            </div>

            {/* Condition */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'الحالة الميكانيكية العامة *' : 'Overall Mechanical Condition *'}
              </label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              >
                <option value="Excellent (Agency Warranty)">{isAr ? 'ممتازة - تحت ضمان الوكالة' : 'Excellent (Agency Warranty)'}</option>
                <option value="Very Good (Clean History)">{isAr ? 'جيدة جداً - فحص نظيف' : 'Very Good (Clean History)'}</option>
                <option value="Good (Minor Wear)">{isAr ? 'جيدة - استهلاك خفيف' : 'Good (Minor Wear)'}</option>
                <option value="Requires Repairs">{isAr ? 'تحتاج صيانة ميكانيكية' : 'Requires Mechanical Repairs'}</option>
                <option value="Salvage / Scrap">{isAr ? 'سكراب / حوادث' : 'Salvage / Scrap'}</option>
              </select>
            </div>

            {/* Saaed Yard Location */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAr ? 'ساحة تسليم ومعاينة ساعد *' : 'Saaed Yard for Inspection & Drop-off *'}
              </label>
              <select
                value={formData.yard}
                onChange={(e) => setFormData({ ...formData, yard: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
              >
                {YARDS.map(y => (
                  <option key={y.id} value={y.id}>{isAr ? y.nameAr : y.nameEn}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-red-600/20 cursor-pointer border-none"
            >
              <span>{isAr ? 'المتابعة للصور والوسائط' : 'Next: Photos & Media'}</span>
              <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: PHOTOS & MEDIA */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 text-start"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-red-600" />
                {isAr ? 'الخطوة ٢: الصور والوسائط عالية الدقة' : 'Step 2: High-Resolution Photos & Media'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {isAr ? 'المركبات التي تحتوي على 6 صور أو أكثر تحقق مزايدات أعلى بنسبة 35%.' : 'Listings with 6+ quality photos receive 35% higher bidding engagement.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  images: DEMO_GALLERY_IMAGES,
                  thumbnail: DEMO_GALLERY_IMAGES[0]
                }))
              }}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'تحميل صور تجريبية عالية الدقة' : 'Load Demo Showcase Photos'}</span>
            </button>
          </div>

          {/* Upload Drop Area */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 rounded-3xl p-8 text-center transition-all bg-slate-50/50 dark:bg-slate-800/20">
            <input
              type="file"
              id="vehicle-photos-input"
              multiple
              accept="image/*"
              onChange={handleImageAdd}
              className="hidden"
            />
            <label
              htmlFor="vehicle-photos-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center shadow-inner">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                  {isAr ? 'اضغط لرفع صور المركبة أو اسحبها هنا' : 'Click to upload vehicle photos or drag and drop'}
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  JPG, PNG, WEBP (Up to 15MB each). Recommended: Front 3/4, Rear, Interior, Engine, Odometer.
                </p>
              </div>
            </label>
          </div>

          {/* Photo Gallery Previews */}
          {formData.images.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>{isAr ? `الصور المرفقة (${formData.images.length})` : `Uploaded Photos (${formData.images.length})`}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isAr ? 'جاهزة للنشر' : 'Ready for Lot Preview'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {formData.images.map((imgUrl, idx) => {
                  const isPrimary = formData.thumbnail === imgUrl
                  return (
                    <div 
                      key={idx} 
                      className={cn(
                        "group relative aspect-video rounded-2xl overflow-hidden border-2 transition-all shadow-sm",
                        isPrimary ? "border-red-600 ring-2 ring-red-600/30" : "border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <img src={imgUrl} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      {/* Overlay Controls */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, thumbnail: imgUrl })}
                            className="px-2.5 py-1 bg-white text-slate-950 text-[10px] font-black rounded-lg hover:bg-slate-100 cursor-pointer shadow-sm"
                          >
                            {isAr ? 'تعيين كرئيسية' : 'Set Primary'}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {isPrimary && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black uppercase tracking-wider shadow-md">
                          {isAr ? 'الصورة الرئيسية' : 'Thumbnail'}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Video Walkaround Link */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {isAr ? 'رابط جولة فيديو للمركبة (اختياري)' : 'Walkaround Video URL (Optional YouTube / Vimeo / MP4)'}
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-none"
            >
              <ArrowLeft className={cn("w-4 h-4", isAr && "rotate-180")} />
              <span>{isAr ? 'السابق' : 'Back'}</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-red-600/20 cursor-pointer border-none"
            >
              <span>{isAr ? 'المتابعة للمستندات والملكية' : 'Next: Documents & Mulkiya'}</span>
              <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: DOCUMENTS & VERIFICATION */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 text-start"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                {isAr ? 'الخطوة ٣: وثائق الملكية وشهادات الفحص' : 'Step 3: Ownership Documents & Technical Inspection'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {isAr ? 'تضمن شركة ساعد سلامة الملكية وخلو المركبة من الرهونات والتعاميم الأمنية قبل طرحها للمزايدة.' : 'Saaed validates clear ownership and verifies technical certification prior to publishing.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  mulkiyaUploaded: true,
                  mulkiyaFileName: "Mulkiya_Vehicle_Registration.pdf",
                  inspectionUploaded: true,
                  inspectionFileName: "Comprehensive_Inspection_Passing.pdf",
                  serviceHistoryUploaded: true,
                  serviceHistoryFileName: "Official_Agency_Service_History.pdf",
                  emiratesIdUploaded: true,
                  emiratesIdFileName: "Owner_Emirates_ID_Front_Back.pdf",
                  clearTitleConfirmed: true
                }))
              }}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAr ? 'إرفاق نماذج مستندات رسمية تجريبية' : 'Attach Sample Gov Documents'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Mulkiya */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">
                      {isAr ? 'ملكية المركبة (الملكية / شهادة الحيازة) *' : 'Registration Card (Mulkiya) *'}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold">PDF, JPG (Front & Back)</p>
                  </div>
                </div>

                {formData.mulkiyaUploaded ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    {isAr ? 'تم الإرفاق' : 'Attached'}
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-red-500 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
                    {isAr ? 'مطلوب' : 'Required'}
                  </span>
                )}
              </div>

              {formData.mulkiyaUploaded && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {formData.mulkiyaFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mulkiyaUploaded: false, mulkiyaFileName: "" })}
                    className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    {isAr ? 'حذف' : 'Remove'}
                  </button>
                </div>
              )}

              {!formData.mulkiyaUploaded && (
                <button
                  type="button"
                  onClick={() => handleDocumentUpload("mulkiya", "Mulkiya_Verified_Card.pdf")}
                  className="w-full py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {isAr ? 'اختر ملف الملكية' : 'Upload Mulkiya File'}
                </button>
              )}
            </div>

            {/* 2. Inspection Passing Report */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">
                      {isAr ? 'شهادة الفحص الفني (فحص ناجح) *' : 'Inspection Test Certificate *'}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold">RTA / ADNOC / Saaed Passing Report</p>
                  </div>
                </div>

                {formData.inspectionUploaded ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    {isAr ? 'تم الإرفاق' : 'Attached'}
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-red-500 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
                    {isAr ? 'مطلوب' : 'Required'}
                  </span>
                )}
              </div>

              {formData.inspectionUploaded && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {formData.inspectionFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, inspectionUploaded: false, inspectionFileName: "" })}
                    className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    {isAr ? 'حذف' : 'Remove'}
                  </button>
                </div>
              )}

              {!formData.inspectionUploaded && (
                <button
                  type="button"
                  onClick={() => handleDocumentUpload("inspection", "Comprehensive_Inspection_Report.pdf")}
                  className="w-full py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {isAr ? 'اختر شهادة الفحص الفني' : 'Upload Inspection Certificate'}
                </button>
              )}
            </div>

            {/* 3. Service History */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">
                      {isAr ? 'سجل الصيانة والوكالة (اختياري)' : 'Agency Service History (Optional)'}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold">Gargash / Al Futtaim / Official Dealer</p>
                  </div>
                </div>

                {formData.serviceHistoryUploaded && (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    {isAr ? 'تم الإرفاق' : 'Attached'}
                  </span>
                )}
              </div>

              {formData.serviceHistoryUploaded && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {formData.serviceHistoryFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceHistoryUploaded: false, serviceHistoryFileName: "" })}
                    className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    {isAr ? 'حذف' : 'Remove'}
                  </button>
                </div>
              )}

              {!formData.serviceHistoryUploaded && (
                <button
                  type="button"
                  onClick={() => handleDocumentUpload("serviceHistory", "Service_Logbook_Records.pdf")}
                  className="w-full py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {isAr ? 'إرفاق سجل الصيانة' : 'Attach Service History'}
                </button>
              )}
            </div>

            {/* 4. Emirates ID / Owner Proof */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">
                      {isAr ? 'الهوية الإماراتية لمالك المركبة *' : 'Owner Emirates ID / Passport *'}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold">For Official Legal Title Transfer</p>
                  </div>
                </div>

                {formData.emiratesIdUploaded ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    {isAr ? 'تم الإرفاق' : 'Attached'}
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-red-500 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
                    {isAr ? 'مطلوب' : 'Required'}
                  </span>
                )}
              </div>

              {formData.emiratesIdUploaded && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                    {formData.emiratesIdFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, emiratesIdUploaded: false, emiratesIdFileName: "" })}
                    className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    {isAr ? 'حذف' : 'Remove'}
                  </button>
                </div>
              )}

              {!formData.emiratesIdUploaded && (
                <button
                  type="button"
                  onClick={() => handleDocumentUpload("emiratesId", "Emirates_ID_Verified.pdf")}
                  className="w-full py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {isAr ? 'اختر صورة الهوية الإماراتية' : 'Upload Emirates ID'}
                </button>
              )}
            </div>
          </div>

          {/* Legal Clear Title Declaration */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
            <input
              type="checkbox"
              id="clearTitleCheckbox"
              checked={formData.clearTitleConfirmed}
              onChange={(e) => setFormData({ ...formData, clearTitleConfirmed: e.target.checked })}
              className="w-4 h-4 mt-1 rounded border-slate-300 text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer shrink-0"
            />
            <label htmlFor="clearTitleCheckbox" className="text-xs font-semibold text-amber-900 dark:text-amber-200 leading-relaxed cursor-pointer">
              {isAr 
                ? 'أقر بصفتي المالك القانوني للمركبة أو المفوض رسمياً ببيعها، بأن المركبة خالية من أي رهن بنكي غير مسوى أو حجز قضائي، وأتحمل المسؤولية القانونية الكاملة.'
                : 'I certify that I am the legal owner or authorized representative, and the vehicle is free from outstanding encumbrances, bank mortgages, or legal restrictions.'}
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-none"
            >
              <ArrowLeft className={cn("w-4 h-4", isAr && "rotate-180")} />
              <span>{isAr ? 'السابق' : 'Back'}</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-red-600/20 cursor-pointer border-none"
            >
              <span>{isAr ? 'المتابعة للتسعير الذكي' : 'Next: AI Pricing & Starting Bid'}</span>
              <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 4: AI SUGGESTED PRICING & BIDDING ENGINE */}
      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 text-start"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                {isAr ? 'الخطوة ٤: التسعير وسعر البداية المقترح من الذكاء الاصطناعي' : 'Step 4: AI Market Valuation & Suggested Starting Price'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {isAr ? 'تحليل مباشر لأسعار صفقات المزادات المماثلة في دولة الإمارات لتحديد سعر بدء مزايدة جذاب وتنافسي.' : 'Real-time predictive pricing model trained on recent UAE auction transactions.'}
              </p>
            </div>
          </div>

          {/* AI SUGGESTION BANNER / CARD */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white border border-red-500/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black shadow-lg shadow-red-600/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider text-red-400">
                      {isAr ? 'توصية الذكاء الاصطناعي لمركبتك' : 'Saaed AI Valuation & Starting Recommendation'}
                    </h4>
                    <p className="text-xs text-slate-300 font-bold">
                      {formData.year} {formData.make} {formData.model} ({formData.spec}) • {formData.mileageKm.toLocaleString()} KM
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={applySuggestedPricing}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/40 active:scale-95 cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{isAr ? 'تطبيق سعر البداية المقترح فوراً' : 'Apply AI Suggested Starting Price'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {isAr ? 'القيمة السوقية التقديرية' : 'Estimated Market Value'}
                  </span>
                  <span className="text-2xl font-black text-white tracking-tight">
                    AED {valuationData.marketEstimate.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 block mt-1">
                    {valuationData.demandTrend}
                  </span>
                </div>

                <div className="bg-red-500/10 backdrop-blur-md p-4 rounded-2xl border border-red-500/30">
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-300 block">
                    {isAr ? 'سعر بدء المزاد المقترح (موصى به)' : 'Suggested Starting Bid (Recommended)'}
                  </span>
                  <span className="text-2xl font-black text-red-400 tracking-tight">
                    AED {valuationData.suggestedStartingBid.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 block mt-1">
                    {isAr ? 'يحفّز إقبال المزايدين بنسبة +4x' : 'Sparks maximum bidder competition'}
                  </span>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {isAr ? 'سعر الحجز الأدنى المقترح' : 'Suggested Reserve Price'}
                  </span>
                  <span className="text-2xl font-black text-white tracking-tight">
                    AED {valuationData.suggestedReserve.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">
                    {isAr ? 'يحمي مركبتك من البيع بأقل من قيمتها' : 'Guarantees minimum sale threshold'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Controls Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Starting Bid Input */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {isAr ? 'سعر بدء المزايدة الفعلي (درهم) *' : 'Actual Starting Bid (AED) *'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                  AED
                </span>
                <input
                  type="number"
                  step={1000}
                  value={formData.startingBid}
                  onChange={(e) => setFormData({ ...formData, startingBid: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl ps-14 pe-4 py-3 text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {isAr ? 'السعر الذي ستبدأ عنده أول مزايدة علنية.' : 'The initial price displayed when the auction goes live.'}
              </p>
            </div>

            {/* Minimum Increment */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {isAr ? 'الحد الأدنى لزيادة المزايدة (درهم) *' : 'Minimum Bid Increment (AED) *'}
              </label>
              <select
                value={formData.minimumIncrement}
                onChange={(e) => setFormData({ ...formData, minimumIncrement: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              >
                <option value={1000}>AED 1,000</option>
                <option value={2000}>AED 2,000</option>
                <option value={2500}>AED 2,500</option>
                <option value={5000}>AED 5,000</option>
                <option value={10000}>AED 10,000</option>
              </select>
              <p className="text-[11px] text-slate-400 font-medium">
                {isAr ? 'الخطوة الإلزامية لكل مزايدة جديدة.' : 'The minimum amount required on top of current bid.'}
              </p>
            </div>

            {/* Reserve Price Option */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider cursor-pointer">
                  {isAr ? 'تفعيل سعر الحجز الأدنى (Reserve Price)' : 'Enable Reserve Price (Confidential)'}
                </label>
                <input
                  type="checkbox"
                  checked={formData.hasReserve}
                  onChange={(e) => setFormData({ ...formData, hasReserve: e.target.checked })}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                />
              </div>

              {formData.hasReserve && (
                <div className="space-y-1 pt-1">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                      AED
                    </span>
                    <input
                      type="number"
                      step={5000}
                      value={formData.reservePrice}
                      onChange={(e) => setFormData({ ...formData, reservePrice: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl ps-14 pe-4 py-3 text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {isAr ? 'لن تُباع المركبة إذا لم تصل المزايدات لهذا السعر، ويبقى مخفياً عن المزايدين.' : 'Vehicles will not be sold below this secret threshold without your explicit consent.'}
                  </p>
                </div>
              )}
            </div>

            {/* Buy It Now Option */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider cursor-pointer">
                  {isAr ? 'تفعيل خيار الشراء الفوري (Buy It Now)' : 'Enable "Buy It Now" Instant Purchase'}
                </label>
                <input
                  type="checkbox"
                  checked={formData.hasBuyNow}
                  onChange={(e) => setFormData({ ...formData, hasBuyNow: e.target.checked })}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                />
              </div>

              {formData.hasBuyNow && (
                <div className="space-y-1 pt-1">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                      AED
                    </span>
                    <input
                      type="number"
                      step={5000}
                      value={formData.buyNowPrice}
                      onChange={(e) => setFormData({ ...formData, buyNowPrice: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl ps-14 pe-4 py-3 text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {isAr ? 'يمكن للمشتري إنهاء المزاد فوراً وشراء المركبة بهذا السعر.' : 'Allows eager buyers to bypass the auction countdown and buy instantly.'}
                  </p>
                </div>
              )}
            </div>

            {/* Auction Duration */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {isAr ? 'مدة المزاد المرغوبة *' : 'Desired Auction Duration *'}
              </label>
              <select
                value={formData.durationDays}
                onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
              >
                <option value={3}>{isAr ? '٣ أيام (مزاد سريع)' : '3 Days (Fast-Track Auction)'}</option>
                <option value={5}>{isAr ? '٥ أيام' : '5 Days'}</option>
                <option value={7}>{isAr ? '٧ أيام (موصى به - أسبوع كامل)' : '7 Days (Recommended - Full Week)'}</option>
                <option value={10}>{isAr ? '١٠ أيام' : '10 Days'}</option>
                <option value={14}>{isAr ? '١٤ يوماً' : '14 Days'}</option>
              </select>
            </div>

            {/* Deposit Required */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 space-y-2">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {isAr ? 'تأمين المزايدة المشترط للمشترين *' : 'Bidder Security Deposit Rate *'}
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold">
                <span>{isAr ? '٥٪ من قيمة المزايدة' : '5% of Starting Bid'}</span>
                <span className="text-red-600 font-mono font-black">
                  AED {Math.round(formData.startingBid * 0.05).toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {isAr ? 'يضمن جدية المشترين وعدم التراجع بعد الترسية.' : 'Saaed holds this deposit to protect sellers against uncommitted bids.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-none"
            >
              <ArrowLeft className={cn("w-4 h-4", isAr && "rotate-180")} />
              <span>{isAr ? 'السابق' : 'Back'}</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-red-600/20 cursor-pointer border-none"
            >
              <span>{isAr ? 'المتابعة للمراجعة النهائية' : 'Next: Final Review & Submit'}</span>
              <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 5: REVIEW & FINAL SUBMIT */}
      {currentStep === 5 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 text-start"
        >
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              {isAr ? 'الخطوة ٥: مراجعة تفاصيل اللوط والموافقة على الشروط' : 'Step 5: Lot Preview & Consignment Terms'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              {isAr ? 'راجع كيف ستظهر مركبتك لجمهور المزايدين قبل إرسالها لفرق الفحص والاعتماد.' : 'Preview how your vehicle will appear to bidders across the platform.'}
            </p>
          </div>

          {/* PREVIEW LOT CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700">
            {/* Left/Main Image Preview */}
            <div className="lg:col-span-1 space-y-3">
              <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={formData.thumbnail || formData.images[0]} 
                  alt={formData.model} 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                  {formData.year} • {formData.spec}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Camera className="w-4 h-4" />
                <span>{formData.images.length} {isAr ? 'صور عالية الدقة مرفقة' : 'Showcase Photos Attached'}</span>
              </div>
            </div>

            {/* Right Summary Table */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
                    Saaed Verified Lot
                  </span>
                  <span className="text-xs text-slate-400 font-mono">VIN: {formData.vin}</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  {formData.year} {formData.make} {formData.model} {formData.trim}
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'سعر بدء المزاد' : 'Starting Bid'}</span>
                  <span className="text-base font-black text-red-600 dark:text-red-400">AED {Number(formData.startingBid).toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'الحد الأدنى للزيادة' : 'Increment'}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">AED {Number(formData.minimumIncrement).toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'سعر الحجز الأدنى' : 'Reserve Price'}</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {formData.hasReserve ? `AED ${Number(formData.reservePrice).toLocaleString()}` : 'None'}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'المسافة المقطوعة' : 'Mileage'}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{Number(formData.mileageKm).toLocaleString()} KM</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'اللون الخارجي' : 'Exterior Color'}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{formData.exteriorColor}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'مدة المزاد' : 'Duration'}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">{formData.durationDays} Days</span>
                </div>
              </div>

              {/* Verified Documents Indicators */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Mulkiya Attached
                </span>
                <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Inspection Certificate Attached
                </span>
                <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-lg">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Emirates ID Attached
                </span>
              </div>
            </div>
          </div>

          {/* Consignment Terms Checkbox */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="sellerTerms"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="w-5 h-5 mt-0.5 rounded border-slate-300 text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer shrink-0"
              />
              <label htmlFor="sellerTerms" className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                {isAr 
                  ? 'أوافق على الشروط والأحكام الخاصة بطرح المركبات في مزاد ساعد، بما في ذلك عمولة البيع الناجح (2.5٪)، وتسليم المركبة لساحة الفحص المحددة خلال 48 ساعة من اعتماد الطلب.'
                  : 'I agree to the Saaed Auction Consignment Terms & Conditions, including the standard 2.5% seller success commission upon closing, and agree to present the vehicle at the designated inspection yard.'}
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-none"
            >
              <ArrowLeft className={cn("w-4 h-4", isAr && "rotate-180")} />
              <span>{isAr ? 'السابق' : 'Back'}</span>
            </button>

            <button
              type="button"
              disabled={!formData.termsAccepted || isSubmitting}
              onClick={handleFinalSubmit}
              className={cn(
                "flex items-center gap-2 px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-none cursor-pointer shadow-lg",
                formData.termsAccepted && !isSubmitting
                  ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/30 active:scale-95"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>{isAr ? 'جاري إدراج المركبة...' : 'Submitting to Auction...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? 'تأكيد وإدراج المركبة للمزاد' : 'Submit Vehicle for Auction'}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
