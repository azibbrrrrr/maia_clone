import React from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  ChevronsUpDown, 
  ChevronDown, 
  Eye, 
  Ban, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { salesOrders } from '../utils/mockData';
import { StatusBadge } from './ui/StatusBadge';
import { CreditUtilizationBar, OrderProgressBar } from './ui/ProgressBars';

export const SalesOrderList: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          
          {/* Top Grid Area (Search + Actions) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400 text-gray-800 bg-white"
                placeholder="Search sales orders..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors active:scale-95">
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-500 border border-primary-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-primary-600 transition-colors active:scale-95">
                <Plus className="h-3.5 w-3.5" />
                Create Sales Order
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center gap-6 overflow-x-auto pb-px">
              {['All Orders', 'Draft', 'In Progress', 'Completed', 'Closed', 'Cancelled'].map((tab, idx) => (
                <button 
                  key={tab}
                  className={`
                    relative pb-2 text-sm font-medium whitespace-nowrap transition-colors
                    ${idx === 0 ? 'text-primary-600' : 'text-gray-500 hover:text-gray-800'}
                  `}
                >
                  {tab}
                  {idx === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-500 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="relative flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden flex-1 min-h-0">
            <div className="flex-1 overflow-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-white sticky top-0 z-10">
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="h-10 px-3 w-10 bg-white">
                       {/* Checkbox placeholder */}
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[150px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Order ID <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[180px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Customer <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[150px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Credit Utilization <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[160px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Status <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[160px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Progress <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[100px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Total <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[150px]">
                      <button className="flex items-center gap-1 hover:text-gray-800 group">
                        Created at <ChevronsUpDown className="h-3 w-3 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white w-[150px]">
                      <button className="flex items-center gap-1 text-primary-600">
                        Updated at <ChevronDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-3 font-medium bg-white text-right pr-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {salesOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                      <td className="p-3 w-10">
                        {/* Checkbox logic */}
                      </td>
                      <td className="p-3">
                        <span className="font-mono text-gray-500">{order.id}</span>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-gray-900 truncate max-w-[170px]" title={order.customer}>{order.customer}</div>
                      </td>
                      <td className="p-3">
                        <CreditUtilizationBar value={order.creditUtilization} />
                      </td>
                      <td className="p-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="p-3">
                        <OrderProgressBar data={order.progress} colorOverride={order.progressColor} />
                      </td>
                      <td className="p-3 font-semibold text-gray-700">
                        {order.total}
                      </td>
                      <td className="p-3 text-gray-500 truncate">
                        {order.createdAt}
                      </td>
                      <td className="p-3 text-gray-500 truncate">
                        {order.updatedAt}
                      </td>
                      <td className="p-3 text-right pr-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors" title="Download">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors" title="Cancel">
                            <Ban className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span>Page 1 of 17</span>
                <span className="text-gray-300">•</span>
                <span>409 total results</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <button className="flex items-center justify-between gap-2 border border-gray-200 rounded px-2 py-1 min-w-[3rem] hover:bg-gray-50 text-gray-700">
                    25 <ChevronDown className="h-3 w-3 text-gray-400" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-1 border border-gray-200 rounded disabled:opacity-50 disabled:bg-gray-50 bg-white hover:bg-gray-50 text-gray-600" disabled>
                    <ChevronsLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 border border-gray-200 rounded disabled:opacity-50 disabled:bg-gray-50 bg-white hover:bg-gray-50 text-gray-600" disabled>
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 bg-white text-gray-600">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 border border-gray-200 rounded hover:bg-gray-50 bg-white text-gray-600">
                    <ChevronsRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};