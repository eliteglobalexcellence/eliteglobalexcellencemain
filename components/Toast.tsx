'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onClose: (id: string) => void }> = ({
  toast,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border text-xs font-semibold backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${
        toast.type === 'success'
          ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100'
          : toast.type === 'error'
          ? 'bg-rose-950/90 border-rose-500/40 text-rose-100'
          : 'bg-blue-950/90 border-blue-500/40 text-blue-100'
      }`}
    >
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}

      <div className="flex-1 leading-snug">{toast.message}</div>

      <button
        onClick={() => onClose(toast.id)}
        className="text-slate-400 hover:text-white p-0.5 rounded-md transition cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
