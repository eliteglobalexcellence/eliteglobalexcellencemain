'use client';

import React, { useState } from 'react';
import { Lock, X, KeyRound, ShieldAlert, ArrowRight } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'admin123' || pin.trim() === 'ege2026' || pin.trim() === 'admin') {
      onSuccess();
      setPin('');
      setError('');
    } else {
      setError('Invalid Administrator Key. Use default key: admin123');
    }
  };

  const handleQuickBypass = () => {
    onSuccess();
    setPin('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">EGE Admin Portal</h3>
            <p className="text-xs text-slate-500 mt-1">
              Protected interface for site content, CRUD records, and central inbound inquiries.
            </p>
          </div>

          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-1.5 text-left">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div>
              <input
                type="password"
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Access Key (default: admin123)"
                className="w-full text-center px-4 py-2.5 text-sm font-mono tracking-widest border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-semibold shadow-2xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#045494] hover:bg-[#033b68] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Authenticate & Enter Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleQuickBypass}
              className="text-[11px] text-[#045494] hover:underline font-semibold cursor-pointer"
            >
              Quick Demo Access (Click to bypass login)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
