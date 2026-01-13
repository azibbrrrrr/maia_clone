import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  ArrowLeft, 
  RefreshCw, 
  Check, 
  AlertTriangle, 
  Activity, 
  Database, 
  MessageCircle, 
  ShoppingBag, 
  Truck,
  Settings2,
  Play,
  Loader2,
  Server,
  X
} from 'lucide-react';
import { IntegrationConnection, SyncJob, IntegrationCategory } from '../utils/types';
import { activeConnections, platformOptions } from '../utils/integrationData';
import { ToastContainer } from './ui/Toast';

// --- SUB-COMPONENTS ---

const ConnectionCard: React.FC<{ connection: IntegrationConnection; onClick: () => void }> = ({ connection, onClick }) => {
  const getIcon = (cat: IntegrationCategory) => {
    switch(cat) {
      case 'E-commerce': return <ShoppingBag className="h-5 w-5 text-white" />;
      case 'Accounting': return <Database className="h-5 w-5 text-white" />;
      case 'Comms': return <MessageCircle className="h-5 w-5 text-white" />;
      case 'Logistics': return <Truck className="h-5 w-5 text-white" />;
      default: return <Activity className="h-5 w-5 text-white" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-primary-300 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shadow-sm ${connection.iconColor}`}>
          {getIcon(connection.category)}
        </div>
        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${
          connection.status === 'Active' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {connection.status === 'Active' ? 'Connected' : 'Auth Failed'}
        </span>
      </div>
      
      <h3 className="font-semibold text-slate-800 mb-1">{connection.name}</h3>
      <div className="text-xs text-slate-500 mb-4">{connection.category}</div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Last Synced</span>
          <span className="font-medium text-slate-700">{connection.lastSync}</span>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Health</span>
            <span className={`font-medium ${connection.health > 90 ? 'text-green-600' : connection.health > 50 ? 'text-orange-500' : 'text-red-500'}`}>
              {connection.health}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${connection.health > 90 ? 'bg-green-500' : connection.health > 50 ? 'bg-orange-500' : 'bg-red-500'}`} 
              style={{ width: `${connection.health}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SetupWizard: React.FC<{ onClose: () => void; onSave: () => void }> = ({ onClose, onSave }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory>('E-commerce');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      onSave();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4">
      <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:rounded-xl md:max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Add New Connection</h2>
            <p className="text-xs text-slate-500">Step {step} of 2: {step === 1 ? 'Select Platform' : 'Configuration'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Category Tabs */}
              <div className="flex gap-2 border-b border-gray-100 pb-1 overflow-x-auto scrollbar-hide">
                {(Object.keys(platformOptions) as IntegrationCategory[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
                      selectedCategory === cat ? 'text-primary-600' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 -mb-1.5" />}
                  </button>
                ))}
              </div>

              {/* Platform Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {platformOptions[selectedCategory].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all gap-3 ${
                      selectedPlatform === platform.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${platform.iconColor}`}>
                      {/* Using first letter as generic icon for prototype */}
                      <span className="font-bold text-lg">{platform.name[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700 text-center">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-right-10 duration-300">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 flex items-start gap-3 mb-6">
                <AlertTriangle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Credentials Required</p>
                  <p className="opacity-90">Please enter your API credentials. You can find these in your {selectedPlatform} developer portal.</p>
                </div>
              </div>

              {/* Dynamic Forms based on Category */}
              {selectedCategory === 'E-commerce' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Shop ID</label>
                    <input type="text" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" placeholder="e.g. 993821" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Partner Key</label>
                    <input type="password" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value="dummy-password" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Region</label>
                    <select className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                      <option>Malaysia</option>
                      <option>Singapore</option>
                      <option>Indonesia</option>
                    </select>
                  </div>
                </>
              )}

              {selectedCategory === 'Accounting' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Server URL</label>
                    <input type="text" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2" placeholder="https://api.autocount.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">DB User</label>
                      <input type="text" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">DB Password</label>
                      <input type="password" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2" />
                    </div>
                  </div>
                </>
              )}

              {selectedCategory === 'Comms' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">API Key</label>
                    <input type="password" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number ID</label>
                    <input type="text" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2" />
                  </div>
                </>
              )}
               
               {selectedCategory === 'Logistics' && (
                 <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">API Client ID</label>
                    <input type="text" className="w-full text-sm border border-gray-300 rounded-md px-3 py-2" />
                 </div>
               )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          {step === 1 ? (
            <>
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Cancel</button>
              <button 
                onClick={() => selectedPlatform && setStep(2)} 
                disabled={!selectedPlatform}
                className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Step
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setStep(1)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Back</button>
              <button 
                onClick={handleTestConnection}
                disabled={isTesting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors min-w-[140px] justify-center"
              >
                {isTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Test & Connect'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SyncConsole: React.FC<{ 
  connection: IntegrationConnection; 
  onBack: () => void; 
  triggerToast: (msg: string, type: 'success' | 'info') => void 
}> = ({ connection, onBack, triggerToast }) => {
  const [jobs, setJobs] = useState<SyncJob[]>([]);
  const [selectedAction, setSelectedAction] = useState<'Pull' | 'Push'>('Pull');
  const [selectedResource, setSelectedResource] = useState('Sales Order');

  const resources = ['Item', 'Inventory', 'Customer', 'Sales Order', 'Invoice'];

  const handleStartSync = () => {
    const newJob: SyncJob = {
      id: Math.floor(Math.random() * 10000).toString(),
      connectionId: connection.id,
      action: selectedAction,
      resource: selectedResource,
      status: 'Queued',
      progress: 0,
      startedAt: new Date(),
    };

    setJobs(prev => [newJob, ...prev]);
    triggerToast(`Sync Job #${newJob.id} queued for ${selectedResource}s.`, 'info');

    // Simulate Job Progress
    setTimeout(() => {
      updateJobStatus(newJob.id, 'Processing', 10);
      
      const interval = setInterval(() => {
        setJobs(currentJobs => {
          const job = currentJobs.find(j => j.id === newJob.id);
          if (!job) return currentJobs;
          
          if (job.progress >= 100) {
            clearInterval(interval);
            return currentJobs;
          }
          
          const newProgress = job.progress + 20;
          if (newProgress >= 100) {
            // Completion logic is handled in the effect or next tick
            setTimeout(() => {
               triggerToast(`Sync Complete: ${Math.floor(Math.random() * 20) + 5} records imported.`, 'success');
            }, 500);
            return currentJobs.map(j => j.id === newJob.id ? { ...j, status: 'Completed', progress: 100, completedAt: new Date() } : j);
          }
          
          return currentJobs.map(j => j.id === newJob.id ? { ...j, progress: newProgress } : j);
        });
      }, 800); 
    }, 1000);
  };

  const updateJobStatus = (id: string, status: SyncJob['status'], progress: number) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status, progress } : j));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Console Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-slate-500 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
              {connection.name}
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">Active</span>
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Server className="h-3 w-3" /> {connection.provider} API v2.4 • Last synced: {connection.lastSync}
            </p>
          </div>
        </div>
        <button className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1 self-end md:self-auto">
          <Settings2 className="h-4 w-4" /> <span className="hidden sm:inline">Configure</span>
        </button>
      </div>

      <div className="p-4 md:p-6 space-y-6 flex-1 overflow-y-auto">
        {/* Operations Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Manual Sync Operations</h3>
          
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Action</label>
              <div className="flex bg-gray-100 p-1 rounded-md">
                <button 
                  onClick={() => setSelectedAction('Pull')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded shadow-sm transition-all ${selectedAction === 'Pull' ? 'bg-white text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Pull (Import)
                </button>
                <button 
                  onClick={() => setSelectedAction('Push')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded shadow-sm transition-all ${selectedAction === 'Push' ? 'bg-white text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Push (Export)
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Resource</label>
              <select 
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
              >
                {resources.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="w-full md:w-auto">
              <button 
                onClick={handleStartSync}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-md shadow-sm transition-all active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                Start Sync Job
              </button>
            </div>
          </div>
        </div>

        {/* Job Activity Panel */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col min-h-[300px]">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-500" />
              Job Activity Panel
            </h3>
            <button className="p-1 hover:bg-gray-200 rounded text-slate-500">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[600px]">
              <thead className="text-xs text-slate-500 bg-white border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 font-medium">Job ID</th>
                  <th className="px-6 py-3 font-medium">Operation</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium w-1/3">Progress</th>
                  <th className="px-6 py-3 font-medium">Started At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No recent jobs initiated.
                    </td>
                  </tr>
                ) : (
                  jobs.map(job => (
                    <tr key={job.id} className="bg-white animate-in slide-in-from-top-2 duration-300">
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">#{job.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                            job.action === 'Pull' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                          }`}>
                            {job.action.toUpperCase()}
                          </span>
                          <span className="font-medium text-slate-700">{job.resource}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          job.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          job.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' :
                          'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {job.status === 'Completed' && <Check className="h-3 w-3" />}
                          {job.status === 'Processing' && <Loader2 className="h-3 w-3 animate-spin" />}
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 transition-all duration-300 ease-out" 
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {job.startedAt.toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CONTAINER ---

export const IntegrationHub: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'wizard' | 'console'>('dashboard');
  const [selectedConnection, setSelectedConnection] = useState<IntegrationConnection | null>(null);
  const [toasts, setToasts] = useState<{ id: string; type: 'success'|'info'|'error'; message: string }[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error') => {
    setToasts(prev => [...prev, { id: Date.now().toString(), type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleConnectionClick = (conn: IntegrationConnection) => {
    if (conn.status === 'Active') {
      setSelectedConnection(conn);
      setView('console');
    } else {
      addToast(`Cannot open console for ${conn.name}. Status: ${conn.status}`, 'error');
    }
  };

  const handleWizardSave = () => {
    setView('dashboard');
    addToast('New connection established successfully.', 'success');
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {view === 'dashboard' && (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Integration Hub</h1>
              <p className="text-sm text-slate-500 mt-1">Manage your connected platforms and sync operations.</p>
            </div>
            <button 
              onClick={() => setView('wizard')}
              className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add New Connection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeConnections.map(conn => (
              <ConnectionCard 
                key={conn.id} 
                connection={conn} 
                onClick={() => handleConnectionClick(conn)} 
              />
            ))}
            
            {/* Empty State / Placeholder Card */}
            <button 
              onClick={() => setView('wizard')}
              className="border-2 border-dashed border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:border-primary-300 hover:bg-primary-50/10 transition-all group min-h-[180px]"
            >
              <div className="h-10 w-10 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center mb-3 transition-colors">
                <Plus className="h-6 w-6 text-gray-400 group-hover:text-primary-500" />
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-primary-600">Connect another platform</span>
            </button>
          </div>
        </div>
      )}

      {view === 'wizard' && (
        <SetupWizard 
          onClose={() => setView('dashboard')} 
          onSave={handleWizardSave} 
        />
      )}

      {view === 'console' && selectedConnection && (
        <SyncConsole 
          connection={selectedConnection} 
          onBack={() => {
            setView('dashboard');
            setSelectedConnection(null);
          }} 
          triggerToast={addToast}
        />
      )}
    </div>
  );
};