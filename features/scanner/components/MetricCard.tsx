// features/scanner/components/MetricCard.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/dashboard-elements';

type MetricCardProps = {
  label: string;
  value: string;
  icon: any;
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon }) => (
  <GlassCard className="group p-5 transition-all hover:-translate-y-1">
    <div className="flex items-center gap-4">
      <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition-transform group-hover:scale-110">
        <Icon className="size-6" />
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</div>
        <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  </GlassCard>
);

export default MetricCard;
