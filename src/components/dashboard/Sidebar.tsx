"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { 
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
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { DepositModal } from "@/components/dashboard/DepositModal"

const menuItems = [
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
      "w-full lg:w-80 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]",
      language === 'ar' && "text-right"
    )}>
      {/* User Header Profile Card */}
      <Link 
        href="/dashboard?tab=profile"
        className={cn(
          "flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all mb-6 group border border-slate-100 dark:border-slate-800",
          language === 'ar' && "flex-row-reverse"
        )}
      >
        <div className={cn("flex items-center gap-3", language === 'ar' && "flex-row-reverse")}>
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
            <User className="w-6 h-6" />
          </div>
          <div className="text-start">
            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 tracking-tight line-clamp-1">
              AMRO,MOHAMMED...
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              {t("View Profile")}
            </p>
          </div>
        </div>
        <div className={cn("flex items-center gap-1", language === 'ar' && "flex-row-reverse")}>
          <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
            {t("Verified") || "Verified"}
          </span>
          <ChevronIcon className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Security Deposit Info Card */}
      {depositAmount === 0 ? (
        <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/40 rounded-2xl p-5 mb-6 text-start">
          <h5 className="font-black text-sm text-red-600 dark:text-red-500 mb-1">
            {t("Add Security Deposit") || "Add Security Deposit"}
          </h5>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal mb-4 font-bold">
            {t("In order to bid you have to add a security deposit.") || "In order to bid you have to add a security deposit."}
          </p>
          <button 
            onClick={() => setIsDepositOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black shadow-md cursor-pointer transition-all active:scale-95 border-none"
          >
            <span>+</span> {t("Add") || "Add"}
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-5 mb-6 text-start flex items-center justify-between">
          <div>
            <h5 className="font-black text-sm text-emerald-600 dark:text-emerald-400 mb-1">
              {t("Deposit Active") || "Deposit Active"}
            </h5>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400">
              AED {depositAmount.toLocaleString()} {t("Pre-Authorized") || "Pre-Authorized"}
            </p>
          </div>
          <button 
            onClick={() => setIsDepositOpen(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-2xl transition-all active:scale-95 border-none"
          >
            + {t("Top Up") || "Top Up"}
          </button>
        </div>
      )/* line 133 end */}

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
