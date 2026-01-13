import { IntegrationConnection } from './types';

export const activeConnections: IntegrationConnection[] = [
  {
    id: 'conn-shopee-my',
    name: 'Shopee MY',
    provider: 'Shopee',
    category: 'E-commerce',
    status: 'Active',
    lastSync: '10 mins ago',
    health: 98,
    iconColor: 'bg-orange-500'
  },
  {
    id: 'conn-autocount',
    name: 'AutoCount HQ',
    provider: 'AutoCount',
    category: 'Accounting',
    status: 'Error',
    lastSync: '2 days ago',
    health: 45,
    iconColor: 'bg-red-600'
  },
  {
    id: 'conn-whatsapp',
    name: 'WhatsApp Business',
    provider: 'WhatsApp',
    category: 'Comms',
    status: 'Active',
    lastSync: 'Real-time',
    health: 100,
    iconColor: 'bg-green-500'
  },
  {
    id: 'conn-tiktok',
    name: 'TikTok Shop',
    provider: 'TikTok',
    category: 'E-commerce',
    status: 'Active',
    lastSync: '1 hour ago',
    health: 92,
    iconColor: 'bg-black'
  }
];

export const platformOptions = {
  'E-commerce': [
    { id: 'shopee', name: 'Shopee', iconColor: 'bg-orange-500' },
    { id: 'lazada', name: 'Lazada', iconColor: 'bg-blue-600' },
    { id: 'tiktok', name: 'TikTok Shop', iconColor: 'bg-black' },
    { id: 'shopify', name: 'Shopify', iconColor: 'bg-green-600' }
  ],
  'Accounting': [
    { id: 'autocount', name: 'AutoCount', iconColor: 'bg-red-600' },
    { id: 'xero', name: 'Xero', iconColor: 'bg-blue-400' },
    { id: 'quickbooks', name: 'QuickBooks', iconColor: 'bg-green-500' }
  ],
  'Comms': [
    { id: 'whatsapp', name: 'WhatsApp', iconColor: 'bg-green-500' },
    { id: 'telegram', name: 'Telegram', iconColor: 'bg-blue-400' }
  ],
  'Logistics': [
    { id: 'jnt', name: 'J&T Express', iconColor: 'bg-red-500' },
    { id: 'dhl', name: 'DHL', iconColor: 'bg-yellow-500' }
  ]
};
