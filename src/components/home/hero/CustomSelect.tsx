import React from "react"
import { cn } from "@/lib/utils"

export interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    language: string
    children: React.ReactNode
}

export function CustomSelect({ language, children, className, ...props }: CustomSelectProps) {
    return (
        <div className="w-full relative">
            <select
                className={cn(
                    "w-full bg-[#EBF1FA] dark:bg-[#131d35] dark:text-blue-50 dark:border dark:border-blue-900/40 border-none outline-none rounded-xl py-3 text-sm font-medium text-slate-800 appearance-none cursor-pointer focus:ring-2 focus:ring-[#3B82F6]/30 dark:focus:ring-blue-500/40 transition-all",
                    language === 'ar' ? 'pl-8 pr-4 text-right' : 'pr-8 pl-4 text-left',
                    className
                )}
                {...props}
            >
                {children}
            </select>
            <span className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none text-xs text-slate-400 dark:text-blue-400/70",
                language === 'ar' ? 'left-4' : 'right-4'
            )}>
                ▼
            </span>
        </div>
    )
}
