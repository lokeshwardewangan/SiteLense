// components/results/MetricCard.tsx
import React from 'react';

type MetricCardProps = {
  label: string;
  value: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 flex flex-col items-start justify-center hover:shadow-xl hover:border-indigo-200 transition-all duration-300 ease-in-out">
      <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-3xl font-black text-gray-900">{value}</div>
    </div>
  );
};

export default MetricCard;
