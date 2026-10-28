"use client"

import { useLanguage } from "@/lib/language-context"
import { ShieldCheck, Award, Building2, Gavel, Users, CheckCircle2, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'

    const partners = [
        { name: "Abu Dhabi Mobility", nameAr: "أبوظبي للتنقل", logo: "/images/abu-dhabi-mobility.png" },
        { name: "Dept. of Municipalities and Transport", nameAr: "دائرة البلديات والنقل", logo: "/images/dmt-logo.png" },
        { name: "Dubai Police", nameAr: "شرطة دبي", logo: "/images/dubai-police.png" },
        { name: "Abu Dhabi Police", nameAr: "شرطة أبوظبي", logo: "/images/abu-dhabi-police-transparent.png" },
        { name: "Dubai Customs", nameAr: "جمارك دبي", logo: "/images/dubai-customs.png" },
        { name: "Saaed Traffic Systems", nameAr: "شركة ساعد للأنظمة المرورية", logo: "/images/saaed-logo.png" },
    ]

    const stats = isAr ? [
        { value: "١٠,٠٠٠+", label: "مركبة ولوط تم بيعها" },
        { value: "١٠٠٪", label: "معاملات موثقة رسمياً" },
        { value: "٦", label: "جهات حكومية شريكة" },
        { value: "٢٤/٧", label: "مزايدة إلكترونية فورية" }
    ] : [
        { value: "10,000+", label: "Lots & Vehicles Sold" },
        { value: "100%", label: "Legally Verified Titles" },
        { value: "6", label: "Official Government Partners" },
        { value: "24/7", label: "Real-Time Digital Bidding" }
    ]

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20" dir={dir}>
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider border border-red-200 dark:border-red-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isAr ? 'منصة المزادات الذكية الرائدة في دولة الإمارات' : 'Leading Smart Auction Platform in UAE'}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    {isAr 
                        ? 'الجيل القادم من المزادات الحكومية والخاصة الموثوقة' 
                        : 'The Next Generation of Trusted UAE Auctions'}
                </h1>
                <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {isAr
                        ? 'منصة مزادات إلكترونية متطورة بالشراكة مع كبرى الجهات والدوائر الحكومية في دولة الإمارات، مدعومة بالذكاء الاصطناعي لتوفير تقييمات دقيقة، فحصاً معتمداً، ومزايدة آمنة وشفافة بالكامل.'
                        : 'An advanced digital auction marketplace partnering with premier UAE government entities and law enforcement, engineered with AI analytics for fair market valuations, certified 140-point inspections, and seamless bidding.'}
                </p>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                {stats.map((s, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                        <div className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-400 mb-2">{s.value}</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Core Pillars */}
            <div className="mb-24 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                        {isAr ? 'لماذا تختار منصتنا للمزايدة؟' : 'Why Choose Our Platform?'}
                    </h2>
                    <p className="text-sm font-medium text-slate-500">
                        {isAr ? 'نضمن أعلى معايير الشفافية والأمان في كل خطوة' : 'Delivering unmatched transparency, legal assurance, and technological edge'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">
                            {isAr ? 'أصول حكومية ومطابقة قانونية' : 'Official Government Inventory'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {isAr
                                ? 'جميع المعروضات صادرة مباشرة عن جهات حكومية رسمية مع التحقق الكامل من خلو الطرف القانوني وسهولة إصدار مستندات الحيازة ونقل الملكية.'
                                : 'All lots are sourced directly from verified government bodies with complete title clearance and streamlined transfer of ownership.'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                            <Award className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">
                            {isAr ? 'فحص فني شامل ومعاينة واقعية' : '140-Point Technical Inspection'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {isAr
                                ? 'فحص دقيق للمحرك، الهيكل، الشاسيه، وناقل الحركة من خلال ساحات فحص ساعد المعتمدة، مع إمكانية المعاينة الميدانية قبل المزايدة.'
                                : 'Rigorous mechanical and structural condition grading performed at certified Saaed yards, backed by open physical inspection slots.'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
                            <Gavel className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">
                            {isAr ? 'مزايدة عادلة وحماية ضد القنص' : 'Anti-Sniping Fair Bidding'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                            {isAr
                                ? 'خوارزمية ذكية تمدد وقت المزاد تلقائياً عند تقديم مزايدة في اللحظات الأخيرة لضمان تكافؤ الفرص لجميع المشاركين.'
                                : 'Our automated anti-sniping extension prevents last-second bots and ensures all genuine bidders have an equal opportunity to compete.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Official Partners */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-[3rem] p-8 sm:p-14 border border-slate-200 dark:border-slate-800 text-center space-y-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                        {isAr ? 'شركاؤنا الرسميون في دولة الإمارات' : 'Official UAE Strategic Partners'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        {isAr ? 'نفخر بالتعاون مع كبرى الدوائر الحكومية والشرطية' : 'Proudly facilitating transparent auctions with top municipal and police authorities'}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
                    {partners.map((p, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 h-28 shadow-xs">
                            <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain max-w-[85%]" />
                            <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 text-center line-clamp-1">
                                {isAr ? p.nameAr : p.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="mt-20 text-center space-y-6">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                    {isAr ? 'جاهز لبدء المزايدة؟' : 'Ready to Start Bidding?'}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/category/motors">
                        <Button size="lg" className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-xl shadow-red-600/20 cursor-pointer">
                            {isAr ? 'تصفح المزادات الحية' : 'Browse Live Auctions'}
                        </Button>
                    </Link>
                    <Link href="/how-to-buy">
                        <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border border-slate-300 dark:border-slate-700 font-bold text-base cursor-pointer">
                            {isAr ? 'دليل المزايدة والتملك' : 'How to Buy Guide'}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
