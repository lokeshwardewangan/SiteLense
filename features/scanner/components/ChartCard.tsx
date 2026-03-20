// features/scanner/components/ChartCard.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { GlassCard } from '@/components/ui/dashboard-elements';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartCardProps = {
  title: string;
  options: any;
  series: any;
  type: 'radialBar' | 'bar';
};

const ChartCard: React.FC<ChartCardProps> = ({ title, options, series, type }) => (
  <GlassCard className="p-6">
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <div className="rounded-lg bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
        LIVE DATA
      </div>
    </div>
    <div className="h-[300px] w-full">
      <Chart options={options} series={series} type={type} height="100%" />
    </div>
  </GlassCard>
);

export default ChartCard;
