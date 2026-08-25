import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuctionAI | Premium AI-Powered Marketplace",
  description: "Experience the future of auctions with AI-driven insights, real-time bidding, and smart discovery.",
};

import { LanguageProvider } from "@/lib/language-context";
import { BackToTop } from "@/components/layout/BackToTop";
import { CanvasBackground } from "@/components/layout/CanvasBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CanvasBackground />
          <div 
            className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none"
          >
            <img
              src="/bg-abstract.png"
              alt="Abstract Background"
              className="w-full h-full object-cover opacity-50 transition-opacity duration-300"
            />
          </div>
          <LanguageProvider>
            <Header />
            <main className="flex-1 pt-24 pb-12">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
