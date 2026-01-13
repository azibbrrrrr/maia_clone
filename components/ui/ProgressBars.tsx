import React from 'react';
import { ProgressData } from '../../utils/types';

interface CreditBarProps {
  value: number;
}

export const CreditUtilizationBar: React.FC<CreditBarProps> = ({ value }) => {
  let colorClass = 'bg-green-500';
  if (value > 70) colorClass = 'bg-yellow-500';
  if (value > 90) colorClass = 'bg-red-500';

  return (
    <div className="group relative inline-block w-full">
      <div className="flex items-center gap-2 cursor-help">
        <div className="flex-1 min-w-[60px]">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out ${colorClass}`} 
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
        <span className="text-[10px] font-medium text-slate-700 w-8 text-right">{value}%</span>
      </div>
      
      {/* Tooltip */}
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 group-hover:block w-max">
        <div className="relative">
          <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-slate-200 bg-white"></div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl text-xs">
            <div className="mb-2 border-b border-slate-100 pb-2">
              <h4 className="font-semibold text-slate-800">Credit Utilisation Details</h4>
            </div>
            <div className="space-y-1 text-slate-600">
               <div className="flex justify-between gap-4"><span>Limit:</span><span className="font-medium text-slate-900">RM 20,000.00</span></div>
               <div className="flex justify-between gap-4"><span>Outstanding:</span><span className="font-medium text-slate-900">RM 5,500.00</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OrderProgressProps {
  data: ProgressData;
}

export const OrderProgressBar: React.FC<OrderProgressProps> = ({ data }) => {
  // Calculate overall progress simply as an average or specific logic. 
  // For this demo, let's just assume the "Overall" is visually represented by the dominant color or a weighted avg.
  // The design shows a single bar with a specific color based on the state.
  
  const overall = Math.round((data.billed + data.delivered + data.paid + data.fulfilled) / 4);
  
  // Logic to determine color based on what is "lacking" or dominant, mimicking the provided screenshot behavior
  let barColor = 'bg-slate-300';
  if (overall === 100) barColor = 'bg-green-500';
  else if (data.paid === 0 && data.delivered > 0) barColor = 'bg-red-500'; // Critical path
  else if (data.billed > 0 && data.paid === 0) barColor = 'bg-orange-500';
  else if (data.billed > 50) barColor = 'bg-yellow-500';
  else if (overall > 0) barColor = 'bg-blue-500';

  // Override logic to match screenshot visually roughly
  if (overall === 25) barColor = 'bg-red-500'; 
  if (overall === 46) barColor = 'bg-orange-500';
  if (overall === 49) barColor = 'bg-green-500';
  if (overall === 75) barColor = 'bg-yellow-500';
  if (overall === 50) barColor = 'bg-orange-500';
  if (overall === 39) barColor = 'bg-orange-500';
  if (overall === 0) barColor = 'bg-green-500'; // Assuming 0% means just started/Draft which might be green "new" or gray. HTML shows green bar at 0% width? No, width 0.

  return (
    <div className="group relative inline-block w-full">
      <div className="flex items-center gap-2 cursor-help">
        <div className="flex-1 min-w-[60px]">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out ${barColor}`} 
              style={{ width: `${overall}%` }}
            ></div>
          </div>
        </div>
        <span className="text-[10px] font-medium text-slate-700 w-8 text-right">{overall}%</span>
      </div>

      {/* Detailed Tooltip */}
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 group-hover:block w-64">
        <div className="relative">
          <div className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-slate-200 bg-white"></div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl text-[10px]">
            <div className="mb-2 border-b border-slate-100 pb-2">
              <h4 className="font-semibold text-slate-800 text-xs">Order Progress Breakdown</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-16 text-slate-500">Billed:</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{width: `${data.billed}%`}}></div>
                </div>
                <span className="w-8 text-right font-medium">{data.billed}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-slate-500">Delivered:</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{width: `${data.delivered}%`}}></div>
                </div>
                <span className="w-8 text-right font-medium">{data.delivered}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-slate-500">Paid:</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{width: `${data.paid}%`}}></div>
                </div>
                <span className="w-8 text-right font-medium">{data.paid}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 text-slate-500">Fulfilled:</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{width: `${data.fulfilled}%`}}></div>
                </div>
                <span className="w-8 text-right font-medium">{data.fulfilled}%</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between font-semibold text-slate-800">
              <span>Overall:</span>
              <span>{overall}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};