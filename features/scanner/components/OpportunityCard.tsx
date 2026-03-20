// features/scanner/components/OpportunityCard.tsx
'use client';

import React from 'react';
import { Zap, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/dashboard-elements';

type OpportunityCardProps = {
  title: string;
  description: string;
  displayValue?: string;
  icon?: any;
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({ title, description, displayValue, icon: Icon }) => {
  const isHighImpact = displayValue?.includes('s') && parseFloat(displayValue) > 1;

  return (
    <GlassCard className="group cursor-pointer p-5 hover:bg-white/90">
      <div className="flex items-start gap-4">
        <div className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg shadow-sm",
          isHighImpact ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
        )}>
          {Icon ? <Icon className="size-5" /> : <Zap className="size-5" />}
        </div>
        <div className="grow">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600">{title}</h3>
            {displayValue && (
              <span className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                isHighImpact ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              )}>
                -{displayValue}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
            View details <ChevronRight className="size-3" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default OpportunityCard;
