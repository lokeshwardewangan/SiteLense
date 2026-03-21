import Image from 'next/image';
import { Github, Twitter, Activity } from 'lucide-react';
import { GradientText } from '@/features/landing/components/gradient-text';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-100 bg-white/40 py-12 backdrop-blur-md">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute top-0 left-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 size-96 translate-x-1/3 translate-y-1/3 rounded-full bg-purple-50/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-1">
              <div className="flex size-10 items-center justify-center rounded-xl transition-transform active:scale-95">
                <Image
                  src="/logo.svg"
                  alt="SiteLens Logo"
                  width={32}
                  height={32}
                  className="size-9"
                />
              </div>
              <GradientText className="text-xl font-black tracking-wide">SiteLens</GradientText>
            </div>
            <p className="max-w-xs text-center text-sm font-medium text-gray-500 md:text-left">
              Modern website performance analysis. Built to help you optimize and dominate the web.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <div className="flex gap-4">
              <a
                href="#"
                className="group flex size-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-sky-50 hover:text-sky-500"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="https://github.com/lokeshwardewangan/SiteLense"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Github className="size-4" />
              </a>
              <a
                href="#"
                className="group flex size-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-emerald-50 hover:text-emerald-500"
              >
                <Activity className="size-4" />
              </a>
            </div>

            <div className="flex flex-col items-center gap-2 text-sm font-medium text-gray-400 md:items-end">
              <p>© {new Date().getFullYear()} SiteLens. All rights reserved.</p>
              <p className="flex items-center gap-1.5">
                <span>Designed & Developed by</span>
                <a
                  href="https://lokeshwardewangan.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1 font-bold text-gray-900 transition-colors hover:text-indigo-600"
                >
                  Lokeshwar Dewangan
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
