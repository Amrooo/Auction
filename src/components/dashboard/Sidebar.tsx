"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  LayoutDashboard,
  SlidersHorizontal, 
  Heart, 
  Gavel, 
  CreditCard, 
  Trophy, 
  FileText, 
  Calendar, 
  LifeBuoy, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  User,
  ShieldCheck,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { DepositModal } from "@/components/dashboard/DepositModal"

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", value: "overview" },
  { icon: SlidersHorizontal, label: "Saved Filters", value: "saved-filters" },
  { icon: Heart, label: "Watchlist", value: "watchlist" },
  { icon: Gavel, label: "My Bids", value: "my-bids" },
  { icon: CreditCard, label: "My Purchases", value: "my-purchases" },
  { icon: Trophy, label: "My Won Items", value: "my-won-items" },
  { icon: FileText, label: "My Requests", value: "my-requests" },
  { icon: Calendar, label: "My Appointments", value: "my-appointments" },
  { icon: LifeBuoy, label: "Support Tickets", value: "support-tickets" },
]

export function DashboardSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentTab = searchParams.get("tab") || "overview"
  const { t, language } = useLanguage()
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState(0)

  // Load deposit status from localStorage on client side
  useEffect(() => {
    const saved = localStorage.getItem("bid_security_deposit")
    if (saved) {
      setDepositAmount(Number(saved))
    }
  }, [])

  const handleDepositSuccess = (amount: number) => {
    const newTotal = depositAmount + amount
    setDepositAmount(newTotal)
    localStorage.setItem("bid_security_deposit", newTotal.toString())
    // Trigger dashboard stats reload
    window.dispatchEvent(new Event("balance_update"))
  }

  const handleLogout = () => {
    localStorage.removeItem("bid_security_deposit")
    router.push("/")
  }

  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight

  return (
    <div className={cn(
      "w-full lg:w-80 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.03)]",
      language === 'ar' && "text-right"
    )}>
      {/* User Header Profile Card */}
      <Link 
        href="/dashboard?tab=profile"
        className={cn(
          "flex items-center justify-between p-3.5 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all mb-5 group border border-slate-100 dark:border-slate-700/60 shadow-xs",
          language === 'ar' && "flex-row-reverse"
        )}
      >
        <div className={cn("flex items-center gap-3 min-w-0", language === 'ar' && "flex-row-reverse")}>
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm shrink-0 bg-slate-200 dark:bg-slate-700">
            <img 
              src="https://i.pravatar.cc/100?u=amro" 
              alt="Amro El-Gezeri" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
          <div className="text-start min-w-0 flex-1">
            <h4 className="font-black text-sm text-slate-900 dark:text-white tracking-tight truncate">
              Amro El-Gezeri
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("Verified") || "Verified"}
              </span>
            </div>
          </div>
        </div>
        <div className={cn("flex items-center text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors shrink-0", language === 'ar' && "flex-row-reverse")}>
          <ChevronIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* Security Deposit Info Card */}
      {depositAmount === 0 ? (
        <div className="bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent border border-red-200/60 dark:border-red-900/40 rounded-2xl p-4 mb-5 text-start">
          <div className="flex items-center justify-between mb-1.5">
            <h5 className="font-black text-xs text-red-600 dark:text-red-400 uppercase tracking-wider">
              {t("Security Deposit") || "Security Deposit"}
            </h5>
            <span className="text-[10px] font-bold text-red-500 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
              {t("Required") || "Required"}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3 font-semibold">
            {t("Deposit required to unlock live bidding capabilities.") || "Deposit required to unlock live bidding capabilities."}
          </p>
          <button 
            onClick={() => setIsDepositOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md shadow-red-600/20 cursor-pointer transition-all active:scale-98 border-none"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t("Add Deposit") || "Add Deposit"}</span>
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200/60 dark:border-emerald-900/40 rounded-2xl p-4 mb-5 text-start flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h5 className="font-black text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {t("Deposit Active") || "Deposit Active"}
              </h5>
            </div>
            <p className="text-xs font-black text-slate-900 dark:text-white">
              AED {depositAmount.toLocaleString()}
            </p>
          </div>
          <button 
            onClick={() => setIsDepositOpen(true)}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl transition-all active:scale-95 border-none shadow-sm cursor-pointer"
          >
            + {t("Top Up") || "Top Up"}
          </button>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentTab === item.value
          const Icon = item.icon
          return (
            <Link
              key={item.value}
              href={`/dashboard?tab=${item.value}`}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer",
                isActive 
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-950 dark:hover:text-white",
                language === 'ar' && "flex-row-reverse"
              )}
            >
              <div className={cn("flex items-center gap-3.5", language === 'ar' && "flex-row-reverse")}>
                <Icon className={cn(
                  "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-current" : "text-slate-400 dark:text-slate-500"
                )} />
                <span className="font-bold text-xs tracking-tight">{t(item.label)}</span>
              </div>
              <ChevronIcon className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )
        })}
      </div>

      {/* Logout button */}
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group cursor-pointer font-bold text-xs",
            language === 'ar' && "flex-row-reverse"
          )}
        >
          <div className={cn("flex items-center gap-3.5", language === 'ar' && "flex-row-reverse")}>
            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="tracking-tight">{t("Logout") || "Logout"}</span>
          </div>
          <ChevronIcon className="w-3.5 h-3.5 text-red-400 opacity-60" />
        </button>
      </div>

      {/* Payment Deposit Modal */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccess={handleDepositSuccess}
      />
    </div>
  )
}
