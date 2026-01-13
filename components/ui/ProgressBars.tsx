import React from 'react';
import { ProgressData, ProgressColor } from '../../utils/types';

interface CreditBarProps {
  value: number;
}

export const CreditUtilizationBar: React.FC<CreditBarProps> = ({ value }) => {
  let colorClass = 'bg-green-500';
  if (value > 70) colorClass = 'bg-yellow-500';
  if (value > 90) colorClass = 'bg-red-500';
  
  if (value === 0) return (
    <div className="w-full h-2 bg-gray-100 rounded-full"></div>
  );

  return (
    <div className="group relative inline-block w-full">
      <div className="flex items-center gap-2 cursor-help">
        <div className="flex-1 min-w-[60px]">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out ${colorClass}`} 
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
        <span className="text-[10px] text-gray-500 w-8 text-right tabular-nums">{value}%</span>
      </div>
      
      {/* Tooltip omitted for brevity but logic remains same if needed */}
    </div>
  );
};

interface OrderProgressProps {
  data: ProgressData;
  colorOverride?: ProgressColor;
}

export const OrderProgressBar: React.FC<OrderProgressProps> = ({ data, colorOverride }) => {
  const overall = Math.round((data.billed + data.delivered + data.paid + data.fulfilled) / 4);
  
  const getColorClass = (color?: ProgressColor) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'yellow': return 'bg-yellow-400';
      case 'green': return 'bg-emerald-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const barColor = getColorClass(colorOverride);

  return (
    <div className="group relative inline-block w-full">
      <div className="flex items-center gap-2 cursor-help">
        <div className="flex-1 min-w-[60px]">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out ${barColor}`} 
              style={{ width: `${overall}%` }}
            ></div>
          </div>
        </div>
        <span className="text-[10px] text-gray-500 w-8 text-right tabular-nums">{overall}%</span>
      </div>
    </div>
  );
};