import { SalesOrder } from './types';

export const salesOrders: SalesOrder[] = [
  {
    id: 'SAL-ORD-2025-00367',
    customer: 'Evergreen Supplies Sdn Bhd',
    creditUtilization: 28,
    creditLimit: 'RM 20,001.00',
    creditOutstanding: 'RM 5,526.06',
    creditBalance: 'RM 0.00',
    status: 'To Bill',
    progress: { billed: 0, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 25%
    total: 'RM 1,288.10',
    createdAt: 'Nov 6, 2025, 09:47 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00376',
    customer: 'Metro Supplies Sdn Bhd',
    creditUtilization: 49,
    creditLimit: 'RM 10,000.00',
    creditOutstanding: 'RM 4,896.00',
    creditBalance: 'RM 0.00',
    status: 'To Bill',
    progress: { billed: 0, delivered: 100, paid: 0, fulfilled: 0 },
    total: 'RM 1,380.00',
    createdAt: 'Nov 10, 2025, 10:48 AM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00378',
    customer: 'Metro Supplies Sdn Bhd',
    creditUtilization: 49,
    status: 'To Bill, Pay and Deliver', // Mapped to closest variant
    progress: { billed: 86, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 46%
    total: 'RM 1,212.00',
    createdAt: 'Nov 10, 2025, 02:30 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00379',
    customer: 'Metro Supplies Sdn Bhd',
    creditUtilization: 49,
    status: 'To Bill',
    progress: { billed: 0, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 25%
    total: 'RM 130.20',
    createdAt: 'Nov 10, 2025, 04:09 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00355',
    customer: 'Azib',
    creditUtilization: 0,
    creditLimit: 'RM 0.00',
    creditOutstanding: 'RM 0.00',
    creditBalance: 'RM 1,664,615.34',
    status: 'To Fulfill',
    progress: { billed: 100, delivered: 100, paid: 100, fulfilled: 0 }, // Overall 75%
    total: 'RM 179.00',
    createdAt: 'Nov 6, 2025, 09:50 AM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00377',
    customer: 'Metro Supplies Sdn Bhd',
    creditUtilization: 49,
    status: 'To Bill, Pay and Deliver',
    progress: { billed: 77, delivered: 80, paid: 0, fulfilled: 0 }, // Overall 39%
    total: 'RM 1,212.00',
    createdAt: 'Nov 10, 2025, 12:19 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00382',
    customer: 'Metro Supplies Sdn Bhd',
    creditUtilization: 49,
    status: 'To Bill, Pay and Deliver',
    progress: { billed: 86, delivered: 35, paid: 0, fulfilled: 0 }, // Overall 30%
    total: 'RM 1,318.00',
    createdAt: 'Nov 11, 2025, 03:17 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00401',
    customer: 'Azib',
    creditUtilization: 0,
    status: 'To Bill, Pay and Deliver', // Simplified mapping
    progress: { billed: 50, delivered: 0, paid: 100, fulfilled: 0 }, // Overall 38%
    total: 'RM 869,189.40',
    createdAt: 'Nov 13, 2025, 03:16 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00369',
    customer: 'Metro Supplies Sdn Bhd',
    creditUtilization: 49,
    status: 'To Pay and Fulfill',
    progress: { billed: 100, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 50%
    total: 'RM 321.00',
    createdAt: 'Nov 7, 2025, 11:17 AM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00540',
    customer: 'Haiqal Harun',
    creditUtilization: 0,
    status: 'To Bill',
    progress: { billed: 0, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 25%
    total: 'RM 110.00',
    createdAt: 'Nov 30, 2025, 12:52 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00541',
    customer: 'Haiqal Harun',
    creditUtilization: 0,
    status: 'To Pay and Fulfill',
    progress: { billed: 100, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 50%
    total: 'RM 110.00',
    createdAt: 'Nov 30, 2025, 03:50 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00657',
    customer: 'Azib',
    creditUtilization: 0,
    status: 'To Pay and Fulfill',
    progress: { billed: 100, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 50%
    total: 'RM 190.80',
    createdAt: 'Dec 2, 2025, 04:13 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
  {
    id: 'SAL-ORD-2025-00400',
    customer: 'Azib',
    creditUtilization: 0,
    status: 'Cancelled',
    progress: { billed: 0, delivered: 100, paid: 0, fulfilled: 0 }, // Overall 25%
    total: 'RM 275.00',
    createdAt: 'Nov 13, 2025, 02:43 PM',
    updatedAt: 'Jan 13, 2026, 10:03 PM',
  },
];