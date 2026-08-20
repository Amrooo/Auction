"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  change?: string
  trend?: "up" | "down"
  color?: string
}

export function StatsCard({ label, value, icon: Icon, change, trend, color = "accent" }: StatsCardProps) {
  const { t, language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className={cn(
        "flex items-start justify-between mb-4",
        language === 'ar' && "flex-row-reverse"
      )}>
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
          `bg-${color}/10 text-${color}`,
          color === "accent" && "bg-accent/10 text-accent",
          color === "emerald" && "bg-emerald-500/10 text-emerald-500",
          color === "blue" && "bg-blue-500/10 text-blue-500",
          color === "purple" && "bg-purple-500/10 text-purple-500"
        )}>
          <Icon className="w-7 h-7" />
        </div>
        {change && (
          <div className={cn(
            "pt-1 font-black text-sm",
            trend === "up" ? "text-emerald-500" : "text-red-500",
            language === 'ar' && "text-right"
          )}>
            {trend === "up" ? "+" : "-"}{change}
          </div>
        )}
      </div>

      <div className={language === 'ar' ? 'text-right' : 'text-left'}>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest mb-1">{t(label)}</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
      </div>
    </motion.div>
  )
}
