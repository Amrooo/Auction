import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toArabicNumerals(val: string | number): string {
    if (val === undefined || val === null) return "";
    const str = String(val);
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return str.replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
}

export function formatPrice(val: number, isAr: boolean, currency = "AED"): string {
    const formatted = val.toLocaleString("en-US");
    if (isAr) {
        return `${toArabicNumerals(formatted)} درهم`;
    }
    return `${currency} ${formatted}`;
}

export interface AuctionSettlement {
    bidAmount: number
    adminFee: number
    vatAmount: number
    loadingFee: number
    possessionFee: number
    totalPayable: number
}

export function calculateSettlement(bidAmount: number): AuctionSettlement {
    let adminFee = 600
    if (bidAmount <= 500) {
        adminFee = 200
    } else if (bidAmount <= 1000) {
        adminFee = 300
    } else if (bidAmount <= 100000) {
        adminFee = 600
    } else {
        adminFee = Math.round(bidAmount * 0.01)
    }

    const loadingFee = 100
    const possessionFee = 200
    const subtotalTaxable = adminFee + loadingFee + possessionFee
    const vatAmount = Math.round(subtotalTaxable * 0.05)
    const totalPayable = bidAmount + adminFee + vatAmount + loadingFee + possessionFee

    return {
        bidAmount,
        adminFee,
        vatAmount,
        loadingFee,
        possessionFee,
        totalPayable
    }
}

export function formatTimeRemaining(endDateStr: string, isAr = false): string {
    if (!endDateStr) return isAr ? "غير محدد" : "N/A"
    const end = new Date(endDateStr).getTime()
    if (isNaN(end)) return endDateStr
    const now = Date.now()
    const diff = end - now
    if (diff <= 0) return isAr ? "منتهي" : "Ended"

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (days > 0) {
        return isAr
            ? `${toArabicNumerals(days)}ي ${toArabicNumerals(hours)}س`
            : `${days}d ${hours}h`
    }
    if (hours > 0) {
        return isAr
            ? `${toArabicNumerals(hours)}س ${toArabicNumerals(minutes)}د`
            : `${hours}h ${minutes}m`
    }
    return isAr
        ? `${toArabicNumerals(minutes)}د ${toArabicNumerals(seconds)}ث`
        : `${minutes}m ${seconds}s`
}
