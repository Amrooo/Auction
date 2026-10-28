"use client"

import { useLanguage } from "@/lib/language-context"
import { 
    UserCheck, 
    Wallet, 
    Search, 
    Gavel, 
    Truck, 
    FileText, 
    ShieldCheck, 
    Clock, 
    CheckCircle2, 
    HelpCircle,
    ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowToBuyPage() {
    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'

    const steps = isAr ? [
        {
            number: "٠١",
            icon: <UserCheck className="w-7 h-7 text-red-600" />,
            title: "تسجيل وتفعيل الحساب",
            description: "أنشئ حسابك خلال ثوانٍ باستخدام الهوية الرقمية (UAE Pass) أو بريدك الإلكتروني، مع التحقق الفوري لتأكيد أهليتك للمزايدة القانونية."
        },
        {
            number: "٠٢",
            icon: <Wallet className="w-7 h-7 text-blue-600" />,
            title: "إيداع تأمين المزايدة",
            description: "قم بإيداع مبلغ التأمين المسترد (٥٪ من قيمة الحد الأقصى للمزايدة أو ٥,٠٠٠ درهم كحد أدنى) عبر البطاقة الائتمانية أو التحويل المصرفي المباشر."
        },
        {
            number: "٠٣",
            icon: <Search className="w-7 h-7 text-emerald-600" />,
            title: "المعاينة وفحص التقرير",
            description: "راجع تقرير الفحص الفني الشامل (١٤٠ نقطة)، أو تفضل بزيارة ساحات المعاينة المعتمدة لشركة ساعد في دبي أو أبوظبي للمعاينة الميدانية."
        },
        {
            number: "٠٤",
            icon: <Gavel className="w-7 h-7 text-purple-600" />,
            title: "المزايدة الحية التنافسية",
            description: "شارك في المزاد بالوقت الفعلي أو عيّن الحد الأقصى للمزايدة التلقائية. في حال المزايدة بالدقائق الأخيرة، يمدد المزاد تلقائياً دقيقتين ضد القنص."
        },
        {
            number: "٠٥",
            icon: <Truck className="w-7 h-7 text-amber-600" />,
            title: "السداد والاستلام الرسمي",
            description: "عند رسو المزاد، سدد المبلغ المتبقي والرسوم الإدارية خلال ٤٨ ساعة، واستلم أوراق الحيازة ونقل الملكية الرسمية واستلم المركبة من الساحة."
        }
    ] : [
        {
            number: "01",
            icon: <UserCheck className="w-7 h-7 text-red-600" />,
            title: "Register & Verify Account",
            description: "Sign in instantly via UAE Pass or standard registration with your Emirates ID for secure legal identity verification."
        },
        {
            number: "02",
            icon: <Wallet className="w-7 h-7 text-blue-600" />,
            title: "Deposit Security Hold",
            description: "Place a fully refundable security deposit (5% of your intended maximum bid or minimum AED 5,000) using credit card or bank transfer."
        },
        {
            number: "03",
            icon: <Search className="w-7 h-7 text-emerald-600" />,
            title: "Inspect Lot & Reports",
            description: "Review detailed 140-point technical condition reports online or visit Saaed inspection yards in Dubai and Abu Dhabi for live physical examination."
        },
        {
            number: "04",
            icon: <Gavel className="w-7 h-7 text-purple-600" />,
            title: "Live Bidding & Anti-Sniping",
            description: "Place bids live in real-time. If a bid is submitted in the final 2 minutes, the clock auto-extends by 2 minutes to ensure fair competition."
        },
        {
            number: "05",
            icon: <Truck className="w-7 h-7 text-amber-600" />,
            title: "Settlement & Collection",
            description: "Complete settlement within 48 hours. Possession and title transfer papers are processed within 10 business days for yard collection."
        }
    ]

    const faqs = isAr ? [
        {
            q: "هل التأمين المالي مسترد في حال عدم الفوز؟",
            a: "نعم، يتم إلغاء الحجز أو رد مبلغ التأمين تلقائياً وفوراً إلى بطاقتك أو حسابك في حال عدم رسو أي مزاد عليك."
        },
        {
            q: "ما هي الرسوم الإدارية المطبقة على المزادات؟",
            a: "تطبق الرسوم الرسمية لشركة ساعد: ٢٠٠ درهم للمبيعات حتى ٥٠٠ درهم، ٣٠٠ درهم حتى ١,٠٠٠ درهم، ٦٠٠ درهم حتى ١٠٠,٠٠٠ درهم، و١٪ لما زاد عن ١٠٠,٠٠٠ درهم، بالإضافة إلى ٥٪ ضريبة القيمة المضافة ورسوم التحميل والحيازة (٣٠٠ درهم)."
        },
        {
            q: "كيف يعمل نظام تمديد الوقت المضاد للقنص (Anti-Sniping)؟",
            a: "إذا قُدّمت مزايدة خلال آخر دقيقتين قبل إغلاق المزاد، يمدد النظام الوقت تلقائياً دقيقتين إضافيتين (حتى ١٠ مرات) لتمكين كافة المزايدين من الرد."
        },
        {
            q: "كم من الوقت لدي لسداد واستلام المركبة؟",
            a: "يجب إتمام السداد خلال ٤٨ ساعة عمل من انتهاء المزاد لتجنب غرامات التأخير (١٠٠ درهم يومياً)."
        }
    ] : [
        {
            q: "Is the security deposit refundable if I don't win?",
            a: "Yes, 100% of your deposit is released or refunded immediately if your bids are outbid or if you do not win the lot."
        },
        {
            q: "What administrative fees apply to winning bids?",
            a: "Standard official Saaed regulatory tariff applies: AED 200 for sales up to AED 500, AED 300 up to AED 1,000, AED 600 up to AED 100,000, and 1% for lots above AED 100,000, plus 5% VAT and loading/possession fees (AED 300)."
        },
        {
            q: "How does the Anti-Sniping auto-extension work?",
            a: "If any bid is received within the final 2 minutes before closing, the timer resets with an additional 2 minutes (up to 10 extensions) to ensure fairness."
        },
        {
            q: "What is the deadline for payment and vehicle pickup?",
            a: "Successful bidders must complete full payment within 48 hours of auction closing to avoid late penalty fees of AED 100/day."
        }
    ]

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20" dir={dir}>
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                <span className="px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider border border-red-200 dark:border-red-800">
                    {isAr ? 'دليل المزايدة والشراء الرسمي' : 'Official Buyer Guide'}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {isAr ? 'كيف تشارك وتفوز في المزادات؟' : 'How to Buy at Our Auctions'}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
                    {isAr
                        ? 'خطوات واضحة وبسيطة من التسجيل والإيداع وحتى استلام المركبة ونقل الملكية الرسمية.'
                        : 'A step-by-step roadmap from registration and security deposit to official vehicle collection.'}
                </p>
            </div>

            {/* 5 Sequential Steps */}
            <div className="max-w-4xl mx-auto space-y-6 mb-24">
                {steps.map((step, idx) => (
                    <div 
                        key={idx}
                        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start gap-6 hover:shadow-xl transition-all"
                    >
                        <div className="flex sm:flex-col items-center gap-3 shrink-0">
                            <span className="font-mono text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400">
                                {step.number}
                            </span>
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                {step.icon}
                            </div>
                        </div>

                        <div className="space-y-2 flex-1">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">
                                {step.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Regulatory Fee Schedule */}
            <div id="terms" className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 mb-24 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600 text-white rounded-xl">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        {isAr ? 'جدول الرسوم والمصاريف الرسمية (ساعد)' : 'Official Saaed Tariff & Fee Schedule'}
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-start border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-black uppercase">
                                <th className="py-3 text-start">{isAr ? 'نطاق سعر البيع (درهم)' : 'Sale Price Bracket (AED)'}</th>
                                <th className="py-3 text-start">{isAr ? 'الرسوم الإدارية' : 'Admin Fee'}</th>
                                <th className="py-3 text-start">{isAr ? 'ضريبة القيمة المضافة' : 'VAT'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                            <tr>
                                <td className="py-3.5">{isAr ? 'حتى ٥٠٠ درهم' : 'Up to AED 500'}</td>
                                <td className="py-3.5">AED 200</td>
                                <td className="py-3.5">5%</td>
                            </tr>
                            <tr>
                                <td className="py-3.5">{isAr ? '٥٠١ إلى ١,٠٠٠ درهم' : 'AED 501 – AED 1,000'}</td>
                                <td className="py-3.5">AED 300</td>
                                <td className="py-3.5">5%</td>
                            </tr>
                            <tr>
                                <td className="py-3.5">{isAr ? '١,٠٠١ إلى ١٠٠,٠٠٠ درهم' : 'AED 1,001 – AED 100,000'}</td>
                                <td className="py-3.5">AED 600</td>
                                <td className="py-3.5">5%</td>
                            </tr>
                            <tr>
                                <td className="py-3.5">{isAr ? 'أكثر من ١٠٠,٠٠٠ درهم' : 'Above AED 100,000'}</td>
                                <td className="py-3.5">{isAr ? '١٪ من سعر البيع' : '1% of Sale Price'}</td>
                                <td className="py-3.5">5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 font-semibold">
                    {isAr
                        ? 'ملاحظة: تطبق رسوم تحميل وتنزيل قدرها ١٠٠ درهم ورسوم إصدار حيازة قدرها ٢٠٠ درهم على كل مركبة.'
                        : 'Note: Fixed loading fee of AED 100 and possession issuance fee of AED 200 apply to each vehicle lot.'}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto space-y-8 mb-20">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                        {isAr ? 'الأسئلة الشائعة حول المزايدة' : 'Frequently Asked Questions'}
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
                                {faq.q}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="text-center">
                <Link href="/category/motors">
                    <Button size="lg" className="h-14 px-10 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-xl shadow-red-600/20 cursor-pointer">
                        {isAr ? 'ابدأ تصفح المزادات الحية' : 'Explore Live Auctions Now'}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

