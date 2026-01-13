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
  ChevronsUpDown,
  Network,
  X
} from 'lucide-react';

interface SidebarProps {
  desktopCollapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
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

const SidebarItem: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  active?: boolean; 
  collapsed: boolean; 
  disabled?: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, active, collapsed, disabled, onClick }) => (
  <li>
    <button
      onClick={disabled ? undefined : onClick}
      className={`
        w-full group flex items-center gap-3 rounded-md px-2 py-1.5 text-xs font-medium transition-all text-left
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
    </button>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ 
  desktopCollapsed, 
  mobileOpen, 
  onCloseMobile,
  activePage, 
  onNavigate 
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out
          
          /* Mobile: fixed width, transform based on open state */
          w-64 transform 
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          
          /* Desktop: transform reset, width controlled by collapsed prop */
          md:translate-x-0 
          ${desktopCollapsed ? 'md:w-[3rem]' : 'md:w-60'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-12 items-center justify-between border-b border-gray-200 px-2">
          <button className="flex items-center gap-2 rounded-md p-1 hover:bg-gray-50 transition-colors text-left flex-1 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-800 text-white">
              <Building2 className="h-4 w-4" />
            </div>
            {(!desktopCollapsed || mobileOpen) && (
              <div className="flex flex-1 items-center justify-between min-w-0">
                <span className="truncate text-sm font-medium text-slate-800 ml-2">MAIA Inc.</span>
                <ChevronsUpDown className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </button>
          
          {/* Close button for mobile */}
          <button 
            onClick={onCloseMobile}
            className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
          <SidebarGroup label="Overview" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activePage === 'Dashboard'} onClick={() => onNavigate('Dashboard')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={ListTodo} label="My Tasks" active={activePage === 'My Tasks'} onClick={() => onNavigate('My Tasks')} collapsed={desktopCollapsed && !mobileOpen} disabled />
            <SidebarItem icon={Clock} label="Daily Digest" active={activePage === 'Daily Digest'} onClick={() => onNavigate('Daily Digest')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>

          <SidebarGroup label="Selling" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={Users} label="Customers" active={activePage === 'Customers'} onClick={() => onNavigate('Customers')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={Package} label="Items" active={activePage === 'Items'} onClick={() => onNavigate('Items')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={FileText} label="Quotations" active={activePage === 'Quotations'} onClick={() => onNavigate('Quotations')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={ShoppingCart} label="Sales Orders" active={activePage === 'Sales Orders'} onClick={() => onNavigate('Sales Orders')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>

          <SidebarGroup label="Billing" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={FileCheck} label="Invoices" active={activePage === 'Invoices'} onClick={() => onNavigate('Invoices')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={FileX} label="Credit Notes" active={activePage === 'Credit Notes'} onClick={() => onNavigate('Credit Notes')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={ScrollText} label="Debit Notes" active={activePage === 'Debit Notes'} onClick={() => onNavigate('Debit Notes')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>

          <SidebarGroup label="Payments" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={Receipt} label="Receipts" active={activePage === 'Receipts'} onClick={() => onNavigate('Receipts')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={CreditCard} label="Vouchers" active={activePage === 'Vouchers'} onClick={() => onNavigate('Vouchers')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>

          <SidebarGroup label="Fulfillment" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={Truck} label="Delivery Notes" active={activePage === 'Delivery Notes'} onClick={() => onNavigate('Delivery Notes')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={Undo2} label="Return Notes" active={activePage === 'Return Notes'} onClick={() => onNavigate('Return Notes')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>

          <SidebarGroup label="Customer Service" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={AlertCircle} label="Customer Issues" active={activePage === 'Customer Issues'} onClick={() => onNavigate('Customer Issues')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>

          <SidebarGroup label="System" collapsed={desktopCollapsed && !mobileOpen}>
            <SidebarItem icon={Network} label="Integration Hub" active={activePage === 'Integration Hub'} onClick={() => onNavigate('Integration Hub')} collapsed={desktopCollapsed && !mobileOpen} />
            <SidebarItem icon={Upload} label="Ingestion" active={activePage === 'Ingestion'} onClick={() => onNavigate('Ingestion')} collapsed={desktopCollapsed && !mobileOpen} />
          </SidebarGroup>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-2 space-y-2">
          <ul className="flex flex-col gap-1">
              <SidebarItem icon={Bug} label="Issues" active={activePage === 'Issues'} onClick={() => onNavigate('Issues')} collapsed={desktopCollapsed && !mobileOpen} />
          </ul>
          
          {(!desktopCollapsed || mobileOpen) && (
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
    </>
  );
};