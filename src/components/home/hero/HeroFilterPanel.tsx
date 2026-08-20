"use client"

import React from "react"
import { Search } from "lucide-react"
import { CustomSelect } from "./CustomSelect"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface HeroFilterPanelProps {
    categories: string[]
    activeCategory: string
    setActiveCategory: (category: string) => void
}

export function HeroFilterPanel({ categories, activeCategory, setActiveCategory }: HeroFilterPanelProps) {
    const { t, language } = useLanguage()
    const router = useRouter()

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-20 translate-y-12">
            
            {/* Tabs Container with Drop Shadow - scrollable on mobile */}
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none gap-2 pb-1 filter drop-shadow-[0_-5px_8px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_-5px_8px_rgba(0,0,0,0.5)]">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 md:px-8 py-3 font-bold text-xs md:text-sm rounded-t-2xl transition-all border-none cursor-pointer shrink-0 ${
                            activeCategory === cat 
                                ? "bg-white text-[#1F2937] shadow-[0_-2px_10px_rgba(0,0,0,0.06)]" 
                                : "bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90"
                        }`}
                    >
                        {t(cat)}
                    </button>
                ))}
            </div>

            {/* Filter Form Card */}
            <div className="bg-white dark:bg-slate-900 rounded-b-2xl rounded-tr-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-200/60 dark:border-slate-800/80 p-5 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                    
                    {/* Render Category-Specific Filter Fields */}
                    
                    {activeCategory === "Motors" && (
                        <>
                            <div className="lg:col-span-4">
                                <input 
                                    type="text"
                                    placeholder={t("Keyword")}
                                    className={cn(
                                        "w-full bg-[#EBF1FA] dark:bg-slate-800 border-none outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all",
                                        language === 'ar' ? 'text-right' : 'text-left'
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Make")}</option>
                                    <option value="toyota">{t("Toyota") || "Toyota"}</option>
                                    <option value="lexus">{t("Lexus") || "Lexus"}</option>
                                    <option value="nissan">{t("Nissan") || "Nissan"}</option>
                                    <option value="ford">{t("Ford") || "Ford"}</option>
                                    <option value="mercedes">{t("Mercedes") || "Mercedes"}</option>
                                    <option value="audi">{t("Audi") || "Audi"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Model")}</option>
                                    <option value="land-cruiser">{t("Land Cruiser") || "Land Cruiser"}</option>
                                    <option value="patrol">{t("Patrol") || "Patrol"}</option>
                                    <option value="mustang">{t("Mustang") || "Mustang"}</option>
                                    <option value="e-class">{t("E-Class") || "E-Class"}</option>
                                    <option value="a6">{t("A6") || "A6"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Category")}</option>
                                    <option value="suv">{t("SUV") || "SUV"}</option>
                                    <option value="sedan">{t("Sedan") || "Sedan"}</option>
                                    <option value="coupe">{t("Coupe") || "Coupe"}</option>
                                    <option value="sports">{t("Sports") || "Sports"}</option>
                                </CustomSelect>
                            </div>
                        </>
                    )}

                    {activeCategory === "Real Estate" && (
                        <>
                            <div className="lg:col-span-4">
                                <input 
                                    type="text"
                                    placeholder={t("Keyword")}
                                    className={cn(
                                        "w-full bg-[#EBF1FA] dark:bg-slate-800 border-none outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all",
                                        language === 'ar' ? 'text-right' : 'text-left'
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Property Type")}</option>
                                    <option value="villa">{t("Villa") || "Villa"}</option>
                                    <option value="apartment">{t("Apartment") || "Apartment"}</option>
                                    <option value="penthouse">{t("Penthouse") || "Penthouse"}</option>
                                    <option value="land">{t("Land") || "Land"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Location")}</option>
                                    <option value="palm-jumeirah">{t("Palm Jumeirah") || "Palm Jumeirah"}</option>
                                    <option value="dubai-marina">{t("Dubai Marina") || "Dubai Marina"}</option>
                                    <option value="downtown">{t("Downtown Dubai") || "Downtown Dubai"}</option>
                                    <option value="yas-island">{t("Yas Island") || "Yas Island"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Bedrooms")}</option>
                                    <option value="1">{t("1 Bedroom") || "1 Bedroom"}</option>
                                    <option value="2">{t("2 Bedrooms") || "2 Bedrooms"}</option>
                                    <option value="3">{t("3 Bedrooms") || "3 Bedrooms"}</option>
                                    <option value="4+">{t("4+ Bedrooms") || "4+ Bedrooms"}</option>
                                </CustomSelect>
                            </div>
                        </>
                    )}

                    {activeCategory === "Jewelry" && (
                        <>
                            <div className="lg:col-span-4">
                                <input 
                                    type="text"
                                    placeholder={t("Keyword")}
                                    className={cn(
                                        "w-full bg-[#EBF1FA] dark:bg-slate-800 border-none outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all",
                                        language === 'ar' ? 'text-right' : 'text-left'
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Material")}</option>
                                    <option value="gold">{t("Gold") || "Gold"}</option>
                                    <option value="platinum">{t("Platinum") || "Platinum"}</option>
                                    <option value="white-gold">{t("White Gold") || "White Gold"}</option>
                                    <option value="rose-gold">{t("Rose Gold") || "Rose Gold"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Gemstone")}</option>
                                    <option value="diamond">{t("Diamond") || "Diamond"}</option>
                                    <option value="emerald">{t("Emerald") || "Emerald"}</option>
                                    <option value="sapphire">{t("Sapphire") || "Sapphire"}</option>
                                    <option value="ruby">{t("Ruby") || "Ruby"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Collection")}</option>
                                    <option value="vintage">{t("Vintage") || "Vintage"}</option>
                                    <option value="modern">{t("Modern") || "Modern"}</option>
                                    <option value="royal">{t("Royal") || "Royal"}</option>
                                </CustomSelect>
                            </div>
                        </>
                    )}

                    {activeCategory === "Plates" && (
                        <>
                            <div className="lg:col-span-4">
                                <input 
                                    type="text"
                                    placeholder={t("Plate Number")}
                                    className={cn(
                                        "w-full bg-[#EBF1FA] dark:bg-slate-800 border-none outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all",
                                        language === 'ar' ? 'text-right' : 'text-left'
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Emirate")}</option>
                                    <option value="dubai">{t("Dubai") || "Dubai"}</option>
                                    <option value="abu-dhabi">{t("Abu Dhabi") || "Abu Dhabi"}</option>
                                    <option value="sharjah">{t("Sharjah") || "Sharjah"}</option>
                                    <option value="ajman">{t("Ajman") || "Ajman"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Digits")}</option>
                                    <option value="1">{t("1 Digit") || "1 Digit"}</option>
                                    <option value="2">{t("2 Digits") || "2 Digits"}</option>
                                    <option value="3">{t("3 Digits") || "3 Digits"}</option>
                                    <option value="4">{t("4 Digits") || "4 Digits"}</option>
                                    <option value="5">{t("5 Digits") || "5 Digits"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Plate Code")}</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                    <option value="c">C</option>
                                    <option value="d">D</option>
                                    <option value="x">X</option>
                                </CustomSelect>
                            </div>
                        </>
                    )}

                    {activeCategory === "Watches" && (
                        <>
                            <div className="lg:col-span-4">
                                <input 
                                    type="text"
                                    placeholder={t("Keyword")}
                                    className={cn(
                                        "w-full bg-[#EBF1FA] dark:bg-slate-800 border-none outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all",
                                        language === 'ar' ? 'text-right' : 'text-left'
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Brand")}</option>
                                    <option value="rolex">{t("Rolex") || "Rolex"}</option>
                                    <option value="patek-philippe">{t("Patek Philippe") || "Patek Philippe"}</option>
                                    <option value="audemars-piguet">{t("Audemars Piguet") || "Audemars Piguet"}</option>
                                    <option value="richard-mille">{t("Richard Mille") || "Richard Mille"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Movement")}</option>
                                    <option value="automatic">{t("Automatic") || "Automatic"}</option>
                                    <option value="manual">{t("Manual") || "Manual"}</option>
                                    <option value="quartz">{t("Quartz") || "Quartz"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Condition")}</option>
                                    <option value="new">{t("New") || "New"}</option>
                                    <option value="pre-owned">{t("Pre-owned") || "Pre-owned"}</option>
                                    <option value="vintage">{t("Vintage") || "Vintage"}</option>
                                </CustomSelect>
                            </div>
                        </>
                    )}

                    {activeCategory === "General" && (
                        <>
                            <div className="lg:col-span-4">
                                <input 
                                    type="text"
                                    placeholder={t("Keyword")}
                                    className={cn(
                                        "w-full bg-[#EBF1FA] dark:bg-slate-800 border-none outline-none rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#3B82F6]/30 transition-all",
                                        language === 'ar' ? 'text-right' : 'text-left'
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Sub Category")}</option>
                                    <option value="art">{t("Art") || "Art"}</option>
                                    <option value="electronics">{t("Electronics") || "Electronics"}</option>
                                    <option value="fashion">{t("Fashion") || "Fashion"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Source")}</option>
                                    <option value="government">{t("Government") || "Government"}</option>
                                    <option value="corporate">{t("Corporate") || "Corporate"}</option>
                                    <option value="private">{t("Private") || "Private"}</option>
                                </CustomSelect>
                            </div>
                            <div className="lg:col-span-2 relative">
                                <CustomSelect language={language} defaultValue="">
                                    <option value="">{t("Condition")}</option>
                                    <option value="new">{t("New") || "New"}</option>
                                    <option value="used">{t("Used") || "Used"}</option>
                                </CustomSelect>
                            </div>
                        </>
                    )}

                    {/* Search button */}
                    <div className="lg:col-span-2">
                        <button
                            onClick={() => router.push('/category/' + activeCategory.toLowerCase())}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 px-4 rounded-2xl shadow-lg shadow-red-600/10 hover:shadow-xl hover:shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-none uppercase text-xs tracking-wider active:scale-95"
                        >
                            <Search className="w-4 h-4" />
                            <span>{t("Search")}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
