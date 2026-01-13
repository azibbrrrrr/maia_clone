import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const styles = {
    success: 'bg-white border-green-200 text-slate-800',
    info: 'bg-white border-blue-200 text-slate-800',
    error: 'bg-white border-red-200 text-slate-800',
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    info: <AlertCircle className="h-5 w-5 text-blue-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border ${styles[type]} min-w-[300px] animate-in slide-in-from-right-full transition-all duration-300`}>
      <div className="shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={() => onClose(id)} className="text-slate-400 hover:text-slate-600 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts: Omit<ToastProps, 'onClose'>[]; removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};
