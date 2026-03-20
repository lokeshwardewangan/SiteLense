// components/ui/dashboard-elements.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-2xl border border-white/10 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl dark:border-white/5 dark:bg-gray-900/50',
      className
    )}
  >
    {children}
  </div>
);

export const GradientHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={cn(
      'bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text font-black tracking-tight text-transparent',
      className
    )}
  >
    {children}
  </h1>
);
