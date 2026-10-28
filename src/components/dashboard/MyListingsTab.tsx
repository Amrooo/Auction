"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Car, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Gavel, 
  Eye, 
  FileText, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Tag
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

interface MyListingsTabProps {
  onStartListingWizard: () => void
}

export default function MyListingsTab({ onStartListingWizard }: MyListingsTabProps) {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'

  const [listedVehicles, setListedVehicles] = useState<any[]>([])

  useEffect(() => {
    // Initial mock vehicle listed by the user
    const defaultListings = [
      {
        id: "usr-init-1",
        lotNumber: "LOT-UAE-9412",
        title: "2024 Mercedes-Benz G63 AMG Grand Edition",
        titleAr: "مرسيدس-بنز G63 AMG إصدار جراند 2024",
        thumbnail: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2670&auto=format&fit=crop",
        startingBid: 720000,
        currentBid: 785000,
        reservePrice: 850000,
        mileageKm: 12400,
        status: "live",
        bidsCount: 14,
        endTime: "1d 14h",
        yardName: "Al Aweer Auto Market Yard, Dubai",
        submittedAt: "2026-06-01"
      },
      {
        id: "usr-init-2",
        lotNumber: "LOT-UAE-8109",
        title: "2023 Porsche 911 Carrera S (GCC)",
        titleAr: "بورشه 911 كاريرا إس 2023 (خليجي)",
        thumbnail: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670&auto=format&fit=crop",
        startingBid: 490000,
        currentBid: 490000,
        reservePrice: 530000,
        mileageKm: 18900,
        status: "pending_approval",
        bidsCount: 0,
        endTime: "Starts in 2d",
        yardName: "Musaffah Central Yard, Abu Dhabi",
        submittedAt: "2026-06-07"
      }
    ]

    try {
      const saved = localStorage.getItem("user_listed_vehicles")
      if (saved) {
        const parsed = JSON.parse(saved)
        // Combine newly added listings at top
        const combined = [...parsed, ...defaultListings.filter(d => !parsed.some((p: any) => p.lotNumber === d.lotNumber))]
        setListedVehicles(combined)
      } else {
        setListedVehicles(defaultListings)
      }
    } catch {
      setListedVehicles(defaultListings)
    }
  }, [])

  return (
    <div className="space-y-6 text-start" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Car className="w-6 h-6 text-red-600" />
            <span>{isAr ? 'مركباتي المعروضة للمزاد' : 'My Listed Vehicles for Auction'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
            {isAr ? 'تابع حالة مركباتك، العطاءات المباشرة، وتقارير الفحص والاعتماد من ساعد.' : 'Track your vehicle listings, live bids, and Saaed inspection status in real time.'}
          </p>
        </div>

        <button
          onClick={onStartListingWizard}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer border-none self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isAr ? '+ إضافة مركبة للمزاد' : '+ Add Vehicle for Auction'}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            {isAr ? 'إجمالي المعروض' : 'Total Listed'}
          </span>
          <span className="text-xl font-black text-slate-900 dark:text-white">
            {listedVehicles.length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
            {isAr ? 'في المزاد المباشر' : 'Live on Auction'}
          </span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">
            {listedVehicles.filter(v => v.status === 'live').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
            {isAr ? 'قيد المراجعة والفحص' : 'Under Review'}
          </span>
          <span className="text-xl font-black text-amber-700 dark:text-amber-300">
            {listedVehicles.filter(v => v.status !== 'live' && v.status !== 'sold').length}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            {isAr ? 'أعلى مزايدة مسجلة' : 'Highest Current Bid'}
          </span>
          <span className="text-xl font-black text-red-600 dark:text-red-400">
            AED {Math.max(...listedVehicles.map(v => Number(v.currentBid) || 0)).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Vehicles Table / Cards */}
      <div className="space-y-4">
        {listedVehicles.map((vehicle) => {
          const isLive = vehicle.status === "live"
          const isPending = vehicle.status === "pending_approval" || vehicle.status === "draft"

          return (
            <div
              key={vehicle.id || vehicle.lotNumber}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Image & Title */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-24 h-18 sm:w-32 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={vehicle.thumbnail || vehicle.images?.[0]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[9px] font-black font-mono">
                    {vehicle.lotNumber}
                  </span>
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {isAr ? 'مزاد مباشر الآن' : 'Live Auction'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        <Clock className="w-3 h-3" />
                        {isAr ? 'قيد التدقيق والفحص' : 'Pending Verification'}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                      {vehicle.mileageKm ? `${Number(vehicle.mileageKm).toLocaleString()} KM` : ''}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-slate-900 dark:text-white truncate">
                    {isAr && vehicle.titleAr ? vehicle.titleAr : vehicle.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-medium truncate">
                    {vehicle.yardName || "Saaed Al Aweer Auto Market Yard, Dubai"}
                  </p>
                </div>
              </div>

              {/* Bidding & Pricing Info */}
              <div className="flex flex-wrap items-center gap-6 lg:gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    {isAr ? 'سعر البدء' : 'Starting Bid'}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    AED {Number(vehicle.startingBid).toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    {isAr ? 'أعلى مزايدة حالية' : 'Current Highest Bid'}
                  </span>
                  <span className="text-base font-black text-red-600 dark:text-red-400">
                    AED {Number(vehicle.currentBid || vehicle.startingBid).toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    {isAr ? 'عدد المزايدات' : 'Total Bids'}
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1">
                    <Gavel className="w-3.5 h-3.5 text-slate-400" />
                    {vehicle.bidsCount || 0}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block">
                    {isAr ? 'الوقت المتبقي' : 'Time Remaining'}
                  </span>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                    {vehicle.endTime || "Active"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/auctions/${vehicle.id || 'm1'}`}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isAr ? 'معاينة المزاد' : 'View Page'}</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
