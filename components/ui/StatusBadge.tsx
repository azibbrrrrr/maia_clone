import React from 'react';
import { StatusType, STATUS_COLORS } from '../../utils/types';

export const StatusBadge: React.FC<{ status: StatusType }> = ({ status }) => {
  const styles = STATUS_COLORS[status] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
  
  return (
    <div className="inline-flex justify-start w-full">
      <span className={`inline-flex items-center gap-1 max-w-full relative select-none font-medium border text-[10px] px-2 py-0.5 rounded-full ${styles.bg} ${styles.text} ${styles.border}`}>
        {status}
      </span>
    </div>
  );
};