export type StatusType = 'To Bill' | 'To Fulfill' | 'To Pay and Fulfill' | 'To Bill, Pay and Deliver' | 'To Deliver' | 'Cancelled';

export interface ProgressData {
  billed: number;
  delivered: number;
  paid: number;
  fulfilled: number;
}

export type ProgressColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue';

export interface SalesOrder {
  id: string;
  customer: string;
  creditUtilization: number; // 0-100
  creditLimit?: string;
  creditOutstanding?: string;
  creditBalance?: string;
  status: StatusType;
  progress: ProgressData;
  progressColor?: ProgressColor; // Explicit color override to match design
  total: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_COLORS: Record<StatusType, { bg: string; text: string; border: string }> = {
  'To Bill': { bg: 'bg-[#FEF9C3]', text: 'text-[#854D0E]', border: 'border-transparent' }, // Yellow-100, Yellow-800
  'To Fulfill': { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', border: 'border-transparent' }, // Amber-100
  'To Pay and Fulfill': { bg: 'bg-[#E0E7FF]', text: 'text-[#3730A3]', border: 'border-transparent' }, // Indigo-100, Indigo-800
  'To Bill, Pay and Deliver': { bg: 'bg-[#FCE7F3]', text: 'text-[#9D174D]', border: 'border-transparent' }, // Pink-100, Pink-800
  'To Deliver': { bg: 'bg-[#FFEDD5]', text: 'text-[#9A3412]', border: 'border-transparent' }, // Orange-100
  'Cancelled': { bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', border: 'border-transparent' }, // Red-100
};