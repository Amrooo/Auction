"use client"

import { useState } from "react"
import { X, ShieldCheck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

interface DepositModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: (amount: number) => void
}

export function DepositModal({ isOpen, onClose, onSuccess }: DepositModalProps) {
    const { t, language } = useLanguage()
    const [amount, setAmount] = useState("5000")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvc, setCvc] = useState("")
    const [cardName, setCardName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate network payment hold
        setTimeout(() => {
            setIsSubmitting(false)
            onSuccess(Number(amount))
            onClose()
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Body */}
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-red-600" />
                        {t("Add Security Deposit") || "Add Security Deposit"}
                    </h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Picker */}
                    <div className="space-y-3">
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider text-start">
                            {t("Select Deposit Amount") || "Select Deposit Amount"} (AED)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {["1000", "5000", "10000"].map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val)}
                                    className={cn(
                                        "py-2.5 rounded-xl font-bold text-sm border transition-all cursor-pointer",
                                        amount === val
                                            ? "bg-[#1F2937] dark:bg-white text-white dark:text-black border-transparent"
                                            : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                                    )}
                                >
                                    AED {Number(val).toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card details */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">
                                {t("Cardholder Name") || "Cardholder Name"}
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="AMRO MOHAMMED"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all text-start"
                            />
                        </div>

                        <div className="space-y-1 relative">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">
                                {t("Card Number") || "Card Number"}
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="xxxx xxxx xxxx xxxx"
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                                    setCardNumber(val);
                                }}
                                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all text-start"
                            />
                            <CreditCard className="absolute right-3.5 bottom-3.5 w-4 h-4 text-slate-400" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">
                                    {t("Expiry Date") || "Expiry Date"}
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={expiry}
                                    onChange={(e) => {
                                        let val = e.target.value.replace(/\D/g, "");
                                        if (val.length > 2) {
                                            val = val.substring(0, 2) + "/" + val.substring(2, 4);
                                        }
                                        setExpiry(val);
                                    }}
                                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all text-center"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest text-start">
                                    {t("CVC") || "CVC"}
                                </label>
                                <input
                                    required
                                    type="password"
                                    placeholder="***"
                                    maxLength={3}
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-red-600 transition-all text-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notice */}
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50 rounded-2xl p-4 text-xs text-red-800 dark:text-red-300 leading-relaxed text-start">
                        {t("Deposit Warning") || "Notice: This deposit is fully refundable and acts as a bidding guarantee hold. It will be released automatically if you do not win any active lots."}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-700 text-white hover:text-white rounded-2xl py-6 font-black uppercase text-xs tracking-wider transition-all active:scale-95 border-none"
                    >
                        {isSubmitting ? (t("Processing...") || "Processing...") : `${t("Authorize Hold") || "Authorize Hold"} (AED ${Number(amount).toLocaleString()})`}
                    </Button>
                </form>
            </div>
        </div>
    )
}
