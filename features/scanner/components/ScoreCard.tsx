// features/scanner/components/ScoreCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/dashboard-elements';

type ScoreCardProps = {
  title: string;
  score: number;
  icon: any;
  colorClass: string;
};

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, icon: Icon, colorClass }) => {
  const getProgressColor = (s: number) => {
    if (s >= 90) return '#10b981'; // emerald-500
    if (s >= 75) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <GlassCard className="group p-6">
      <div className="absolute -right-4 -top-4 size-24 bg-linear-to-br from-indigo-500/10 to-purple-500/10 blur-3xl transition-all group-hover:from-indigo-500/20 group-hover:to-purple-500/20" />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-4 size-44">
          <svg className="size-full -rotate-90" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-gray-100 dark:text-gray-800"
            />
            {/* Animated Progress Ring */}
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={getProgressColor(score)}
              strokeWidth="12"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="mb-1 rounded-full bg-gray-50 p-2 dark:bg-gray-800">
                <Icon className={cn("size-5", colorClass)} />
              </div>
              <span className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">
                {score}
              </span>
            </motion.div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{title}</h3>
        <div className={cn("mt-1 text-xs font-semibold uppercase tracking-wider", colorClass)}>
          {score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : 'Needs Work'}
        </div>
      </div>
    </GlassCard>
  );
};

export default ScoreCard;
