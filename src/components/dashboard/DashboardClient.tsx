"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { AuctionCard } from "@/components/auction/AuctionCard"
import VehicleListingWizard from "@/components/dashboard/VehicleListingWizard"
import MyListingsTab from "@/components/dashboard/MyListingsTab"
import { 
  Gavel, 
  Trophy, 
  Clock, 
  Wallet,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  Heart,
  CreditCard,
  FileText,
  Calendar,
  LifeBuoy,
  User,
  CheckCircle,
  AlertCircle,
  Download,
  Car,
  Plus
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function DashboardClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "overview"
  const { t, language } = useLanguage()
  const [depositBalance, setDepositBalance] = useState(50000)

  // Sync deposit balance with localStorage updates
  useEffect(() => {
    const checkBalance = () => {
      const saved = localStorage.getItem("bid_security_deposit")
      const base = 50000
      if (saved) {
        setDepositBalance(base + Number(saved))
      } else {
        setDepositBalance(base)
      }
    }
    checkBalance()
    window.addEventListener("balance_update", checkBalance)
    return () => window.removeEventListener("balance_update", checkBalance)
  }, [])

  // Mock Data
  const activeBids = [
    {
      id: "1",
      title: "2023 Porsche 911 GT3 RS",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670&auto=format&fit=crop",
      currentBid: 850000,
      endTime: "2h 15m",
      aiInsight: "High Demand",
      bids: 42
    },
    {
      id: "3",
      title: "VIP Plate Number A-99",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2636&auto=format&fit=crop",
      currentBid: 4500000,
      endTime: "45m",
      aiInsight: "Trending",
      bids: 156
    }
  ]

  const watchedAuctions = [
    {
      id: "2",
      title: "Luxury Palm Jumeirah Villa",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
      currentBid: 15200000,
      endTime: "5d 12h",
      aiInsight: "Undervalued",
      bids: 18
    },
    {
      id: "4",
      title: "Rolex Daytona Panda",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2680&auto=format&fit=crop",
      currentBid: 125000,
      endTime: "12h 30m",
      bids: 24
    }
  ]

  const savedFiltersList = [
    { id: 1, title: "Porsche 911", category: "Motors", minPrice: "500,000", maxPrice: "1,200,000" },
    { id: 2, title: "Dubai Plates (2 Digits)", category: "Plates", minPrice: "1,000,000", maxPrice: "5,000,000" },
    { id: 3, title: "Palm Jumeirah Villas", category: "Real Estate", minPrice: "10,000,000", maxPrice: "25,000,000" }
  ]

  const purchasesHistory = [
    { id: "INV-2026-001", date: "2026-05-12", item: "2022 Lamborghini Urus", amount: 1100000, status: "Paid" },
    { id: "INV-2026-002", date: "2026-05-28", item: "VIP Plate Number A-99 (Bid deposit)", amount: 5000, status: "Refunded" },
    { id: "INV-2026-003", date: "2026-06-02", item: "Rolex Daytona Panda", amount: 125000, status: "Paid" }
  ]

  const wonItemsList = [
    { id: "w1", title: "2022 Lamborghini Urus", price: 1100000, date: "May 12, 2026", image: "https://images.unsplash.com/photo-1621609764095-b22d11ad25ac?q=80&w=2592&auto=format&fit=crop" },
    { id: "w2", title: "Rolex Daytona Panda", price: 125000, date: "Jun 02, 2026", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2680&auto=format&fit=crop" }
  ]

  const requestsList = [
    { id: "R-7291", type: "Bidding Limit Upgrade", status: "Approved", date: "2026-06-05" },
    { id: "R-7230", type: "Emirates ID Verification Upload", status: "Verified", date: "2026-05-20" }
  ]

  const appointmentsList = [
    { id: "A-552", service: "Vehicle Inspection - Palm Yard", date: "2026-06-15", time: "10:00 AM", status: "Scheduled" },
    { id: "A-549", service: "Ownership Certificate Pick up - RTA Hub", date: "2026-05-18", time: "02:30 PM", status: "Completed" }
  ]

  const supportTicketsList = [
    { id: "TKT-901", subject: "Bidding countdown clock delay", category: "Technical", status: "Closed", lastUpdated: "2026-06-04" },
    { id: "TKT-904", subject: "Inquire about vehicle shipping options", category: "Towing & Delivery", status: "Open", lastUpdated: "2026-06-08" }
  ]

  // Form profile state
  const [profileName, setProfileName] = useState("Amro El-Gezeri")
  const [profileEmail, setProfileEmail] = useState("amro@example.com")
  const [profilePhone, setProfilePhone] = useState("+971 50 123 4567")
  const [profileId, setProfileId] = useState("784-1990-1234567-1")
  const [isSaved, setIsSaved] = useState(false)

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  // Animation variants
  const panelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  }

  return (
    <div className="space-y-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2",
          language === 'ar' && "sm:flex-row-reverse"
        )}
      >
        <div className="text-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/60">
              {t("Customer Portal") || "Customer Portal"}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {language === 'ar' ? 'لوحة المزادات المباشرة' : 'Live Auction Hub'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === 'ar' ? `مرحباً، عمرو! 👋` : `Hello, Amro! 👋`}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-bold mt-1">
            {t("Welcome back to your auction dashboard.")}
          </p>
        </div>

        <div className={cn("flex flex-wrap items-center gap-3 shrink-0", language === 'ar' && "flex-row-reverse")}>
          <button
            onClick={() => router.push("/dashboard?tab=sell")}
            className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/25 active:scale-95 cursor-pointer border-none"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{language === 'ar' ? 'أضف مركبة للمزاد' : 'Add Vehicle for Auction'}</span>
          </button>

          <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md shadow-amber-500/20">
              VIP
            </div>
            <div className="text-start">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none">
                {t("Membership Tier") || "Membership Tier"}
              </p>
              <p className="font-black text-xs text-slate-900 dark:text-white mt-1 leading-none">
                {t("Pro Bidder") || "Pro Bidder"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label={t("Active Bids")} 
          value={activeBids.length.toString()} 
          icon={Gavel} 
          change="1" 
          trend="up" 
          color="blue"
        />
        <StatsCard 
          label={t("Auctions Won") || "Auctions Won"} 
          value={wonItemsList.length.toString()} 
          icon={Trophy} 
          change="0" 
          trend="up" 
          color="emerald"
        />
        <StatsCard 
          label={t("Watchlist")} 
          value={watchedAuctions.length.toString()} 
          icon={Heart} 
          change="2" 
          trend="up" 
          color="purple"
        />
        <StatsCard 
          label={t("Available Balance")} 
          value={`AED ${depositBalance.toLocaleString()}`} 
          icon={Wallet} 
          color="accent"
        />
      </div>

      {/* Dynamic Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={panelVariants}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.03)]"
        >
          {/* 0. VEHICLE LISTING WIZARD PANEL */}
          {currentTab === "sell" && (
            <div className="space-y-6">
              <VehicleListingWizard
                onSuccess={() => {
                  router.push("/dashboard?tab=my-listings")
                }}
                onCancel={() => {
                  router.push("/dashboard?tab=overview")
                }}
              />
            </div>
          )}

          {/* 0.1 MY LISTED VEHICLES PANEL */}
          {currentTab === "my-listings" && (
            <div className="space-y-6">
              <MyListingsTab
                onStartListingWizard={() => {
                  router.push("/dashboard?tab=sell")
                }}
              />
            </div>
          )}

          {/* 1. OVERVIEW PANEL */}
          {currentTab === "overview" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 space-y-8 text-start">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t("Your Active Bids")}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeBids.map((bid) => (
                    <AuctionCard key={bid.id} {...bid} />
                  ))}
                </div>
              </div>
              <div className="xl:col-span-1">
                <ActivityFeed />
              </div>
            </div>
          )}

          {/* 2. SAVED FILTERS PANEL */}
          {currentTab === "saved-filters" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <SlidersHorizontal className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("Saved Filters") || "Saved Filters"}
              </h2>
              <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">{t("Search Phrase") || "Search Phrase"}</th>
                      <th className="px-6 py-4">{t("Category") || "Category"}</th>
                      <th className="px-6 py-4">{t("Price Limits") || "Price Limits"}</th>
                      <th className="px-6 py-4 text-center">{t("Actions") || "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {savedFiltersList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{item.title}</td>
                        <td className="px-6 py-4 font-bold">{t(item.category)}</td>
                        <td className="px-6 py-4 font-bold text-xs text-slate-700 dark:text-slate-300">
                          AED {item.minPrice} - AED {item.maxPrice}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-xs font-black text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                            {t("Remove") || "Remove"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. WATCHLIST PANEL */}
          {currentTab === "watchlist" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <Heart className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom fill-red-600/10" />
                {t("Watchlist") || "Watchlist"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {watchedAuctions.map((item) => (
                  <AuctionCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          )}

          {/* 4. MY BIDS PANEL */}
          {currentTab === "my-bids" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <Gavel className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("My Bids") || "My Bids"}
              </h2>
              <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">{t("Item Info") || "Item Info"}</th>
                      <th className="px-6 py-4 text-center">{t("Bid Status") || "Bid Status"}</th>
                      <th className="px-6 py-4 text-end">{t("Your Bid") || "Your Bid"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {activeBids.map((bid) => (
                      <tr key={bid.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img src={bid.image} alt={bid.title} className="w-12 h-10 object-cover rounded-lg" />
                          <span className="font-black text-slate-900 dark:text-white">{bid.title}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-black px-3 py-1 rounded-full uppercase">
                            {t("Leading") || "Leading"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-end font-black text-slate-900 dark:text-white">
                          AED {bid.currentBid.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. MY PURCHASES PANEL */}
          {currentTab === "my-purchases" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <CreditCard className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("My Purchases") || "My Purchases"}
              </h2>
              <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">{t("Invoice #") || "Invoice #"}</th>
                      <th className="px-6 py-4">{t("Billing Date") || "Billing Date"}</th>
                      <th className="px-6 py-4">{t("Billing Item") || "Billing Item"}</th>
                      <th className="px-6 py-4 text-end">{t("Amount") || "Amount"}</th>
                      <th className="px-6 py-4 text-center">{t("Invoice") || "Invoice"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {purchasesHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{item.id}</td>
                        <td className="px-6 py-4 font-bold text-xs">{item.date}</td>
                        <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">{item.item}</td>
                        <td className="px-6 py-4 text-end font-black text-slate-900 dark:text-white">
                          AED {item.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 rounded-xl transition-all inline-flex items-center justify-center cursor-pointer text-slate-500 dark:text-slate-400">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. MY WON ITEMS PANEL */}
          {currentTab === "my-won-items" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <Trophy className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("My Won Items") || "My Won Items"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wonItemsList.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5 border border-slate-100 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-800/30 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-xl shadow-md" />
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-bold mt-1">AED {item.price.toLocaleString()} • {item.date}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-950 dark:bg-slate-800 text-white font-black rounded-2xl hover:bg-slate-900 dark:hover:bg-slate-700 transition-all active:scale-95 border-none cursor-pointer">
                      {t("Ownership code") || "Ownership code"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. MY REQUESTS PANEL */}
          {currentTab === "my-requests" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <FileText className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("My Requests") || "My Requests"}
              </h2>
              <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">{t("Request ID") || "Request ID"}</th>
                      <th className="px-6 py-4">{t("Request Type") || "Request Type"}</th>
                      <th className="px-6 py-4 text-center">{t("Status") || "Status"}</th>
                      <th className="px-6 py-4 text-center">{t("Date Requested") || "Date Requested"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {requestsList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{item.id}</td>
                        <td className="px-6 py-4 font-bold">{item.type}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-black uppercase",
                            item.status === "Approved" || item.status === "Verified"
                              ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                          )}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-xs">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. MY APPOINTMENTS PANEL */}
          {currentTab === "my-appointments" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <Calendar className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("My Appointments") || "My Appointments"}
              </h2>
              <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">{t("ID") || "ID"}</th>
                      <th className="px-6 py-4">{t("Service/Yard") || "Service/Yard"}</th>
                      <th className="px-6 py-4 text-center">{t("Scheduled Slot") || "Scheduled Slot"}</th>
                      <th className="px-6 py-4 text-center">{t("Status") || "Status"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {appointmentsList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{item.id}</td>
                        <td className="px-6 py-4 font-bold">{item.service}</td>
                        <td className="px-6 py-4 text-center font-bold text-xs">{item.date} • {item.time}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-black uppercase",
                            item.status === "Scheduled"
                              ? "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          )}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. SUPPORT TICKETS PANEL */}
          {currentTab === "support-tickets" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <LifeBuoy className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("Support Tickets") || "Support Tickets"}
              </h2>
              <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-sm text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">{t("Ticket ID") || "Ticket ID"}</th>
                      <th className="px-6 py-4">{t("Subject") || "Subject"}</th>
                      <th className="px-6 py-4">{t("Category") || "Category"}</th>
                      <th className="px-6 py-4 text-center">{t("Status") || "Status"}</th>
                      <th className="px-6 py-4 text-center">{t("Last Active") || "Last Active"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {supportTicketsList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                        <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{item.id}</td>
                        <td className="px-6 py-4 font-bold">{item.subject}</td>
                        <td className="px-6 py-4 font-bold text-xs">{item.category}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-black uppercase",
                            item.status === "Open"
                              ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          )}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-xs">{item.lastUpdated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 10. PROFILE VIEW PANEL */}
          {currentTab === "profile" && (
            <div className="space-y-6 text-start">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                <User className="w-5 h-5 inline-block me-2 text-red-600 align-text-bottom" />
                {t("User Profile Details") || "User Profile Details"}
              </h2>

              <form onSubmit={handleProfileSave} className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t("Full Name")}
                    </label>
                    <input
                      required
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-600 transition-all text-start"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t("Email Address")}
                    </label>
                    <input
                      required
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-600 transition-all text-start"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t("Phone Number") || "Phone Number"}
                    </label>
                    <input
                      required
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-600 transition-all text-start"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t("Emirates ID") || "Emirates ID"}
                    </label>
                    <input
                      required
                      type="text"
                      value={profileId}
                      onChange={(e) => setProfileId(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-red-600 transition-all text-start"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 border-none cursor-pointer"
                  >
                    {t("Save Changes") || "Save Changes"}
                  </button>
                  <AnimatePresence>
                    {isSaved && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {t("Profile updated successfully!") || "Profile updated successfully!"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
