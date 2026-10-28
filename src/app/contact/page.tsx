"use client"

import { useLanguage } from "@/lib/language-context"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
    const { t, language } = useLanguage()
    const isAr = language === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: ""
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
        setForm({
            name: "",
            email: "",
            phone: "",
            subject: "General Inquiry",
            message: ""
        })
    }

    const yards = isAr ? [
        { name: "ساحة ساعد المركزية - سوق العوير، دبي", hours: "الأحد - الخميس (٨:٠٠ ص - ٦:٠٠ م)" },
        { name: "مركز فحص وساحة مصفح - أبوظبي", hours: "الأحد - الخميس (٨:٠٠ ص - ٦:٠٠ م)" },
        { name: "ساحة ساعد اللوجستية - الصناعية ١٢، الشارقة", hours: "الأحد - الخميس (٨:٠٠ ص - ٥:٠٠ م)" },
        { name: "مركز خدمة ومعاينة العين", hours: "الأحد - الخميس (٨:٠٠ ص - ٥:٠٠ م)" }
    ] : [
        { name: "Saaed Al Aweer Auto Market Yard, Dubai", hours: "Sun – Thu (8:00 AM – 6:00 PM)" },
        { name: "Saaed Musaffah Central Yard, Abu Dhabi", hours: "Sun – Thu (8:00 AM – 6:00 PM)" },
        { name: "Saaed Logistics Yard, Industrial 12, Sharjah", hours: "Sun – Thu (8:00 AM – 5:00 PM)" },
        { name: "Saaed Inspection Yard, Al Ain", hours: "Sun – Thu (8:00 AM – 5:00 PM)" }
    ]

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20" dir={dir}>
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                <span className="px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider border border-red-200 dark:border-red-800">
                    {isAr ? 'مركز الاتصال وخدمة المتعاملين' : 'Customer Support & Inquiries'}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {isAr ? 'نحن هنا لمساعدتك في كل خطوة' : 'Get in Touch with Our Team'}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
                    {isAr 
                        ? 'فريق الدعم الفني وخدمات المزادات متواجد للرد على استفسارات المزايدة، الفحص، والتسليم.' 
                        : 'Have questions regarding vehicle inspection, bidding limits, or title transfer? Reach out anytime.'}
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                {/* Contact Information Cards */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center mb-3">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                            {isAr ? 'مركز الاتصال الموحد' : 'Toll-Free Helpline'}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">{isAr ? 'خدمة على مدار الساعة' : '24/7 Dedicated Support'}</p>
                        <a href="tel:80072233" className="text-lg font-black text-red-600 hover:underline block pt-1">
                            800-SAAED (72233)
                        </a>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mb-3">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                            {isAr ? 'البريد الإلكتروني' : 'Official Email'}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">{isAr ? 'للرد خلال ٢٤ ساعة عمل' : 'Response within 24 business hours'}</p>
                        <a href="mailto:auctions@saaed.ae" className="text-base font-black text-blue-600 hover:underline block pt-1">
                            auctions@saaed.ae
                        </a>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-2">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                            {isAr ? 'ساحات المعاينة الميدانية' : 'Inspection Yards'}
                        </h4>
                        <div className="space-y-3 pt-1 text-xs">
                            {yards.map((y, idx) => (
                                <div key={idx} className="pb-2 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{y.name}</p>
                                    <p className="text-[11px] text-slate-400">{y.hours}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Message Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                            {isAr ? 'أرسل لنا استفسارك مباشرة' : 'Send an Inquiry'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mb-8 font-medium">
                            {isAr ? 'يرجى تزويدنا بالتفاصيل وسيقوم فريق علاقات المزايدين بالتواصل معك.' : 'Fill out the form below and an auction specialist will follow up with you promptly.'}
                        </p>

                        {submitted && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <span>{isAr ? 'تم استلام رسالتك بنجاح! سيتواصل معك أحد مسؤولي المزادات قريباً.' : 'Message received successfully! Our auction desk will contact you soon.'}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                        {isAr ? 'الاسم الكامل' : 'Full Name'}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={isAr ? 'مثال: محمد سعيد' : 'e.g. John Doe'}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                        {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="user@example.com"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                        {isAr ? 'رقم الهاتف المتحرك' : 'Mobile Phone (UAE)'}
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        placeholder="+971 50 123 4567"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                        {isAr ? 'نوع الاستفسار' : 'Inquiry Subject'}
                                    </label>
                                    <select
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                                    >
                                        <option value="Bidding & Deposits">{isAr ? 'المزايدة والتأمينات' : 'Bidding & Deposits'}</option>
                                        <option value="Vehicle Inspection">{isAr ? 'معاينة المركبات والساحات' : 'Vehicle Inspection & Yards'}</option>
                                        <option value="Payment & Collection">{isAr ? 'السداد ونقل الملكية' : 'Payment & Title Transfer'}</option>
                                        <option value="Consignment & Selling">{isAr ? 'إدراج مركبة للبيع في المزاد' : 'Consignment & Vehicle Listing'}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                    {isAr ? 'تفاصيل الرسالة أو رقم اللوط' : 'Message or Lot Number'}
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder={isAr ? 'أدخل تفاصيل استفسارك أو رقم اللوط...' : 'Provide inquiry details or specific lot numbers...'}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-xl shadow-red-600/20 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                {isAr ? 'إرسال الاستفسار' : 'Submit Inquiry'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

