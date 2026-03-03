// components/results/OpportunityCard.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react'; 

type OpportunityCardProps = {
  title: string;
  description: string;
  displayValue?: string;
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({ title, description, displayValue }) => {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {displayValue && <span className="text-sm font-semibold text-indigo-600">{displayValue}</span>}
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default OpportunityCard;
