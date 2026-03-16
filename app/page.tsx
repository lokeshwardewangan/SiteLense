import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { FeaturesGrid } from "@/components/features-grid";
import { LiveScanner } from "@/components/live-scanner";
import { Supporting } from "@/components/supporting";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50/70 via-white to-slate-100/50 selection:bg-indigo-100 selection:text-indigo-700">
      <Navbar />
      <Hero />
      <div className="space-y-8">
        <Supporting />
        <About />
        <FeaturesGrid />
        <LiveScanner />
        <Pricing />
        <FAQ />
        <CTA />
      </div>
      
      {/* Small Footer to keep it professional */}
      <footer className="border-t border-gray-100 py-16 bg-white/40 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <span className="font-black text-xs">SL</span>
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">SiteLens</span>
            </div>
            <p className="text-sm font-bold text-gray-400">
              © {new Date().getFullYear()} SiteLens. Built for the modern web.
            </p>
            <div className="flex gap-8 text-sm font-bold text-gray-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Status</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// History update: 2026-03-16T23:00:31

// Dev session update: 2026-03-16T20:51:34
