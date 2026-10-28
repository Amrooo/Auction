"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Hero } from "@/components/home/Hero"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { FeaturedMakes } from "@/components/home/FeaturedMakes"
import { GovernmentEntities } from "@/components/home/GovernmentEntities"
import { AuctionCard } from "@/components/auction/AuctionCard"
import { useLanguage } from "@/lib/language-context"
import { ParallelScrollWrapper } from "@/components/layout/ParallelScrollWrapper"
import { formatTimeRemaining } from "@/lib/utils"

const FALLBACK_AUCTIONS = [
  {
    id: "m1",
    title: "2024 Mercedes-AMG G63",
    titleAr: "مرسيدس AMG G63 2024",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    currentBid: 955000,
    endTime: "4h 20m",
    aiInsight: "Rare Spec",
    bids: 56,
    sourceEntity: {
      id: "abu-dhabi-mobility",
      name: "Abu Dhabi Mobility",
      arabicName: "أبوظبي للتنقل",
      logo: "/images/abu-dhabi-mobility.png"
    }
  },
  {
    id: "m2",
    title: "2022 Lamborghini Urus",
    titleAr: "لامبورغيني أوروس 2022",
    image: "https://images.unsplash.com/photo-1621609764095-b22d11ad25ac?q=80&w=800&auto=format&fit=crop",
    currentBid: 1100000,
    endTime: "1d 4h",
    aiInsight: "High Demand",
    bids: 32,
    sourceEntity: {
      id: "dubai-police",
      name: "Dubai Police",
      arabicName: "شرطة دبي",
      logo: "/images/dubai-police.png"
    }
  },
  {
    id: "m3",
    title: "2023 BMW M4 CSL",
    titleAr: "بي إم دبليو M4 CSL 2023",
    image: "https://images.unsplash.com/photo-1555215696-99ac45e75d74?q=80&w=800&auto=format&fit=crop",
    currentBid: 550000,
    endTime: "2d 4h",
    aiInsight: "Best Value",
    bids: 89,
    sourceEntity: {
      id: "abu-dhabi-police",
      name: "Abu Dhabi Police",
      arabicName: "شرطة أبوظبي",
      logo: "/images/abu-dhabi-police-transparent.png"
    }
  },
  {
    id: "m4",
    title: "2021 Ferrari F8 Tributo",
    titleAr: "فيراري F8 تريبوتو 2021",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop",
    currentBid: 1250000,
    endTime: "3d 3h",
    aiInsight: "Clean Title",
    bids: 14,
    sourceEntity: {
      id: "dmt",
      name: "Department of Municipalities & Transport",
      arabicName: "دائرة البلديات والنقل",
      logo: "/images/dmt-logo.png"
    }
  }
]

export default function Home() {
  const { t, language } = useLanguage()
  const isAr = language === 'ar'
  const [auctions, setAuctions] = useState(FALLBACK_AUCTIONS)

  useEffect(() => {
    async function loadLive() {
      try {
        const res = await fetch("/api/vehicles?status=live")
        if (res.ok) {
          const json = await res.json()
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const mapped = json.data.slice(0, 4).map((v: any) => ({
              id: v.id,
              title: isAr && v.titleAr ? v.titleAr : v.title,
              image: v.thumbnail || v.images?.[0] || FALLBACK_AUCTIONS[0].image,
              currentBid: v.currentBid,
              endTime: formatTimeRemaining(v.endDate, isAr),
              aiInsight: v.aiInsight?.badge || (isAr ? "فرصة مميزة" : "Featured Lot"),
              bids: v.bidsCount || 0,
              sourceEntity: v.sourceEntity
            }))
            setAuctions(mapped)
          }
        }
      } catch (e) {
        console.error("Failed to load live auctions for homepage:", e)
      }
    }
    loadLive()
  }, [isAr])

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
            <Link
              href="/category/motors"
              className="text-lg font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-2 group cursor-pointer"
            >
              {t("View All")}{" "}
              <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 inline-block">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {auctions.map((auction) => (
              <AuctionCard key={auction.id} {...auction} />
            ))}
          </div>
        </section>
      </ParallelScrollWrapper>
    </div>
  )
}
