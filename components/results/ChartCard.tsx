// components/results/ChartCard.tsx
import React from 'react';
import dynamic from 'next/dynamic'; // To prevent SSR issues with charts

// Dynamically import ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartCardProps = {
  title: string;
  chartType: 'radialBar' | 'bar';
  series: any; // ApexCharts series type is complex, using any for simplicity here
  options: any; // ApexCharts options type is complex
};

const ChartCard: React.FC<ChartCardProps> = ({ title, chartType, series, options }) => {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="h-64"> {/* Fixed height for chart container */}
        <Chart 
          options={options} 
          series={series} 
          type={chartType} 
          height="100%"
        />
      </div>
    </div>
  );
};

export default ChartCard;

// History update: 2026-03-10T23:00:29

// Dev session update: 2026-03-10T01:30:30
