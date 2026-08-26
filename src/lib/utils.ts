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
