import { Hero } from '@/features/landing/components/hero';
import { About } from '@/features/landing/components/about';
import { FeaturesGrid } from '@/features/landing/components/features-grid';
import { LiveScanner } from '@/features/scanner/components/live-scanner';
import { Supporting } from '@/features/landing/components/supporting';
import { Pricing } from '@/features/landing/components/pricing';
import { FAQ } from '@/features/landing/components/faq';
import { CTA } from '@/features/landing/components/cta';

import { Footer } from '@/components/layouts/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
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

      <Footer />
    </main>
  );
}

// History update: 2026-03-16T23:00:31

// Dev session update: 2026-03-16T20:51:34
