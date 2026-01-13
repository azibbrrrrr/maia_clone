import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SalesOrderList } from './components/SalesOrderList'; 
import { IntegrationHub } from './components/IntegrationHub';
import { ComingSoon } from './components/ComingSoon';

function App() {
  // Sidebar state
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('Sales Orders');

  // Handle screen resize to reset mobile state if needed (optional but good practice)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setDesktopCollapsed(!desktopCollapsed);
    }
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    // Close mobile menu on navigation
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Sales Orders':
        return <SalesOrderList />;
      case 'Integration Hub':
        return <IntegrationHub />;
      default:
        return <ComingSoon title={activePage} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        desktopCollapsed={desktopCollapsed}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Wrapper */}
      <div 
        className={`
          flex-1 flex flex-col h-full transition-all duration-300 ease-in-out
          ml-0 
          ${desktopCollapsed ? 'md:ml-[3rem]' : 'md:ml-60'}
        `}
      >
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 bg-slate-50 overflow-hidden relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;