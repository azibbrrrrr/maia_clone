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
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all placeholder:text-slate-400 text-slate-800"
                placeholder="Search sales orders..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors active:scale-95">
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-400 border border-orange-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-orange-500 transition-colors active:scale-95">
                <Plus className="h-3.5 w-3.5" />
                Create Sales Order
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex items-center gap-6 overflow-x-auto pb-px">
              {['All Orders', 'Draft', 'In Progress', 'Completed', 'Closed', 'Cancelled'].map((tab, idx) => (
                <button 
                  key={tab}
                  className={`
                    relative pb-2 text-xs font-medium whitespace-nowrap transition-colors
                    ${idx === 0 ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}
                  `}
                >
                  {tab}
                  {idx === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-900 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="relative flex flex-col rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden flex-1 min-h-0">
            <div className="flex-1 overflow-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-white sticky top-0 z-10 shadow-sm">
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="h-10 px-2 w-8">
                        {/* Checkbox placeholder */}
                    </th>
                    <th className="h-10 px-2 font-medium w-[140px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Order ID <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[180px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Customer <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[150px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Credit Utilization <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[140px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Status <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[150px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Progress <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[100px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Total <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[150px]">
                      <button className="flex items-center gap-1 hover:text-slate-800">
                        Created at <ChevronsUpDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium w-[150px]">
                      <button className="flex items-center gap-1 text-slate-800">
                        Updated at <ChevronDown className="h-3 w-3" />
                      </button>
                    </th>
                    <th className="h-10 px-2 font-medium text-right pr-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {salesOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                      <td className="p-2 w-8">
                        {/* Checkbox logic would go here */}
                      </td>
                      <td className="p-2">
                        <span className="font-mono text-slate-600 font-medium">{order.id}</span>
                      </td>
                      <td className="p-2">
                        <div className="font-medium text-slate-800 truncate max-w-[170px]" title={order.customer}>{order.customer}</div>
                      </td>
                      <td className="p-2">
                        <CreditUtilizationBar value={order.creditUtilization} />
                      </td>
                      <td className="p-2">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="p-2">
                        <OrderProgressBar data={order.progress} />
                      </td>
                      <td className="p-2 font-semibold text-slate-700">
                        {order.total}
                      </td>
                      <td className="p-2 text-slate-500 truncate">
                        {order.createdAt}
                      </td>
                      <td className="p-2 text-slate-500 truncate">
                        {order.updatedAt}
                      </td>
                      <td className="p-2 text-right pr-4">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors" title="Download">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded text-red-400 hover:text-red-600 transition-colors" title="Cancel">
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
            <div className="border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>Page 1 of 17</span>
                <span>•</span>
                <span>409 total results</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <button className="flex items-center justify-between gap-2 border border-slate-200 rounded px-2 py-1 min-w-[3rem] hover:bg-slate-50">
                    25 <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-1 border border-slate-200 rounded disabled:opacity-50 hover:bg-slate-50" disabled>
                    <ChevronsLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 border border-slate-200 rounded disabled:opacity-50 hover:bg-slate-50" disabled>
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 border border-slate-200 rounded hover:bg-slate-50">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 border border-slate-200 rounded hover:bg-slate-50">
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