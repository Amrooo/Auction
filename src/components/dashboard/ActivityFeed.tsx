"use client"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Gavel, Trophy, Wallet, Heart } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "bid",
    title: "Bid placed on 2024 Porsche 911 GT3 RS",
    time: "2 hours ago",
    amount: "AED 850,000",
    icon: Gavel,
    color: "blue"
  },
  {
    id: 2,
    type: "won",
    title: "Won auction: Luxury Palm Jumeirah Villa",
    time: "5 hours ago",
    amount: "AED 15,200,000",
    icon: Trophy,
    color: "emerald"
  },
  {
    id: 3,
    type: "deposit",
    title: "Deposit of AED 50,000 confirmed",
    time: "Yesterday",
    icon: Wallet,
    color: "purple"
  },
  {
    id: 4,
    type: "watchlist",
    title: "Added VIP Plate Number A-99 to watchlist",
    time: "2 days ago",
    icon: Heart,
    color: "red"
  }
]

export function ActivityFeed() {
  const { t, language } = useLanguage()

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8">
      <div className={cn(
        "flex items-center justify-between mb-8",
        language === 'ar' && "flex-row-reverse"
      )}>
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t("Recent Activity")}</h3>
        <button className="text-sm font-bold text-accent hover:underline">{t("View All")}</button>
      </div>

      <div className={cn(
        "space-y-6 relative before:absolute before:inset-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-100 before:via-slate-100 before:to-transparent dark:before:from-slate-800/50 dark:before:via-slate-800/50",
        language === 'ar' ? "before:right-5 before:left-auto" : "before:left-5 before:right-auto"
      )}>
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 group"
          >
            <div className={cn(
              "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0",
              activity.color === "blue" && "bg-blue-500 text-white shadow-blue-500/20",
              activity.color === "emerald" && "bg-emerald-500 text-white shadow-emerald-500/20",
              activity.color === "purple" && "bg-purple-500 text-white shadow-purple-500/20",
              activity.color === "red" && "bg-red-400 text-white shadow-red-400/20"
            )}>
              <activity.icon className="w-5 h-5" />
            </div>

            <div className="flex-1 pt-0.5 text-start min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">{t(activity.title)}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{t(activity.time)}</span>
                {activity.amount && (
                  <span className="text-xs font-black text-slate-900 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{activity.amount}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
