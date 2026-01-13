import React from 'react';
import { Construction } from 'lucide-react';

export const ComingSoon: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50 p-8">
      <div className="bg-white p-6 rounded-2xl mb-4 shadow-sm border border-slate-100 ring-4 ring-slate-50">
        <Construction className="h-10 w-10 text-orange-200" />
      </div>
      <h2 className="text-lg font-semibold text-slate-700 mb-2">{title}</h2>
      <p className="text-sm text-slate-500 text-center max-w-xs">
        This module is currently under development. <br/>Check back later for updates.
      </p>
    </div>
  );
};