import React from 'react';
import { PanelLeft, Bell, ChevronDown, ChevronRight } from 'lucide-react';

export const Header: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-white px-3 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-muted-foreground h-8 w-8"
        >
          <PanelLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <div className="h-4 w-px bg-border mx-1" />
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Sales</a>
          <ChevronRight className="h-3.5 w-3.5" />
          <a href="#" className="font-medium text-foreground transition-colors">Sales Orders</a>
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white"></span>
        </button>
        <div className="h-4 w-px bg-border mx-1" />
        <button className="flex items-center gap-2 rounded-md py-1 px-2 text-sm hover:bg-muted transition-colors">
          <div className="relative flex shrink-0 overflow-hidden h-6 w-6 rounded-full border border-border">
            <img 
                className="aspect-square h-full w-full object-cover" 
                alt="Administrator" 
                src="https://picsum.photos/32/32" 
            />
          </div>
          <span className="hidden md:inline-block font-medium text-sm">Administrator</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
        </button>
      </div>
    </header>
  );
};