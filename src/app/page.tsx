"use client"

import { Hero } from "@/components/home/Hero"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { GovernmentEntities } from "@/components/home/GovernmentEntities"
import { AuctionCard } from "@/components/auction/AuctionCard"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t, language } = useLanguage()

  const featuredAuctions = [
    {
      id: "1",
      title: "2023 Porsche 911 GT3 RS",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670&auto=format&fit=crop",
      currentBid: 850000,
      endTime: "2h 15m",
      aiInsight: "High Demand",
      bids: 42
    },
    {
      id: "2",
      title: "Luxury Palm Jumeirah Villa",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
      currentBid: 15200000,
      endTime: "5d 12h",
      aiInsight: "Undervalued",
      bids: 18
    },
    {
      id: "3",
      title: "VIP Plate Number A-99",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2636&auto=format&fit=crop",
      currentBid: 4500000,
      endTime: "45m",
      aiInsight: "Trending",
      bids: 156
    },
    {
      id: "4",
      title: "Rolex Daytona Panda",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2680&auto=format&fit=crop",
      currentBid: 125000,
      endTime: "12h 30m",
      bids: 24
    }
  ]

  return (
    <div className="min-h-screen">
      <Hero />

      <FeaturedCategories />

      <GovernmentEntities />

      <section className="py-20 container mx-auto px-4">
        <div className={`flex items-end justify-between mb-12 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={language === 'ar' ? 'text-right' : 'text-left'}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
              {t("Live Auctions")}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              {t("Happening now. Don't miss out.")}
            </p>
          </div>
          <button className={`text-lg font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {t("View All")} <span className={`transition-transform ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>{language === 'ar' ? '←' : '→'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </section>
    </div>
  )
}
