'use client';

import React, { useState, useEffect } from 'react';
import { initialDatabase as initialDatabaseState } from '@/lib/seedData';
import { DatabaseState } from '@/lib/types';
import { AdminView } from '@/components/views/AdminView';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  GraduationCap,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ToastContainer, ToastMessage } from '@/components/Toast';

export default function AdminPage() {
  const [data, setData] = useState<DatabaseState>(initialDatabaseState);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch live database state from API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/data?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Using fallback seed data state:', err);
    }
  };

  useEffect(() => {
    refreshData();
    // Always require explicit authentication when navigating to /admin
    setIsAuthenticated(false);
    localStorage.removeItem('ege_master_admin_auth');
    setLoading(false);

    const handleSync = () => refreshData();
    window.addEventListener('storage', handleSync);
    window.addEventListener('ege_data_updated', handleSync);
    window.addEventListener('focus', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('ege_data_updated', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    setTimeout(() => {
      // Master Credentials Check:
      // Email: admin@eliteglobal.com OR username: admin
      // Password: MasterAdmin2026! OR PIN: 1234
      const validEmail = email.trim().toLowerCase() === 'admin@eliteglobal.com' || email.trim().toLowerCase() === 'admin';
      const validPass = password === 'MasterAdmin2026!' || password === '1234';

      if (validEmail && validPass) {
        localStorage.setItem('ege_master_admin_auth', 'true');
        setIsAuthenticated(true);
        addToast('success', 'Master Admin authenticated successfully. Welcome back!');
      } else {
        setErrorMsg('Invalid Master Admin credentials. Please check your email/username and password.');
        addToast('error', 'Authentication failed. Please verify credentials.');
      }
      setSubmitting(false);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('ege_master_admin_auth');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    addToast('info', 'Logged out of Master Admin session.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B192C] flex items-center justify-center text-white font-sans">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Verifying Administrative Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B192C] text-slate-100 flex flex-col font-sans">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Authenticated Admin View */}
      {isAuthenticated ? (
        <div className="flex flex-col min-h-screen">
          {/* Master Admin Top Navigation Bar */}
          <header className="sticky top-0 z-50 bg-[#045494] text-white border-b border-blue-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Master Admin Portal</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Session
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-200">Logged in as admin@eliteglobal.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 transition"
                >
                  <span>View Public Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
                </a>

                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-red-500/30 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </header>

          {/* Admin Dashboard Component */}
          <main className="flex-1 bg-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <AdminView data={data} onRefreshData={refreshData} />
            </div>
          </main>
        </div>
      ) : (
        /* Master Admin Login Interface */
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#041D38] to-[#021020]">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
            {/* Header / Brand */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#045494] to-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-900/40 mb-4 border border-blue-400/30">
                <ShieldCheck className="w-8 h-8 text-amber-300" />
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Master Admin Access</h1>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">
                Elite Global Excellence · Restricted Management System
              </p>
            </div>

            {/* Error Alert */}
            {errorMsg && (
              <div className="mb-6 bg-red-950/60 border border-red-800/80 text-red-200 text-xs rounded-xl p-3.5 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Credentials Info Box */}
            <div className="mb-6 bg-blue-950/40 border border-blue-800/50 rounded-xl p-3.5 text-xs text-blue-200">
              <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Default Master Credentials:</span>
              </div>
              <div className="space-y-0.5 text-[11px] font-mono text-blue-300">
                <p>Email: <span className="text-white font-bold">admin@eliteglobal.com</span></p>
                <p>Password: <span className="text-white font-bold">MasterAdmin2026!</span> <span className="text-slate-400">(or PIN: 1234)</span></p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Master Email / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@eliteglobal.com"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Master Access Password / PIN
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0" />
                  <span>Remember session</span>
                </label>
                <span className="text-blue-400 hover:underline cursor-pointer text-[11px]">Protected Route</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-gradient-to-r from-[#045494] to-blue-600 hover:from-[#033b68] hover:to-blue-700 text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-blue-900/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate Master Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition"
              >
                <span>Return to Public Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
