// components/ui/dashboard-elements.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-white/20 dark:bg-gray-900/50 dark:border-white/5",
        className
    )}>
        {children}
    </div>
);

export const GradientHeading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h1 className={cn("bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-black tracking-tight", className)}>
        {children}
    </h1>
);
