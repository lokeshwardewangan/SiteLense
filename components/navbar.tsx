"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Zap className="size-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            SiteLens
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "Features", href: "/#features" },
            { label: "About", href: "/#about" },
            { label: "Pricing", href: "/#pricing" },
            { label: "FAQ", href: "/#faq" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-gray-500 transition-all hover:text-indigo-600 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden font-semibold text-gray-600 sm:inline-flex hover:bg-gray-50 cursor-pointer">
            Log in
          </Button>
          <Link href="/scan">
            <Button 
              size="sm" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-100 transition-all active:scale-95 cursor-pointer"
            >
              Scan Now
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// History update: 2026-03-11T23:00:29
