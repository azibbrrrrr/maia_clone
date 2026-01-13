export type StatusType = 'To Bill' | 'To Fulfill' | 'To Pay and Fulfill' | 'To Bill, Pay and Deliver' | 'To Deliver' | 'Cancelled';

export interface ProgressData {
  billed: number;
  delivered: number;
  paid: number;
  fulfilled: number;
}

export interface SalesOrder {
  id: string;
  customer: string;
  creditUtilization: number; // 0-100
  creditLimit?: string;
  creditOutstanding?: string;
  creditBalance?: string;
  status: StatusType;
  progress: ProgressData;
  total: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_COLORS: Record<StatusType, { bg: string; text: string; border: string }> = {
  'To Bill': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'To Fulfill': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'To Pay and Fulfill': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  'To Bill, Pay and Deliver': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  'To Deliver': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Cancelled': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};
