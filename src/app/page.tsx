"use client"

import { Hero } from "@/components/home/Hero"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { FeaturedMakes } from "@/components/home/FeaturedMakes"
import { GovernmentEntities } from "@/components/home/GovernmentEntities"
import { AuctionCard } from "@/components/auction/AuctionCard"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { ParallelScrollWrapper } from "@/components/layout/ParallelScrollWrapper"

export default function Home() {
  const { t, language } = useLanguage()

  const featuredAuctions = [
    {
      id: "1",
      title: "2021 Toyota Land Cruiser V8 (SafeYard Impound)",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
      currentBid: 185000,
      endTime: "2h 15m",
      aiInsight: "High Demand",
      bids: 42,
      sourceEntity: {
        id: "saaed",
        name: "Saaed Traffic Systems",
        arabicName: "شركة ساعد",
        logo: "/images/saaed-logo.png"
      }
    },
    {
      id: "2",
      title: "2018 Nissan Patrol Platinum (Scrap / Salvage)",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
      currentBid: 42000,
      endTime: "5d 12h",
      aiInsight: "Scrap Value High",
      bids: 18,
      sourceEntity: {
        id: "dubai-police",
        name: "Dubai Police",
        arabicName: "شرطة دبي",
        logo: "/images/dubai-police.png"
      }
    },
    {
      id: "3",
      title: "2020 Mercedes-Benz C300 (External Seller)",
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=800&auto=format&fit=crop",
      currentBid: 95000,
      endTime: "45m",
      aiInsight: "Clean Title",
      bids: 156,
      sourceEntity: {
        id: "abu-dhabi-mobility",
        name: "Abu Dhabi Mobility",
        arabicName: "أبوظبي للتنقل",
        logo: "/images/abu-dhabi-mobility.png"
      }
    },
    {
      id: "4",
      title: "2019 Lexus RX350 (Court Impound)",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop",
      currentBid: 78000,
      endTime: "12h 30m",
      aiInsight: "Ready for Release",
      bids: 24,
      sourceEntity: {
        id: "dmt",
        name: "Dept. of Municipalities & Transport",
        arabicName: "دائرة البلديات والنقل",
        logo: "/images/dmt-logo.png"
      }
    }
  ]

  return (
    <div className="min-h-screen">
      <ParallelScrollWrapper>
        <Hero />

        <FeaturedCategories />

        <FeaturedMakes />

        <GovernmentEntities />

        <section className="py-20 container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col gap-2 text-start">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t("Live Auctions")}
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                {t("Happening now. Don't miss out.")}
              </p>
            </div>
            <button className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
              {t("View All")} <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 inline-block">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        </section>
      </ParallelScrollWrapper>
    </div>
  )
}
