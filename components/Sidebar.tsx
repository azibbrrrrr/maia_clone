import React from 'react';
import { 
  ShoppingCart, 
  Building2, 
  LayoutDashboard, 
  ListTodo, 
  Clock, 
  Users, 
  Package, 
  FileText, 
  FileCheck, 
  FileX, 
  ScrollText, 
  Receipt, 
  CreditCard, 
  Truck, 
  Undo2, 
  AlertCircle, 
  Upload, 
  Bug, 
  Monitor, 
  Sun, 
  Moon,
  ChevronsUpDown
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const SidebarGroup: React.FC<{ label: string; children: React.ReactNode; collapsed: boolean }> = ({ label, children, collapsed }) => (
  <div className="flex flex-col py-2">
    {!collapsed && (
      <div className="px-4 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider transition-opacity duration-200">
        {label}
      </div>
    )}
    <ul className="flex flex-col gap-0.5 px-2">{children}</ul>
  </div>
);

const SidebarItem: React.FC<{ icon: React.ElementType; label: string; active?: boolean; collapsed: boolean, disabled?: boolean }> = ({ icon: Icon, label, active, collapsed, disabled }) => (
  <li>
    <a
      href="#"
      className={`
        group flex items-center gap-3 rounded-md px-2 py-1.5 text-xs font-medium transition-all
        ${active 
          ? 'bg-orange-50 text-orange-600' 
          : disabled 
            ? 'opacity-50 cursor-not-allowed text-gray-400' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
        ${collapsed ? 'justify-center p-2' : ''}
      `}
    >
      <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-600'}`} />
      {!collapsed && <span className="truncate">{label}</span>}
    </a>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside
      className={`
        group/sidebar fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[3rem]' : 'w-60'}
      `}
    >
      {/* Sidebar Header */}
      <div className="flex h-12 items-center border-b border-gray-200 px-2">
        <button className="flex w-full items-center gap-2 rounded-md p-1 hover:bg-gray-50 transition-colors text-left">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-800 text-white">
            <Building2 className="h-4 w-4" />
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-sm font-medium text-slate-800">MAIA Inc.</span>
              <ChevronsUpDown className="h-4 w-4 text-gray-400" />
            </>
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        <SidebarGroup label="Overview" collapsed={collapsed}>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
          <SidebarItem icon={ListTodo} label="My Tasks" collapsed={collapsed} disabled />
          <SidebarItem icon={Clock} label="Daily Digest" collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="Selling" collapsed={collapsed}>
          <SidebarItem icon={Users} label="Customers" collapsed={collapsed} />
          <SidebarItem icon={Package} label="Items" collapsed={collapsed} />
          <SidebarItem icon={FileText} label="Quotations" collapsed={collapsed} />
          <SidebarItem icon={ShoppingCart} label="Sales Orders" active collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="Billing" collapsed={collapsed}>
          <SidebarItem icon={FileCheck} label="Invoices" collapsed={collapsed} />
          <SidebarItem icon={FileX} label="Credit Notes" collapsed={collapsed} />
          <SidebarItem icon={ScrollText} label="Debit Notes" collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="Payments" collapsed={collapsed}>
          <SidebarItem icon={Receipt} label="Receipts" collapsed={collapsed} />
          <SidebarItem icon={CreditCard} label="Vouchers" collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="Fulfillment" collapsed={collapsed}>
          <SidebarItem icon={Truck} label="Delivery Notes" collapsed={collapsed} />
          <SidebarItem icon={Undo2} label="Return Notes" collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="Customer Service" collapsed={collapsed}>
          <SidebarItem icon={AlertCircle} label="Customer Issues" collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="Others" collapsed={collapsed}>
          <SidebarItem icon={Upload} label="Ingestion" collapsed={collapsed} />
        </SidebarGroup>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-200 p-2 space-y-2">
        <ul className="flex flex-col gap-1">
            <SidebarItem icon={Bug} label="Issues" collapsed={collapsed} />
        </ul>
        
        {!collapsed && (
          <div className="flex items-center justify-between rounded-full bg-gray-50 border border-gray-200 p-0.5">
             <div className="px-2 text-[10px] font-medium text-gray-500">Light Mode</div>
             <div className="flex items-center gap-0.5">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-600"><Monitor className="h-3 w-3" /></button>
                <button className="p-1 rounded-full bg-white shadow-sm text-gray-800 border border-gray-200"><Sun className="h-3 w-3" /></button>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-600"><Moon className="h-3 w-3" /></button>
             </div>
          </div>
        )}
      </div>
    </aside>
  );
};