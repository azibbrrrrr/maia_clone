import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SalesOrderList } from './components/SalesOrderList'; 
import { IntegrationHub } from './components/IntegrationHub';
import { ComingSoon } from './components/ComingSoon';

function App() {
  // Sidebar state
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('Sales Orders');

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
        collapsed={collapsed} 
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main Content Wrapper */}
      <div 
        className={`flex-1 flex flex-col h-full transition-all duration-300 ease-in-out ${collapsed ? 'ml-[3rem]' : 'ml-60'}`}
      >
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 bg-slate-50 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;